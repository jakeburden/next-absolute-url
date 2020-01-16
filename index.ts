import { IncomingMessage } from 'http'

function absoluteUrl(
  req?: IncomingMessage,
  localhostAddress = 'localhost:3000'
) {
  const host =
    (req ? req.headers.host : window.location.host) || localhostAddress
  const protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:'

  return {
    protocol,
    host,
    origin: protocol + '//' + host,
  }
}

export default absoluteUrl
