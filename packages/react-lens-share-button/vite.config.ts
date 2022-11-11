import { resolve } from 'node:path'

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'

import * as packageJson from './package.json'

export default defineConfig(() => ({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    tsConfigPaths(),
    dts({
      include: ['src/components'],
    }),
  ],
  build: {
    lib: {
      entry: resolve('src', 'components/index.ts'),
      name: 'LensShareButton',
      formats: ['es', 'cjs'],
      fileName: (format) => `react-lens-share-button.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}))
