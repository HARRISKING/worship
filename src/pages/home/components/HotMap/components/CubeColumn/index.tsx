import React from 'react';
import { View } from '@tarojs/components';
import './index.less';
interface ICubeCompsProps {
  value: number[];
}
const CubeColumnComps: React.FC<ICubeCompsProps> = ({ value }) => {
  const root = 'CubeColumn';
  return (
    <View className={root}>
      {(value || []).map((item) => (
        <View className={`${root}-item`} />
      ))}
    </View>
  );
};
export default CubeColumnComps;
