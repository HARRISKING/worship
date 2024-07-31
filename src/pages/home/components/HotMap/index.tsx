import React from 'react';
import { View } from '@tarojs/components';
import moment from 'moment';
import CubeColumn from './components/CubeColumn';
import './index.less';
interface IHotMapProps {
  hotList: number[][];
}
const HotMap: React.FC<IHotMapProps> = ({ hotList }) => {
  const root = 'hotMap';

  return (
    <View className={root}>
      <View className={`${root}-innerBox`}>
        {(
          hotList || [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
          ]
        ).map((item: number[]) => (
          <CubeColumn value={item || []} />
        ))}
        <View className={`${root}-innerBox-weekTips`}>
          <View className={`${root}-innerBox-weekTips-first`}>周一</View>
          <View className={`${root}-innerBox-weekTips-secound`}>周日</View>
        </View>
      </View>

      <View className={`${root}-monthTips`}>
        <View
          className={`${root}-monthTips-first`}
        >{`${moment().month()}月`}</View>
        <View className={`${root}-monthTips-secound`}>{`${
          moment().month() + 1
        }月`}</View>
      </View>
    </View>
  );
};
export default HotMap;
