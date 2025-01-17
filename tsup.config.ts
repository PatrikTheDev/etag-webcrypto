import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  format: ['cjs', 'esm'],
  external: ['@peculiar/webcrypto']
})
