import type { Meta } from '@storybook/react'

import DeletePage from './DeletePage'

export const generated = () => {
  return <DeletePage />
}

export default {
  title: 'Pages/DeletePage',
  component: DeletePage,
} as Meta<typeof DeletePage>
