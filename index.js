'use strict'
exports.__esModule = true
function absoluteUrl(req, localhostAddress) {
  if (localhostAddress === void 0) {
    localhostAddress = 'localhost:3000'
  }
  var _a
  var host =
    (((_a = req) === null || _a === void 0
    ? void 0
    : _a.headers)
      ? req.headers.host
      : window.location.host) || localhostAddress
  var protocol = isLocalNetwork(host) ? 'http:' : 'https:'
  if (
    req &&
    req.headers['x-forwarded-host'] &&
    typeof req.headers['x-forwarded-host'] === 'string'
  ) {
    host = req.headers['x-forwarded-host']
  }
  if (
    req &&
    req.headers['x-forwarded-proto'] &&
    typeof req.headers['x-forwarded-proto'] === 'string'
  ) {
    protocol = req.headers['x-forwarded-proto'].split(',')[0] + ':'
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
  }
}
function isLocalNetwork(hostname) {
  if (hostname === void 0) {
    hostname = window.location.host
  }
  return (
    hostname.startsWith('localhost') ||
    hostname.startsWith('127.0.0.1') ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.0.') ||
    hostname.endsWith('.local')
  )
}
exports['default'] = absoluteUrl
