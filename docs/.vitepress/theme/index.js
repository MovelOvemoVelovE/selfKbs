import DefaultTheme from 'vitepress/theme';
import Demo from '../../components/Demo.vue'; // 确保路径正确

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', Demo); // 注册 Demo 组件
  },
};