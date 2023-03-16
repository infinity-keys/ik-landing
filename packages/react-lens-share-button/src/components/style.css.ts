import { style, createVar } from '@vanilla-extract/css'

export const lightGreen = createVar()
export const darkGreen = createVar()

export const colors = style({
  vars: {
    [lightGreen]: '#abfe2c',
    [darkGreen]: '#00510e',
  },
})

export const link = style({
  textDecoration: 'none',

  display: 'inline-flex',
  alignItems: 'center',

  color: lightGreen,
  backgroundColor: darkGreen,

  boxSizing: 'border-box',
  padding: '8px 16px',
  borderRadius: '4px',

  transition: 'all .2s',

  selectors: {
    '&:hover, &:focus': {
      color: darkGreen,
      backgroundColor: lightGreen,
    },
  },
})

export const lightBg = style({
  color: darkGreen,
  backgroundColor: lightGreen,

  selectors: {
    '&:hover, &:focus': {
      color: lightGreen,
      backgroundColor: darkGreen,
    },
  },
})

export const iconWrapper = style({
  marginLeft: '8px',
})

export const icon = style({
  display: 'block',
})
