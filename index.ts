import { IncomingMessage } from 'http'

function absoluteUrl(
  req?: IncomingMessage,
  localhostAdress = 'localhost:3000'
) {
  const host =
    (req ? req.headers.host : window.location.host) || localhostAdress
  const protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:'

  return {
    protocol,
    host,
    origin: protocol + '//' + host,
  }
}

export default absoluteUrl
