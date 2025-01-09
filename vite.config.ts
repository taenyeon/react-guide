import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import * as path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'), // '@styles'로 별칭 설정
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //        additionalData: `@use '@assets/scss/mixin.scss' as *;`, // 별칭을 사용하여 경로 설정
  //     },
  //   },
  // },
  plugins: [tsconfigPaths(), react()],
})
