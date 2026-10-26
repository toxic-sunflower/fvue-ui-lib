import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  charts: resolve(__dirname, 'src/charts.ts'),
  'date-picker': resolve(__dirname, 'src/date-picker.ts'),
  flags: resolve(__dirname, 'src/flags.ts'),
  'animated-icons': resolve(__dirname, 'src/animated-icons.ts'),
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist',
      entryRoot: 'src',
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
    }),
  ],
  build: {
    lib: {
      entry: entries,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'reka-ui', 'clsx', 'tailwind-merge', 'tailwindcss'],
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs',
          chunkFileNames: 'chunks/[name]-[hash].mjs',
        },
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
