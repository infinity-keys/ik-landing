import type { Meta } from '@storybook/react'

import AddRolesPage from './AddRolesPage'

export const generated = () => {
  return <AddRolesPage />
}

export default {
  title: 'Pages/AddRolesPage',
  component: AddRolesPage,
} as Meta<typeof AddRolesPage>
