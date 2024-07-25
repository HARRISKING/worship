import React from 'react';
import { View } from '@tarojs/components';
import './index.less';
interface IHotMapProps {}
const HotMap: React.FC<IHotMapProps> = () => {
  const root = 'hotMap';
  return <View className={root}>HotMap</View>;
};
export default HotMap;
