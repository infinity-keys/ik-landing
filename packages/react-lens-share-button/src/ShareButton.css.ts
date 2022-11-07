import { style } from '@vanilla-extract/css'

export const link = style({
  fontSize: 'inherit',
  fontFamily: 'inherit',
  textDecoration: 'none',

  display: 'inline-flex',
  alignItems: 'center',

  color: '#abfe2c',
  backgroundColor: '#00510e',

  padding: '8px 16px',
  borderRadius: '4px',

  transition: 'all .2s',
  ':hover': {
    color: '#00510e',
    backgroundColor: '#abfe2c',
  },
})

export const lightBg = style({
  color: '#00510e',
  backgroundColor: '#abfe2c',
  transition: 'all .2s',
  ':hover': {
    color: '#abfe2c',
    backgroundColor: '#00510e',
  },
})

export const iconWrapper = style({
  marginLeft: '8px',
})

export const icon = style({
  display: 'block',
})
