import React, { useEffect } from 'react';
import { getApiV1Hotmaps } from '@/api';
import { AtIcon } from 'taro-ui';
import { useRequest } from 'ahooks';
import { View } from '@tarojs/components';
import HotMap from '../HotMap';
import './index.less';
import classNames from 'classnames';
import { RouterUtil } from '@/utils';
import 'taro-ui/dist/style/components/icon.scss';
interface ISiderBarProps {
  visible: boolean;
}
const SiderBar: React.FC<ISiderBarProps> = ({ visible }) => {
  const root = 'siderbar';
  // 获取当前时间的时间戳
  const currentTime = new Date().getTime();

  // 增加毫秒数
  const oneDay = 1 * 6 * 60 * 60 * 1000;

  // 计算明天的时间戳 修改处
  const tomorrowTime = 1722560766193 + oneDay;

  const { data: hotList, run: fetchHotList } = useRequest(getApiV1Hotmaps, {
    manual: true,
  });
  const fetchInfo = async () => {
    const res = await wx.login();
    if (res?.code) {
      fetchHotList({ open_id: res.code });
    }
  };
  useEffect(() => {
    if (!visible) return;
    fetchInfo();
  }, [visible]);
  return (
    <View className={classNames(root, visible && `${root}-show`)}>
      <View className={`${root}-infoBox`}>
        <View className={`${root}-infoBox-name`}>虔诚祈求·财富降临</View>
        <View className={`${root}-infoBox-tag`}>马上暴富</View>
      </View>
      <View className={`${root}-countBox`}>
        <View className={`${root}-countBox-item`}>
          <View className={`${root}-countBox-item-value`}>
            {hotList?.data?.today_value || 0}
          </View>
          <View className={`${root}-countBox-item-title`}>今日参拜</View>
        </View>
        <View className={`${root}-countBox-item`}>
          <View className={`${root}-countBox-item-value`}>
            {(((hotList?.data?.recently_count || 0) / 84) * 100)?.toFixed(1) ||
              0}
            %
          </View>
          <View className={`${root}-countBox-item-title`}>虔诚指数</View>
        </View>
        <View className={`${root}-countBox-item`}>
          <View className={`${root}-countBox-item-value`}>
            {hotList?.data?.sumCount || 0}
          </View>
          <View className={`${root}-countBox-item-title`}>打卡天数</View>
        </View>
      </View>
      <View className={`${root}-hotmap`}>
        <HotMap hotList={hotList?.data?.hot_values} />
      </View>
      {currentTime > tomorrowTime && (
        <View className={`${root}-downBox`}>
          <View
            className={`${root}-downBox-btn`}
            onClick={() => RouterUtil.navigateTo('/pages/placeList/index')}
          >
            <View>联动财神庙</View>
          </View>
          <View
            className={`${root}-downBox-btn`}
            onClick={() => RouterUtil.navigateTo('/pages/WorshipList/index')}
          >
            <View>财神名册</View>
          </View>
          <View className={`${root}-downBox-tips`}>
            <AtIcon value="chevron-left" size="22" color="#fec30a"></AtIcon>
            <AtIcon value="chevron-left" size="22" color="#fec30a"></AtIcon>
            <AtIcon value="chevron-left" size="22" color="#fec30a"></AtIcon>
            <View className={`${root}-downBox-tips-words`}>左滑返回首页</View>
          </View>
        </View>
      )}
    </View>
  );
};
export default SiderBar;
