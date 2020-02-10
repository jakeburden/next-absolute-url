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
})

describe('host is remote', () => {
  beforeAll(() => {
    window.location.host = 'example.com'
  })

  test('no values', () => {
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
