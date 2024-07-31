import React, { useEffect } from 'react';
import { getApiV1Hotmaps } from '@/api';
import { View } from '@tarojs/components';
import { useRequest } from 'ahooks';
import CubeColumn from './components/CubeColumn';
import './index.less';
interface IHotMapProps {}
const HotMap: React.FC<IHotMapProps> = () => {
  const root = 'hotMap';
  const { data: hotList, run: fetchHotList } = useRequest(getApiV1Hotmaps, {
    manual: true,
  });
  // const mockData: number[][] = [
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [1, 2, 3, 4, 5, 6, 7],
  // ];

  const fetchInfo = async () => {
    const res = await wx.login();
    if (res?.code) {
      fetchHotList({ open_id: res.code });
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <View className={root}>
      <View className={`${root}-innerBox`}>
        {(hotList?.data?.hot_values || []).map((item: number[]) => (
          <CubeColumn value={item || []} />
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
