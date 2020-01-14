import { IncomingMessage } from 'http'

function absoluteUrl(
  req?: IncomingMessage,
  localhostAdress = 'localhost:3000'
) {
  let protocol = 'https:'
  let host = req ? req.headers['host'] : window.location.host
  if (!host || /^localhost(:\d+)?$/.test(host)) {
    host = localhostAdress
    protocol = 'http:'
  }

  return {
    protocol,
    host,
    origin: protocol + '//' + host,
  }
}

export default absoluteUrl
