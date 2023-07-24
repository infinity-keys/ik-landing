import type { ComponentMeta } from '@storybook/react'

import FormArchetypePage from './FormArchetypePage'

export const generated = () => {
  return <FormArchetypePage />
}

export default {
  title: 'Pages/FormArchetypePage',
  component: FormArchetypePage,
} as ComponentMeta<typeof FormArchetypePage>
