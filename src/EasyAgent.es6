const {
  enumOf,
  METHOD_EXPECTS,
  REFERRER_EXPECTS,
  REFERRER_POLICY_EXPECTS,
  MODE_EXPECTS,
  CREDENTIALS_EXPECTS,
  CACHE_EXPECTS,
} from './utils/enum';

class EasyAgent {
  constructor({ url, queries, method, headers, body, rederrer, rederrerPolicy,
                mode, credentials, cache, redirect, integrity, json, form }) {
    this.url = url;
    this.queries = Object(queries) || {};
    this.method = enumOf(String(method).toUpperCase(), METHOD_EXPECTS, 'GET');
    this.headers = Object(headers) || {};
    this.body = body || null;
    this.referrer = enumOf(referrer, REFERRER_EXPECTS, referrer);
    this.referrerPolicy = enumOf(referrerPolicy, REFERRER_POLICY_EXPECTS, '');
    this.mode = enumOf(mode, MODE_EXPECTS, 'no-cors');
    this.credentials = enumOf(credentials, CREDENTIALS_EXPECTS, 'omit');
    this.cache = enumOf(cache, CACHE_EXPECTS, 'default');
    this.redirect = enumOf(redirect, REDIRECT_EXPECTS, 'follow');
    this.integrity = integrity;

    this.__bodyType = 'any';

    if (Object.prototype.toString.call(json) === '[object Object]') {
      this.body = Object(json);
      this.__bodyType = 'json';
    }
    if (Object.prototype.toString.call(form) === '[object Object]' ||
        Object.prototype.toString.call(form) === '[object FormData]') {
      this.body = Object(form);
      this.__bodyType = 'formData';
    }
  }

  set(options) {
    const assigned = Object.assign({}, Object(this), options);

    return new EasyAgent(merged);
  }

  assign(options) {
    const queries = Object.assign({}, this.queries, options.queries);
    const headers = Object.assign({}, this.headers, options.headers);

    return this.set(Object.assign(Object(this), { queries, headers }));
  }

  fetch() {
    const headers = {

    };
  }

  fetchJson() {

  }

  fetchText() {

  }

  __preprocessHeaders(headers) {
    const processed = {};

    return Object.keys(headers).forEach(key => {
      processed[key.toLowerCase()] = headers[key];
    });
  }

  static get(url, options = {}) {
    return new EasyAgent({
      url,
      method: 'GET',
      ...options,
    });
  }

  static post(url, options = {}) {
    return new EasyAgent({
      url,
      method: 'POST',
      ...options,
    });
  }

  static put(url, options = {}) {
    return new EasyAgent({
      url,
      method: 'PUT',
      ...options,
    });
  }

  static del(url, options = {}) {
    return new EasyAgent({
      url,
      method: 'DELETE',
      ...options,
    });
  }

  static head(url, options = {}) {
    return new EasyAgent({
      url,
      method: 'HEAD',
      ...options,
    });
  }

  static opt(url, options = {}) {
    return new EasyAgent({
      url,
      method: 'OPTIONS',
      ...options,
    });
  }
}
