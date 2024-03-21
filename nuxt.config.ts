// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@ant-design-vue/nuxt', 'nuxt-windicss'],
  antd: {
    // Options
  },
  devtools: { enabled: true },
  build: {
    transpile: [/echarts/],
  },
  css: [
    // 引入 normalize.css
    'normalize.css',
  ],
});
