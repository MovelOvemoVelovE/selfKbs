import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  // 可暴露的环境变量前缀
  envPrefix: 'VITE_',
  // 作为静态资源处理的文件匹配项
  assetsInclude: ['**/*.md'],
  // 开发服务器配置
  server: {
    // 监听哪个ip?
    host: 'localhost',
    // 监听端口
    port: 5173,
    /**
     * 端口被占用是否直接退出? 
     * true的话不尝试下一端口
     */
    strictPort: false,
    /**
     * 弃用TLS+http/2
     * 使用proxy选项时仅使用TLS
     */
    https: false,
    /**
     * 是否自动打开app
     * 可以设置process.env.BROWSER选择哪种浏览器
     */
    open: false,
    // 定义开发服务器的基础URL,模拟生产的资源、请求行为
    // origin: 'http://127.0.0.1:8080',
    // 自定义代理规则
    proxy: {
      // 字符串默认配置代理
      '/api': 'http://125.438.xx.01:8080',
      '/bpi': {
        // 代理路径
        target: 'http://125.438.xx.01:8080',
        // 是否跨域
        changeOrigin: true,
        // 是否开启websocket
        ws: true,
        // 重写路径
        rewrite: (path) => path.replace(/^\/bpi/, '')
      },
      // 正则匹配
      '^/cpi/.*': 'http://125.438.x.01:8080',
      // 使用 proxy 实例
      '/dpi': {
        target: 'http://125.438.x.01:8080',
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
    }
  },
  // 构建配置项 类似webpack的output
  build: {
    target: 'modules',
    // 输出路径
    outDir: 'dist',
    // 是否清空输出目录
    emptyOutDir: true,
    // 静态资源路径
    assetsDir: 'assets',
    // 静态资源阙值，小于则内联为base64编码
    assetsInlineLimit: 4096,
    // 是否将css单独打包
    cssCodeSplit: true,
    /**
     *  cssTarget: string | string[],
     *  与build.target一致，兼容性处理需要使用。
     *  安卓webview不兼容css的#RGBA颜色，设置为chrome61防止转化
     */
    // 构建后是否生成sourcemap
    sourcemap: false,
    // 构建后是否生成manifest文件
    manifest: false,
    // 构建后是否生成.map文件
    minify: 'esbuild',
    // 压缩算法 minify为terser时启用
    // terserOptions: {
    //   compress: {
    //     // 删除console
    //     drop_console: true,
    //     // 删除debugger
    //     drop_debugger: true,
    //   }
    // }
  },
  /**
   * 依赖优化配置
   * 默认情况下，Vite 会自动为依赖预构建，无需配置。
   */
  optimizeDeps: {
    include: [],
    exclude: [],
    // 强制依赖预构建!忽略缓存、优化过的依赖
    force: true
  }
})
