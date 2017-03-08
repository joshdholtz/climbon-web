import 'whatwg-fetch';
import { environment } from './environment'

export function makeRequest(path, options = {}) {
  const defaultOptions = { method: "GET", body: undefined, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  }
  const headers = Object.assign(defaultOptions.headers, options.headers)

  path = `${environment.BASE_URL}${path}`
  options = Object.assign(defaultOptions, options)
  options.headers = headers
  return fetch(path, {
    method: options.method,
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(options.body)
  });
}

export function fileUpload(path, file) {
  var data = new FormData()
  data.append('file', file)

  path = `${environment.BASE_URL}${path}`
  return fetch(path, {
    method: 'POST',
    credentials: 'include',
    body: data
  })
}

export function checkStatus(response, handler = null) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    if(handler != null) {
      handler();
    } else {
      return null;
    }
  }
}

export function checkStatusJSON(response, handler = null) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    if(handler != null) {
      handler();
    } else {
      return null;
    }
  }
}
