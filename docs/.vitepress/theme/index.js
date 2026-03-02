import DefaultTheme from 'vitepress/theme';
import Demo from '../../components/Demo.vue'; // 确保路径正确
import PlusTable from '../../components/PlusTable.vue'; // 确保路径正确

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', Demo); // 注册 Demo 组件
    app.component('PlusTable', PlusTable); // 注册 PlusTable 组件
  },
};