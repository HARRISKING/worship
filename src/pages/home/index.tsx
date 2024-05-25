import React, {  useState } from 'react';
import Taro from '@tarojs/taro';

import { View,Image } from '@tarojs/components';
import { AtFloatLayout } from "taro-ui"
import type { FC } from 'react';
import LuComps from './components/LuComps';
import './index.less'
const Page: FC = () => {
  const root='home'
  const [rateValue, setRateValue] = useState(0)
  const [isOpened,setIsOpened] = useState(false)
  const onMammon = () => {
    const prev =  rateValue + 34 > 400 ? 400 : rateValue + 34;
    setRateValue(prev) 
    setTimeout(()=>{
      Taro.vibrateLong();
    },500)
  }
  const onOpen=()=>{
    Taro.vibrateLong();
    setIsOpened(true)
    setTimeout(()=>{
      setIsOpened(false)
      onMammon()
    },2000)
  }

  return <View className={root}>
    <View  className={`${root}-mammon`} />
    <View  className={`${root}-processBox`}>
      <LuComps imgName={'https://fe-cloud.uni-ubi.com/image/1716622900318-fc.png?x-oss-process=img/q/80'} rate={rateValue > 0 ? rateValue : 0} /> 
      <LuComps imgName={'https://fe-cloud.uni-ubi.com/image/1716622900322-jk.png?x-oss-process=img/q/80'}  rate={rateValue - 100 > 0 ? rateValue - 100 : 0}  /> 
      <LuComps imgName={'https://fe-cloud.uni-ubi.com/image/1716622900323-th.png?x-oss-process=img/q/80'} rate={rateValue - 200 > 0 ? rateValue - 200 : 0}  /> 
      <LuComps imgName={'https://fe-cloud.uni-ubi.com/image/1716622900320-hy.png?x-oss-process=img/q/80'} rate={rateValue - 300 > 0 ? rateValue - 300 : 0} /> 
    </View>
    <View className={`${root}-btnBox`} onClick={()=> {rateValue < 400 && onOpen()}}>
      <View  className={`${root}-btnBox-btn`}>
        <Image className={`${root}-btnBox-btn-icon`} src={'https://fe-cloud.uni-ubi.com/image/1716622900325-yuanbao.png?x-oss-process=img/q/80'} />
        <View>{rateValue === 400 ? '今日功德圆满～' : '跪拜'}</View>
      </View>
    </View>
    {
      isOpened && (
        <AtFloatLayout isOpened={isOpened} onClose={()=>setIsOpened(false)}>
          {
            isOpened && (
              <View className={`${root}-guiImg`}></View>
            )
          }
        </AtFloatLayout>
      )
    }

  </View>;

};

export default Page;
