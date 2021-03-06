import should from 'should';
import { EasyAgent } from '../EasyAgent';

describe('EasyAgent', () => {
  describe('EasyAgent#constructor()', () => {
    it('should validate arguments and set a default value such such an enum', () => {
      const agent = new EasyAgent({ url: '/path/to/api' });

      should(agent.url).be.equal('/path/to/api');
      should(agent.queries).be.eql({});
      should(agent.method).be.equal('GET');
      should(agent.headers).be.eql({});
      should(agent.body).be.undefined;
      should(agent.referrer).be.equal('');
      should(agent.referrerPolicy).be.equal('');
      should(agent.mode).be.equal('no-cors');
      should(agent.credentials).be.equal('omit');
      should(agent.cache).be.equal('default');
      should(agent.redirect).be.equal('follow');
    });

    it('should throw exception if url is undefined', () => {
      should(() => { new EasyAgent({}) }).be.throw();
    });

    it('should set __bodyType "json" if json is an instance of plain Object', () => {
      const valid = new EasyAgent({
        url: '/path/to/api',
        json: {
          query: 'test',
          offset: 40,
          limit: 20,
        },
      });

      should(valid.body).be.equal('{"query":"test","offset":40,"limit":20}');
      should(valid.__bodyType).be.equal('json');

      const invalid = new EasyAgent({
        url: '/path/to/api',
        json: 'why string?',
      });

      should(invalid.body).be.equal(null);  // default
      should(invalid.__bodyType).be.equal('any');
    });

    it('should set __bodyType "formData" if form is an instance of plain Object', () => {
      global.FormData = () => {};

      const valid = new EasyAgent({
        url: '/path/to/api',
        form: {
          query: 'test',
          offset: 40,
          limit: 20,
        },
      });

      should(valid.body).be.instanceof(FormData);
      should(valid.__bodyType).be.equal('formData');

      const invalid = new EasyAgent({
        url: '/path/to/api',
        form: 'why string?',
      });

      should(invalid.body).be.equal(null);  // default
      should(invalid.__bodyType).be.equal('any');

      delete global.FormData;
    });

    it('should set __bodyType "formData" if form is an instance of FormData', () => {
      global.FormData = () => {};
      global.FormData.prototype[Symbol.toStringTag] = 'FormData';

      const agent = new EasyAgent({
        url: '/path/to/api',
        form: new FormData(),
      });

      should(agent.body).be.instanceof(FormData);
      should(agent.__bodyType).be.equal('formData');

      delete global.FormData;
    });

    it('should set url such as pathname (query is removed)', () => {
      const patterns = [
        {
          input: '/path/to/api?do=you&like=easyagent',
          expect: '/path/to/api',
        },
        {
          input: 'http://google.com/?q=easyagent#',
          expect: 'http://google.com/',
        }
      ];

      patterns.forEach(pattern => {
        const agent = new EasyAgent({ url: pattern.input });
        should(agent.url).be.equal(pattern.expect);
      });
    });

    it('should set queries from parsing url', () => {
      const patterns = [
        {
          input: '/path/to/api?do=you&like=easyagent',
          expect: {
            do: 'you',
            like: 'easyagent',
          },
        },
        {
          input: 'http://google.com/?q=easyagent#',
          expect: {
            q: 'easyagent#',  // Fuck
          },
        }
      ];

      patterns.forEach(pattern => {
        const agent = new EasyAgent({ url: pattern.input });
        should(agent.queries).be.eql(pattern.expect);
      });
    });

    it('should set through queries as default', () => {
      const agent = new EasyAgent({
        url: '/path/to/api',
      });

      should(agent.queries).be.eql({});
    });
  });

  describe('EasyAgent#set()', () => {
    it('should return an another one', () => {
      const agent = new EasyAgent({
        url: '/path/to/api',
      });

      const another = agent.set();

      should(another).be.not.equal(agent);
    });

    it('should overwrite values', () => {
      const agent = EasyAgent.post('/path/to/api', {
        queries: {
          q: 'easyagent',
          offset: 10,
        },
      });

      const updated = agent.set({
        method: 'PUT',
        queries: {
          q: 'bemmer',
        },
      });

      should(updated.url).be.equal('/path/to/api');
      should(updated.method).be.equal('PUT');
      should(updated.queries).be.eql({ q: 'bemmer' });
    });
  });

  describe('EasyAgent#fetch()', () => {
    afterEach(() => {
      delete global.fetch;
    })

    it('should call fetch() with arguments', done => {
      global.fetch = (url, options) => {
        should(url).be.equal('/path/to/api');
        should(options.method).be.equal('GET');
        should(options.headers).be.eql({
          'x-custom-header': 'value',
        });

        done();
      };

      const agent = EasyAgent.get('/path/to/api', {
        headers: {
          'x-custom-header': 'value',
        },
      });

      agent.fetch();
    });

    it('should parse queries', done => {
      global.fetch = (url, options) => {
        should(url).be.equal('/path/to/api?q=easyagent&offset=20&limit=20');
        done();
      };

      const agent = EasyAgent.get('/path/to/api', {
        queries: {
          q: 'easyagent',
          offset: 20,
          limit: 20,
        },
      });

      agent.fetch();
    });

    it('should adding header with __bodyType', done => {
      global.fetch = () => {

      };

      done();
    });
  });

  describe('EasyAgent#fetchJson()', () => {

  });

  describe('EasyAgent.get()', () => {
    it('should returns an instance of EasyAgent', () => {
      const agent = EasyAgent.get('/path/to/api');

      should(agent).be.instanceof(EasyAgent);
      should(agent.method).be.equal('GET');
    });
  });

  describe('EasyAgent.post()', () => {
    it('should returns an instance of EasyAgent', () => {
      const agent = EasyAgent.post('/path/to/api');

      should(agent).be.instanceof(EasyAgent);
      should(agent.method).be.equal('POST');
    });
  });

  describe('EasyAgent.put()', () => {
    it('should returns an instance of EasyAgent', () => {
      const agent = EasyAgent.put('/path/to/api');

      should(agent).be.instanceof(EasyAgent);
      should(agent.method).be.equal('PUT');
    });
  });

  describe('EasyAgent.del()', () => {
    it('should returns an instance of EasyAgent', () => {
      const agent = EasyAgent.del('/path/to/api');

      should(agent).be.instanceof(EasyAgent);
      should(agent.method).be.equal('DELETE');
    });
  });

  describe('EasyAgent.head()', () => {
    it('should returns an instance of EasyAgent', () => {
      const agent = EasyAgent.head('/path/to/api');

      should(agent).be.instanceof(EasyAgent);
      should(agent.method).be.equal('HEAD');
    });
  });

  describe('EasyAgent.opt()', () => {
    it('should returns an instance of EasyAgent', () => {
      const agent = EasyAgent.opt('/path/to/api');

      should(agent).be.instanceof(EasyAgent);
      should(agent.method).be.equal('OPTIONS');
    });
  });
});
