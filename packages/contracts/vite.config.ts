import path from 'path'

import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
  server: {
    port: 3000,
  },
  build: {
    manifest: false,
    minify: process.env.NODE_ENV !== 'development',
    reportCompressedSize: process.env.NODE_ENV !== 'development',

    lib: {
      entry: [
        path.resolve(__dirname, 'src/index.ts'),
        path.resolve(__dirname, 'src/copy-json.ts'),
      ],
      formats: ['es', 'cjs'],
      fileName: 'index',
    },

    rollupOptions: {
      external: [],
      plugins: [
        copy({
          targets: [
            {
              src: 'src/*.json',
              dest: './dist',
            },
          ],
        }),
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript(),
      ],
    },
  },
})
