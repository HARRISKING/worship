import React from 'react';
import { View, Image } from '@tarojs/components';
import { RouterUtil } from '@/utils';
import './index.scss';
interface IStep4Props {}
const Step4: React.FC<IStep4Props> = () => {
  const root = 'step4';
  return (
    <View className={root}>
      <Image
        className={`${root}-icon`}
        src={
          'https://wechat-oss.s3.cn-south-1.jdcloud-oss.com/select.png?AWSAccessKeyId=JDC_4C732AF01388729C725284951596&Expires=1779361305&Signature=mf3Y16nCm8GXfMWLH8G3xkvTrFc%3D'
        }
      />
      <View className={`${root}-title`}>投诉成功</View>
      <View className={`${root}-desc`}>
        感谢你的参与，微信坚决反对色情、暴力、欺诈等违规信息，我们会认真处理你的投诉，维护绿色、健康的网络环境。
      </View>
      <View
        className={`${root}-btn`}
        onClick={() => {
          RouterUtil.reLaunch('/pages/home/index');
        }}
      >
        确定
      </View>
    </View>
  );
};
export default Step4;
