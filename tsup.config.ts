import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  clean: true,
  minify: true,
  sourcemap: true,
  target: 'es2020',
  outDir: 'dist',
});
