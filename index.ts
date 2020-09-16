import { IncomingMessage } from 'http'

function absoluteUrl(
  req?: IncomingMessage,
  localhostAddress = 'localhost:3000',
  options = {
    https: false,
  }
) {
  let { https } = options
  let host =
    (req?.headers ? req.headers.host : window.location.host) || localhostAddress
  let protocol = https
    ? 'https:' // if NODE_ENV is production
    : process.env.NODE_ENV == 'production'
    ? 'https:' // if Customised Prameter Passed
    : 'http:'

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

export default absoluteUrl
