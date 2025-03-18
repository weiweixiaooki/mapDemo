import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    cesium()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: { // 中转服务器
    proxy: { // 通过代理实现跨域,搭理这个地址http://localhost:8081
      '/api': {  // 路径, 作为就是替换域名
        target: 'http://127.0.0.1:8080/geoserver/hkjl', // 表示要替换的服务端地址
        changeOrigin: true, // 表示开启代理, 允许跨域请求数据
        secure: false,  // 如果是https接口，需要配置这个参数 
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@import "./src/assets/variables.less";'
      }
    }
  },
  
})
