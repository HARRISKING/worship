import React, { useEffect } from 'react';
import { getApiV1Hotmaps } from '@/api';
import { useRequest } from 'ahooks';
import { View, Image } from '@tarojs/components';
import HotMap from '../HotMap';
import './index.less';
import classNames from 'classnames';
interface ISiderBarProps {
  visible: boolean;
}
const SiderBar: React.FC<ISiderBarProps> = ({ visible }) => {
  const root = 'siderbar';
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
      <View className={`${root}-btn`}>
        <Image
          className={`${root}-btn-icon`}
          src={
            'https://wechat-oss.s3.cn-south-1.jdcloud-oss.com/worship/%E6%96%B9%E5%90%91%E5%90%91%E5%8F%B3-%E5%8F%8C.png?AWSAccessKeyId=JDC_4C732AF01388729C725284951596&Expires=1784117566&Signature=88UF2nt0iO%2BhxZzQcBhlHjGNGaU%3D'
          }
        />
        <View>左滑回首页</View>
      </View>
    </View>
  );
};
export default SiderBar;
