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
      <HotMap />
    </View>
  );
};
export default SiderBar;
