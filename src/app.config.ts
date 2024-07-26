import getConfigs from './utils/TaroSupply/configs';

export default getConfigs({
  pages: ['pages/home/index', 'pages/complain/index'],
  preloadRule: {
    'pages/home/index': {
      network: 'all',
      packages: ['home'],
    },
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom', // 需要自定义头部时开启，可用 layouts/BasicLayout 自定义头部
  },
  usingComponents: {
    heatmap: 'plugin://myPlugin/heatmap',
  },
} as any);
