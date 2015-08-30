import querystring from 'querystring';
import {
  enumOf,
  METHOD_EXPECTS,
  REFERRER_EXPECTS,
  REFERRER_POLICY_EXPECTS,
  MODE_EXPECTS,
  CREDENTIALS_EXPECTS,
  CACHE_EXPECTS,
  REDIRECT_EXPECTS,
} from './enum';

// get global object
const global = Function("return this")();

if (typeof global.fetch !== 'function') {
  throw new ReferenceError('EasyAgent needs fetch() function.');
}

export class EasyAgent {
  constructor({ url, queries = {}, method, headers = {}, body = null, referrer,
                referrerPolicy, mode, credentials, cache, redirect, integrity,
                json, form }) {
    if (!url) throw new ReferenceError('url is required.')

    const urlWithoutQueries = url.split('?', 2)[0];
    const queriesAssignedFromUrl = Object.assign(
      querystring.parse(url.split('?', 2)[1] || ''),
      queries
    );

    this.url = urlWithoutQueries;
    this.queries = queriesAssignedFromUrl;
    this.method = enumOf(String(method).toUpperCase(), METHOD_EXPECTS, 'GET');
    this.headers = headers;
    this.body = body;
    this.referrer = enumOf(referrer, REFERRER_EXPECTS, referrer || '');
    this.referrerPolicy = enumOf(referrerPolicy, REFERRER_POLICY_EXPECTS, '');
    this.mode = enumOf(mode, MODE_EXPECTS, 'no-cors');
    this.credentials = enumOf(credentials, CREDENTIALS_EXPECTS, 'omit');
    this.cache = enumOf(cache, CACHE_EXPECTS, 'default');
    this.redirect = enumOf(redirect, REDIRECT_EXPECTS, 'follow');
    this.integrity = integrity;

    this.__bodyType = 'any';

    if (Object.prototype.toString.call(json) === '[object Object]') {
      this.body = JSON.stringify(json);
      this.__bodyType = 'json';
    }
    if (Object.prototype.toString.call(form) === '[object Object]') {
      this.body = new FormData(form);
      this.__bodyType = 'formData';
    }
    if (Object.prototype.toString.call(form) === '[object FormData]') {
      this.body = form;
      this.__bodyType = 'formData';
    }
  }

  set(options) {
    const assigned = Object.assign({}, Object(this), options);

    return new EasyAgent(assigned);
  }

  fetch(mimetype = 'text/plain') {
    if (this.__bodyType === 'json') {
      this.headers = Object.assign({
        'accept': mimetype,
        'content-type': 'application/json',
      }, this.headers);
    } else if (this.__bodyType === 'formData') {
      this.headers = Object.assign({
        'accept': mimetype,
        'content-type': 'application/x-www-form-urlencoded',
      }, this.headers);
    } else {
      this.headers = Object.assign({
        'accept': mimetype,
      }, this.headers);
    }

    const stringified = querystring.stringify(this.queries);
    const mergedUrl = `${this.url}${stringified ? '?' : ''}${stringified}`;

    return fetch(mergedUrl, this);
  }

  fetchJson() {
    return this.fetch('application/json')
      .then(res => res.json());
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

export default EasyAgent;
