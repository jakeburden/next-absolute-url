import { IncomingMessage } from 'http'
import nextAbsoluteUrl from './'

describe('host is corrupted (is empty somehow)', () => {
  test('no values', () => {
    const { protocol, host, origin } = nextAbsoluteUrl()
    expect(origin).toBe('http://localhost:3000')
    expect(protocol).toBe('http:')
    expect(host).toBe('localhost:3000')
  })

  test('only req passed in', () => {
    const req = {
      headers: {
        host: 'localhost:8000',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req)
    expect(origin).toBe('http://localhost:8000')
    expect(protocol).toBe('http:')
    expect(host).toBe('localhost:8000')
  })

  test('only localhostAddress passed in', () => {
    const { protocol, host, origin } = nextAbsoluteUrl(
      undefined,
      'localhost:9000'
    )
    expect(origin).toBe('http://localhost:9000')
    expect(protocol).toBe('http:')
    expect(host).toBe('localhost:9000')
  })

  test('both arguments are passed in', () => {
    const req = {
      headers: {
        host: 'localhost:10000',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req, 'localhost:8000')
    expect(origin).toBe('http://localhost:10000')
    expect(protocol).toBe('http:')
    expect(host).toBe('localhost:10000')
  })
  test('protocol should be http for loopback', () => {
    const req = {
      headers: {
        host: '127.0.0.1:3000',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req)
    expect(origin).toBe('http://127.0.0.1:3000')
    expect(protocol).toBe('http:')
    expect(host).toBe('127.0.0.1:3000')
  })
  test('protocol should be http for ip', () => {
    const req = {
      headers: {
        host: '192.168.0.1:3000',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req)
    expect(origin).toBe('http://192.168.0.1:3000')
    expect(protocol).toBe('http:')
    expect(host).toBe('192.168.0.1:3000')
  })
  test('protocol should be https for ip , if user passed customised parameter https:true', () => {
    const req = {
      headers: {
        host: '192.168.0.1:3000',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req, '', { https: true })
    expect(origin).toBe('https://192.168.0.1:3000')
    expect(protocol).toBe('https:')
    expect(host).toBe('192.168.0.1:3000')
  })
})

describe('host is remote', () => {
  const OLD_ENV = process.env

  beforeAll(() => {
    window.location.host = 'example.com'
    jest.resetModules() // most important - it clears the cache
    process.env = { ...OLD_ENV } // make a copy
  })
  afterAll(() => {
    process.env = OLD_ENV // restore old env
  })

  test('no values', () => {
    process.env.NODE_ENV = 'production'
    const { protocol, host, origin } = nextAbsoluteUrl()
    expect(origin).toBe('https://example.com')
    expect(protocol).toBe('https:')
    expect(host).toBe('example.com')
  })

  test('only req passed in', () => {
    const req = {
      headers: {
        host: 'example.com',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req)
    expect(origin).toBe('https://example.com')
    expect(protocol).toBe('https:')
    expect(host).toBe('example.com')
  })

  test('only localhostAddress passed in', () => {
    const { protocol, host, origin } = nextAbsoluteUrl(
      undefined,
      'localhost:4000'
    )
    expect(origin).toBe('https://example.com')
    expect(protocol).toBe('https:')
    expect(host).toBe('example.com')
  })

  test('both arguments are passed in', () => {
    const req = {
      headers: {
        host: 'example.com',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req, 'localhost:4000')
    expect(origin).toBe('https://example.com')
    expect(protocol).toBe('https:')
    expect(host).toBe('example.com')
  })
  test('protocol should be https for ip on production', () => {
    const req = {
      headers: {
        host: '44.45.46.55',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req)
    expect(origin).toBe('https://44.45.46.55')
    expect(protocol).toBe('https:')
    expect(host).toBe('44.45.46.55')
  })
  test('pass custom parameter for https, if NODE_ENV not passed Correctly', () => {
    process.env.NODE_ENV = 'some wrong NODE_ENV'
    const req = {
      headers: {
        host: '44.45.46.55',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req, '', { https: true })
    expect(origin).toBe('https://44.45.46.55')
    expect(protocol).toBe('https:')
    expect(host).toBe('44.45.46.55')
  })
})

describe('host is localhost', () => {
  beforeAll(() => {
    window.location.host = 'localhost:4000'
  })

  test('no values', () => {
    const { protocol, host, origin } = nextAbsoluteUrl()
    expect(origin).toBe('http://localhost:4000')
    expect(protocol).toBe('http:')
    expect(host).toBe('localhost:4000')
  })

  test('only req passed in', () => {
    const req = {
      headers: {
        host: 'localhost:5000',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req)
    expect(origin).toBe('http://localhost:5000')
    expect(protocol).toBe('http:')
    expect(host).toBe('localhost:5000')
  })

  test('only localhostAddress passed in', () => {
    window.location.host = 'localhost:4000'
    const { protocol, host, origin } = nextAbsoluteUrl(
      undefined,
      'localhost:6000'
    )
    expect(origin).toBe('http://localhost:4000')
    expect(protocol).toBe('http:')
    expect(host).toBe('localhost:4000')
  })

  test('both arguments are passed in', () => {
    const req = {
      headers: {
        host: 'localhost:7000',
      },
    } as IncomingMessage
    const { protocol, host, origin } = nextAbsoluteUrl(req, 'localhost:8000')
    expect(origin).toBe('http://localhost:7000')
    expect(protocol).toBe('http:')
    expect(host).toBe('localhost:7000')
  })
})

describe('behind a proxy', () => {
  test('should use the x-forwarded headers', () => {
    const req = {
      headers: {
        host: 'localhost:41560',
        'x-forwarded-host': 'localhost:5000',
        'x-forwarded-proto': 'http',
        'x-forwarded-port': '5000',
        'x-forwarded-for': '::ffff:127.0.0.1',
      },
    } as any

    const { protocol, host, origin } = nextAbsoluteUrl(req)

    expect(origin).toBe('http://localhost:5000')
    expect(protocol).toBe('http:')
    expect(host).toBe('localhost:5000')
  })
})
