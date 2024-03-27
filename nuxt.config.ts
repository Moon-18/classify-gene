// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-windicss'],
  devtools: { enabled: true },
  build: {
    transpile: [/echarts/],
  },
  css: [
    // 引入 normalize.css
    'normalize.css',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false, // 仅根据组件名称而不是路径自动导入组件
    },
  ],
});
