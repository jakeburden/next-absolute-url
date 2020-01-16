'use strict'
exports.__esModule = true
function absoluteUrl(req, localhostAdress) {
  if (localhostAdress === void 0) {
    localhostAdress = 'localhost:3000'
  }
  var host = (req ? req.headers.host : window.location.host) || localhostAdress
  var protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:'
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
  }
}
exports['default'] = absoluteUrl
