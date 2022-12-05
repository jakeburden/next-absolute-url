import { IncomingMessage } from 'http'

function absoluteUrl(
  req?: IncomingMessage,
  localhostAddress = 'localhost:3000'
) {
  let host =
    (req?.headers ? req.headers.host : window.location.host) || localhostAddress
  let protocol = isLocalNetwork(host) ? 'http:' : 'https:'

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
    protocol = `${req.headers['x-forwarded-proto']}:`
  }

  return {
    protocol,
    host,
    origin: protocol + '//' + host,
  }
}

function isLocalNetwork(hostname = window.location.host) {
    return (
        hostname.startsWith('localhost') ||
        hostname.startsWith('127.0.0.1') ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.0.') ||
        hostname.endsWith('.local')
    );
}

export default absoluteUrl
