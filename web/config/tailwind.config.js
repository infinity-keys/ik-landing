/** @type {import('tailwindcss').Config} */

const tailwindforms = require('@tailwindcss/forms')

const IK_TOKENS = require('../src/lib/theme/ik-tokens.tokens.json')

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'brand-accent-primary': IK_TOKENS.brand.color['ik-gold-primary'].$value,
        'brand-accent-secondary':
          IK_TOKENS.brand.color['ik-gold-secondary'].$value,
        'brand-accent-tertiary':
          IK_TOKENS.brand.color['ik-gold-tertiary'].$value,
        'brand-accent-hover': IK_TOKENS.brand.color['ik-gold-hover'].$value,
        'brand-gray-primary': IK_TOKENS.brand.color['ik-gray-primary'].$value,
        'brand-gray-secondary':
          IK_TOKENS.brand.color['ik-gray-secondary'].$value,
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        blue: '#101D42',
        'blue-300': '#93c5fd',
        'blue-800': '#070e1f',
        twitterBlue: '#1da1f2',
        discordPurple: '#5865f2',
        gray: {
          100: '#EEEFFC',
          150: '#A6ADB4',
          200: '#888FA1',
          300: '#475171',
          500: '#303B5B',
        },
        green: {
          650: '#0E7B0C',
        },
      },
      dropShadow: {
        icon: '0px 0px 6px rgba(255, 255, 255, 0.50)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        flickerGlow:
          'flicker 2s forwards, glow 1.2s alternate-reverse infinite',
        fadeGlow: 'fade .8s forwards, glow 1.2s alternate-reverse infinite',
        glowContinuous: 'glowGreen 2.4s alternate-reverse infinite',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        flicker: {
          '0%, 60%': { opacity: 0 },
          '30%': { opacity: 0.8 },
          '100%': { opacity: 1 },
        },
        glow: {
          '0%': {
            textShadow: `0 0 0px ${IK_TOKENS.brand.color['ik-gold-primary'].$value}`,
          },
          '100%': {
            textShadow: `0 0 8px ${IK_TOKENS.brand.color['ik-gold-primary'].$value}`,
          },
        },
        glowGreen: {
          '0%': {
            boxShadow: '0 0 0px 0px rgba(74, 222, 128, 0)',
            opacity: 0.7,
          },
          '100%': {
            boxShadow: '0 0 0px 1px rgba(74, 222, 128, .5)',
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [tailwindforms],
}
