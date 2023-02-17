import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './attempt'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

describe('attempt function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        id: '42', // Add parameters here
      },
    })

    const response = await handler(httpEvent, null)
    const { data } = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(data).toBe('attempt function')
  })

  // You can also use scenarios to test your api functions
  // See guide here: https://redwoodjs.com/docs/testing#scenarios
  //
  // scenario('Scenario test', async () => {
  //
  // })
})