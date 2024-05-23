import getConfigs from './utils/TaroSupply/configs';

export default getConfigs({
  pages: [
    'pages/home/index',
    'pages/scene/index',
    'pages/ai/index',
    'pages/service/index',
    'pages/mine/index',
  ],
  // 除了上面几个底部tab栏放在主包，其他页面统一放在下面子包中
  // subpackages: [
  //   {
  //     root: 'subPages',
  //     name: 'sub',
  //     pages: ['home/detail/index'],
  //   },
  // ],
  preloadRule: {
    'pages/home/index': {
      network: 'all',
      packages: ['home'],
    },
    'pages/mine/index': {
      network: 'all',
      packages: ['mine'],
    },
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom', // 需要自定义头部时开启，可用 layouts/BasicLayout 自定义头部
  },
  tabBar: {
    custom: true,
    selectedColor: '#E10600',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '众安云',
      },
      {
        pagePath: 'pages/scene/index',
        text: '智能',
      },
      {
        pagePath: 'pages/ai/index',
        text: '助手',
      },
      {
        pagePath: 'pages/service/index',
        text: '服务',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于获取天气信息',
    },
  },
  lazyCodeLoading: 'requiredComponents',
  requiredPrivateInfos: ['getLocation'],
} as any);
