
export function get (url, cb, pcb) {
  var request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      cb && cb(null, request.responseText);
    } else {
      // We reached our target server, but it returned an error
      cb && cb(request.statusText, request.responseText);
    }
  };

  request.onprogress = function (e) {
    pcb && pcb(request.responseText);
  }

  request.onerror = function (err) {
    // There was a connection error of some sort
    cb && cb(err, request.responseText);
  };

  request.send();
}


export function jsonstream (url, cb, pcb) {
  var buffered = 0;
  var request = new XMLHttpRequest();
  var results = [];

  request.open('GET', url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      buffer(request.responseText, true);
      cb && cb(null, results.join(','));
    } else {
      cb && cb(request.statusText);
    }
  };

  request.onprogress = function (e) {
    buffer(request.responseText, false);
  }

  request.onerror = function (err) {
    cb && cb(err);
  };

  request.send();

  function buffer (data, last) {
    var parts = data.slice(1).split('\u2028');
    var len = last ? parts.length : parts.length - 1;

    while (buffered < len) {
      var part = parts[buffered].slice(0, -1);
      results.push(part);
      pcb && pcb('[' + part + ']');
      buffered++;
    }
  }
}
