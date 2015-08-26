import should from 'should';
import { EasyAgent } from '../EasyAgent';

describe('EasyAgent', () => {
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

    });

    it('should set __bodyType "formData" if form is an instance of plain Object', () => {

    });

    it('should set __bodyType "formData" if form is an instance of FormData', () => {

    });

    it('should set url such as pathname (query is removed)', () => {

    });

    it('should set queries from parsing url', () => {

    });

    it('should set through queries as default', () => {

    });
  });
});
