'use strict'
exports.__esModule = true
function absoluteUrl(req, localhostAdress) {
  if (localhostAdress === void 0) {
    localhostAdress = 'localhost:3000'
  }
  var protocol = 'https:'
  var host = req ? req.headers['host'] : window.location.host
  if (!host || /^localhost(:\d+)?$/.test(host)) {
    host = localhostAdress
    protocol = 'http:'
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
  }
}
exports['default'] = absoluteUrl
