import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './auth'

describe('webhook function', () => {
  // it('responds with 200 on valid POST request', async () => {
  //   const httpEvent = mockHttpEvent(testClerkRequest)
  //   const response = await handler(httpEvent)
  //   expect(response.statusCode).toBe(200)
  //   expect(JSON.parse(response.body || '').data).toBeDefined()
  // })

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
