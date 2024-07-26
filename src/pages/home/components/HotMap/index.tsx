import React from 'react';
import { View } from '@tarojs/components';
import CubeColumn from './components/CubeColumn';
import './index.less';
interface IHotMapProps {}
const HotMap: React.FC<IHotMapProps> = () => {
  const root = 'hotMap';
  const mockData: number[][] = [
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7],
  ];
  return (
    <View className={root}>
      <View className={`${root}-innerBox`}>
        {(mockData || []).map((item) => (
          <CubeColumn value={item} />
        ))}
        <View className={`${root}-innerBox-weekTips`}>
          <View className={`${root}-innerBox-weekTips-first`}>周一</View>
          <View className={`${root}-innerBox-weekTips-secound`}>周日</View>
        </View>
      </View>

      <View className={`${root}-monthTips`}>
        <View className={`${root}-monthTips-first`}>6月</View>
        <View className={`${root}-monthTips-secound`}>7月</View>
      </View>
    </View>
  );
};
export default HotMap;
