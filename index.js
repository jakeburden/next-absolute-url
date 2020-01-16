'use strict'
exports.__esModule = true
function absoluteUrl(req, localhostAddress) {
  if (localhostAddress === void 0) {
    localhostAddress = 'localhost:3000'
  }
  var host = (req ? req.headers.host : window.location.host) || localhostAddress
  var protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:'
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
  }
}
exports['default'] = absoluteUrl
