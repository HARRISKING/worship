import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import jk from '@/assets/images/jk.png'
import yuanbao from '@/assets/images/yuanbao.png'
import hy from '@/assets/images/hy.png'
import th from '@/assets/images/th.png'
import fc from '@/assets/images/fc.png'
import { View,Image } from '@tarojs/components';
import type { FC } from 'react';
import LuComps from './components/LuComps';
import './index.less'
const Page: FC = () => {
  const root='home'
  const [rateValue, setRateValue] = useState(0)

  const onMammon = () => {
    const prev =  rateValue + 34 > 400 ? 400 : rateValue + 34;
    setRateValue(prev) 
    setTimeout(()=>{
      Taro.vibrateLong();
    },500)
  }
  return <View className={root}>
    <View  className={`${root}-mammon`} />
    <View  className={`${root}-processBox`}>
      <LuComps imgName={fc} rate={rateValue > 0 ? rateValue : 0} /> 
      <LuComps imgName={jk}  rate={rateValue - 100 > 0 ? rateValue - 100 : 0}  /> 
      <LuComps imgName={th} rate={rateValue - 200 > 0 ? rateValue - 200 : 0}  /> 
      <LuComps imgName={hy} rate={rateValue - 300 > 0 ? rateValue - 300 : 0} /> 
    </View>
    <View className={`${root}-btnBox`} onClick={()=>onMammon()}>
      <View  className={`${root}-btnBox-btn`}>
        <Image className={`${root}-btnBox-btn-icon`} src={yuanbao} />
        <View>跪拜</View>
      </View>
    </View>
  </View>;

};

export default Page;
