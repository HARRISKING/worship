import React from 'react';
import { View } from '@tarojs/components';
import { HeatMapGrid } from 'react-grid-heatmap';
import './index.less';
interface IHotMapProps {}
const HotMap: React.FC<IHotMapProps> = () => {
  const root = 'hotMap';
  const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
  const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 50 + 50))
    );
  console.log('data<<<<<<<', data);
  return (
    <View className={root}>
      <HeatMapGrid
        data={new Array(yLabels.length)
          .fill(0)
          .map(() =>
            new Array(xLabels.length)
              .fill(0)
              .map(() => Math.floor(Math.random() * 50 + 50))
          )}
        xLabels={new Array(24).fill(0).map((_, i) => `${i}`)}
        yLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
      />
    </View>
  );
};
export default HotMap;
