const _apiHost = 'http://localhost:3001';

async function request(url, params = {}, method = 'GET') {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(_apiHost + url, options);
  
  if (![200, 204].includes(response.status)) {
    return Promise.reject({
      error: 'The server responded with an unexpected status.',
    });
  }

  const text = await response.text();
  return text.length ? {data: JSON.parse(text)} : {};
}

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map(key => key + '=' + obj[key])
    .join('&');
}

function get(url, params) {
  return request(url, params);
}

function post(url, params) {
  return request(url, params, 'POST');
}

function put(url, params) {
  return request(url, params, 'PUT');
}

function del(url, params) {
  return request(url, params, 'DELETE');
}

export default {
  get,
  post,
  put,
  del,
};
