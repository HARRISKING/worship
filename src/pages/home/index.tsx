import React from 'react';
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
  return <View className={root}>
    <View  className={`${root}-mammon`} />
    <View  className={`${root}-processBox`}>
      <LuComps imgName={fc} /> 
      <LuComps imgName={jk} /> 
      <LuComps imgName={th} /> 
      <LuComps imgName={hy} /> 
    </View>
    <View className={`${root}-btnBox`}>
      <View  className={`${root}-btnBox-btn`}>
        <Image className={`${root}-btnBox-btn-icon`} src={yuanbao} />
        <View>跪拜</View></View>
    </View>
  </View>;

};

export default Page;
