import * as webhooks from '@redwoodjs/api/webhooks'
import { mockHttpEvent } from '@redwoodjs/testing/api'

import { db } from 'src/lib/db'

import { handler } from './auth'

jest.spyOn(webhooks, 'verifyEvent').mockReturnValue(true)
jest.spyOn(db.user, 'upsert')
jest.spyOn(db.user, 'delete')

const headers = {
  'svix-id': 'mock_svix_id',
  'svix-timestamp': 'mock_svix_timestamp',
  'svix-signature': 'v1,mock_svix_signature',
}

describe('webhook function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
   * General HTTP
   */

  it('responds with 200 on valid POST request', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers,
      body: JSON.stringify({ username: 'test' }),
    })

    const response = await handler(httpEvent)

    expect(webhooks.verifyEvent).toHaveBeenCalled()
    expect(response.statusCode).toBe(200)
  })

  it('responds with 403 on non-POST request', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'GET',
    })

    const response = await handler(httpEvent)
    expect(response.statusCode).toBe(405)
  })

  it('responds with 403 on request without a body', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      body: null,
    })

    const response = await handler(httpEvent)
    expect(response.statusCode).toBe(422)
  })

  /**
   * Database tests
   */

  it('upserts new social login', async () => {
    const email = 'test@test.com'

    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers,
      body: JSON.stringify({
        type: 'user.created',
        data: {
          primary_email_address_id: '1',
          email_addresses: [{ id: '1', email_address: email }],
        },
      }),
    })

    const response = await handler(httpEvent)
    expect(db.user.upsert).toHaveBeenCalledWith({
      where: { email },
      create: expect.any(Object),
      update: expect.any(Object),
    })
    expect(db.user.upsert).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toBe(200)
  })

  it('creates new wallet login', async () => {
    const id = 'test-id'

    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers,
      body: JSON.stringify({
        type: 'user.created',
        data: {
          id,
          primary_web3_wallet_id: '1',
          web3_wallets: [{ id: '1', web3_wallet: '5678' }],
        },
      }),
    })

    const response = await handler(httpEvent)
    expect(db.user.upsert).toHaveBeenCalledWith({
      where: { id: '' },
      create: expect.any(Object),
      update: expect.any(Object),
    })
    expect(db.user.upsert).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toBe(200)
  })

  scenario('upserts existing social login', async (scenario) => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers,
      body: JSON.stringify({
        type: 'user.created',
        data: {
          primary_email_address_id: '1',
          email_addresses: [
            { id: '1', email_address: scenario.user.social.email },
          ],
        },
      }),
    })

    const response = await handler(httpEvent)
    expect(db.user.upsert).toHaveBeenCalledWith({
      where: { email: scenario.user.social.email },
      create: expect.any(Object),
      update: expect.any(Object),
    })
    expect(db.user.upsert).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toBe(200)
  })

  scenario('updates existing wallet login', async (scenario) => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers,
      body: JSON.stringify({
        type: 'user.created',
        data: {
          primary_web3_wallet_id: '1',
          web3_wallets: [
            { id: '1', web3_wallet: scenario.user.wallet.externalAddress },
          ],
        },
      }),
    })

    const response = await handler(httpEvent)
    expect(db.user.upsert).toHaveBeenCalledWith({
      where: { id: scenario.user.wallet.id },
      create: expect.any(Object),
      update: expect.any(Object),
    })
    expect(db.user.upsert).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toBe(200)
  })

  scenario('deletes user', async (scenario) => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers,
      body: JSON.stringify({
        type: 'user.deleted',
        data: { id: scenario.user.wallet.authId },
      }),
    })

    const response = await handler(httpEvent)
    expect(db.user.delete).toHaveBeenCalledWith({
      where: { authId: scenario.user.wallet.authId },
    })
    expect(db.user.delete).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toBe(200)
  })
})
