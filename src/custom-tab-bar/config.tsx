export const tabs = {
  HomeTab: {
    pagePath: '/pages/home/index',
    text: '众安云',
    iconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861247461-home.png?x-oss-process=img/q/80',
    selectedIconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861247457-home_selected.png?x-oss-process=img/q/80',
  },
  SceneTab: {
    pagePath: '/pages/scene/index',
    text: '智能',
    iconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861279303-scene.png?x-oss-process=img/q/80',
    selectedIconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861247467-scene_selected.png?x-oss-process=img/q/80',
  },
  AiTab: {
    pagePath: '/pages/ai/index',
    text: '',
    iconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861613025-ai.png?x-oss-process=img/q/80',
    selectedIconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861613028-ai_selected.png?x-oss-process=img/q/80',
    isCenter: true,
  },
  ServiceTab: {
    pagePath: '/pages/service/index',
    text: '服务',
    iconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861247472-service.png?x-oss-process=img/q/80',
    selectedIconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861247469-service_selected.png?x-oss-process=img/q/80',
  },
  MineTab: {
    pagePath: '/pages/mine/index',
    text: '我的',
    iconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861247465-profile.png?x-oss-process=img/q/80',
    selectedIconPath:
      'https://fe-cloud.uni-ubi.com/image/1699861247463-profile_selected.png?x-oss-process=img/q/80',
  },
};

export const tabList: Array<{
  pagePath: string;
  text: string;
  iconPath: any;
  selectedIconPath: any;
  isCenter?: boolean;
}> = [tabs.HomeTab, tabs.SceneTab, tabs.AiTab, tabs.ServiceTab, tabs.MineTab];
