// 从组件目录导入
import * as components from './components/index';

// 插件安装方法
const install = (app) => {
  // 注册所有组件
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
  
  return app;
};

// 导出所有组件
export * from './components/index';

// 导出Vue插件
export default {
  install
}; 