import { render } from '@redwoodjs/testing/web'

import Button from 'src/components/Button/Button'

import TextContainer from './TextContainer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TextContainer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <TextContainer
          Button={<Button onClick={() => console.log('click')}>Click</Button>}
        />
      )
    }).not.toThrow()
  })
})
