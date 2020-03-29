/* global XMLHttpRequest */

export function get (url, cb) {
  return createRequest('GET', url, null, cb);
}

export function post (url, data, cb) {
  return createRequest('POST', url, data, cb);
}

function createRequest (method, url, data, cb) {
  const req = new XMLHttpRequest();

  req.open(method, url, true);

  req.onload = onload;
  req.onerror = onerror;

  if (data != null) {
    req.send(data);
  } else {
    req.send();
  }

  function onload () {
    if (req.status === 200) {
      cb(null, req.responseText);
    } else {
      cb(req.status, req.responseText);
    }
  }

  function onerror (err) {
    cb(new Error(err));
  }
}
