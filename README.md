# EasyAgent

[![Circle CI](https://circleci.com/gh/axross/easyagent.svg?style=svg)](https://circleci.com/gh/axross/easyagent)
[![npm version](https://badge.fury.io/js/easyagent.svg)](http://badge.fury.io/js/easyagent)
[![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](LICENSE)

![EasyAgent](easyagent.png)

EasyAgent is nothing more than a wrapper library of [Fetch API](https://fetch.spec.whatwg.org/), but EasyAgent certainly helps your using fetch API. Anyhow, see [examples](#examples).

## Example

```javascript
EasyAgent.get('/path/to/api', {
  method: '',
  url: '',
  headers: {

  },
  queries: {
    q: 'google',
    page: 1,
  },
  body: {

  },
  mode: '',
  credentials: '',
  cache: '',
})
  .fetchJson()
  .then(json => console.info(json))
  .then(err => console.error(err));
```

## Installation

```sh
$ npm i -S easyagent
```

```javascript
import EasyAgent from 'easyagent';
```

## API

### EasyAgent.get(url, options)

`EasyAgent.post()`

### EasyAgent#fetch()

### EasyAgent#fetchJson()

## License

MIT
