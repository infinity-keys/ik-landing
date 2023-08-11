import type { ComponentMeta } from '@storybook/react'

import AddRolesPage from './AddRolesPage'

export const generated = () => {
  return <AddRolesPage />
}

export default {
  title: 'Pages/AddRolesPage',
  component: AddRolesPage,
} as ComponentMeta<typeof AddRolesPage>
