import * as webhooks from '@redwoodjs/api/webhooks'
import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './auth'

jest.spyOn(webhooks, 'verifyEvent').mockReturnValue(true)

describe('webhook function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('responds with 200 on valid POST request', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers: {
        'svix-id': 'mock_svix_id',
        'svix-timestamp': 'mock_svix_timestamp',
        'svix-signature': 'v1,mock_svix_signature',
      },
      body: JSON.stringify({
        username: 'test',
      }),
    })

    const response = await handler(httpEvent)

    expect(webhooks.verifyEvent).toHaveBeenCalled()
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body || '').data.username).toBe('test')
  })

  it('responds with 403 on non-POST request', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'GET',
    })

    const response = await handler(httpEvent)
    expect(response.statusCode).toBe(403)
  })

  it('responds with 403 on request without a body', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      body: null,
    })

    const response = await handler(httpEvent)
    expect(response.statusCode).toBe(403)
  })
})
