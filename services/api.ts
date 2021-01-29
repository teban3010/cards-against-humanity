let authHeader = {};

const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `${process.env.NEXT_PUBLIC_API}${url}`;

const requestHeaders = (headers = {}) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  ...authHeader,
  ...headers,
});

const responseHandler = (response: Response) => {
  if (response.status === 204) {
    return;
  }

  return response.json();
};

const get = (url = '', headers = {}) =>
  fetch(readUrl(url), {
    method: 'GET',
    headers: requestHeaders(headers),
  }).then(responseHandler);

const post = (url = '', body = {}, headers = {}) =>
  fetch(readUrl(url), {
    method: 'POST',
    body: JSON.stringify(body),
    headers: requestHeaders(headers),
  }).then(responseHandler);

const put = (url = '', body = {}, headers = {}) =>
  fetch(readUrl(url), {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: requestHeaders(headers),
  }).then(responseHandler);

const del = (url = '', headers = {}) =>
  fetch(readUrl(url), {
    method: 'DELETE',
    headers: requestHeaders(headers),
  }).then(responseHandler);

export const API = {
  get,
  post,
  put,
  delete: del,
};
