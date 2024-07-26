import React from 'react';
import { View } from '@tarojs/components';
import HotMap from '../HotMap';
import './index.less';
import classNames from 'classnames';
interface ISiderBarProps {
  visible: boolean;
}
const SiderBar: React.FC<ISiderBarProps> = ({ visible }) => {
  const root = 'siderbar';
  return (
    <View className={classNames(root, visible && `${root}-show`)}>
      <View className={`${root}-infoBox`}>
        <View className={`${root}-infoBox-name`}>虔诚祈求·财富降临</View>
        <View className={`${root}-infoBox-tag`}>马上暴富</View>
      </View>
      <View className={`${root}-hotmap`}>
        <HotMap />
      </View>
    </View>
  );
};
export default SiderBar;
