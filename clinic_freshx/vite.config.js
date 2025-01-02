import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: {
  //     key: fs.readFileSync('./public/temp/key.pem'),  // Đường dẫn đến file key.pem
  //     cert: fs.readFileSync('./public/temp/cert.pem'),  // Đường dẫn đến file cert.pem
  //   },
  //   host: '0.0.0.0', // Chỉ định hostname (nếu cần)
  //   port: 3000,  // Cổng bạn muốn sử dụng (mặc định là 3000)
  // },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
