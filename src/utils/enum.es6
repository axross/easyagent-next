export const enumOf = (value, expects, otherwise) => {
  for (let i = 0; i < expects.length; ++i) {
    if (expects[i] === value) return value;
  }

  return otherwise;
};

export const METHOD_EXPECTS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'HEAD',
  'OPTIONS'
];

export const REFERRER_EXPECTS = [
  'client',
  'no-referrer'
];

export const REFERRER_POLICY_EXPECTS = [
  '',
  'no-referrer',
  'no-referrer-when-downgrade',
  'origin-only',
  'origin-when-cross-origin',
  'unsafe-url'
];

export const MODE_EXPECTS = [
  'same-origin',
  'no-cors',
  'cors'
];

export const CREDENTIALS_EXPECTS = [
  'omit',
  'same-origin',
  'include'
];

export const CACHE_EXPECTS = [
  'default',
  'no-store',
  'reload',
  'no-cache',
  'force-cache',
  'only-if-cached'
];
