import React, {  useEffect, useState } from 'react';
import Taro from '@tarojs/taro';

import { View,Image } from '@tarojs/components';
import { AtFloatLayout } from "taro-ui"
import type { FC } from 'react';
import LuComps from './components/LuComps';
import ResultModal from './components/ResultModal';
import MoreTimeModal from './components/MoreTimeModal';
import './index.less'
import "taro-ui/dist/style/components/float-layout.scss";
const Page: FC = () => {
  const root='home'
  const [rateValue, setRateValue] = useState(0)
  const [count, setCount] = useState(4)
  const [isOpened,setIsOpened] = useState(false)
  const [resultVisible,setResultVisible] = useState(false)
  const [moreVisible,setMoreVisible] = useState(false)
  const [resultContent,setResultContent] = useState({})

  const formatResult = ()=>{
    let resultObj
    if( rateValue >= 99 && rateValue<132 ){
      resultObj = {
        tagName: '发财',
        words: '财运亨通',
        num: (Math.random() * 0.8 + 0.1).toFixed(2)
      }
    }else if(rateValue >= 198 && rateValue<231){
      resultObj = {
        tagName: '健康',
        words: '身强体健',
        num: (Math.random() * 30 + 10).toFixed(2)
      }
    }else if(rateValue >= 297 && rateValue<330){
      resultObj = {
        tagName: '桃花',
        words: '十里桃花',
        num:(Math.random() * 40 + 40).toFixed(2)
      }
    }else if(rateValue >= 396 && rateValue< 429){
      resultObj = {
        tagName: '好运',
        words: '时来运转',
        num: (Math.random() * 20 + 80).toFixed(2)
      }
    }
    setResultContent(resultObj) 
  }
  const onMammon = () => {
    const prev =  rateValue + 30 > 400 ? 400 : rateValue + 30;
    const prevCount = count-1 <= 0 ? 0 : count-1  
    setCount(prevCount)
    setRateValue(prev) 
  }
  const onOpen=()=>{
    Taro.vibrateLong();
    setIsOpened(true)
    setTimeout(()=>{
      setIsOpened(false)
      Taro.vibrateLong();
      onMammon()
    },2000)
  }

  // 广告完成，获得次数
  const fetchMoreTime = () => {
    setCount(4)
    setMoreVisible(false)
  }

  const onSubmit = () => {
   if(rateValue < 400){
      if(count > 0){
        onOpen()
      }else{
        setMoreVisible(true)
      }
   } 
  }


  useEffect(()=>{
    if((rateValue>99 && rateValue<132) || (rateValue>198 && rateValue<231) || (rateValue> 297 && rateValue<330) || (rateValue>396 && rateValue<429) ){
      formatResult() 
      setResultVisible(true)
    }
  },[rateValue])

  return <View className={root}>
    <View className={`${root}-mammon`}>
      <View className={`${root}-mammon-item1`}></View>
      <View className={`${root}-mammon-item2`}></View>
    </View>
    <View  className={`${root}-processBox`}>
      <LuComps imgName={'https://fe-cloud.uni-ubi.com/image/1716622900318-fc.png?x-oss-process=img/q/80'} rate={rateValue > 0 ? rateValue : 0} /> 
      <LuComps imgName={'https://fe-cloud.uni-ubi.com/image/1716622900322-jk.png?x-oss-process=img/q/80'}  rate={rateValue - 100 > 0 ? rateValue - 100 : 0}  /> 
      <LuComps imgName={'https://fe-cloud.uni-ubi.com/image/1716622900323-th.png?x-oss-process=img/q/80'} rate={rateValue - 200 > 0 ? rateValue - 200 : 0}  /> 
      <LuComps imgName={'https://fe-cloud.uni-ubi.com/image/1716622900320-hy.png?x-oss-process=img/q/80'} rate={rateValue - 300 > 0 ? rateValue - 300 : 0} /> 
    </View>
    <View className={`${root}-btnBox`} onClick={onSubmit}>
      <View  className={`${root}-btnBox-btn`}>
        <Image className={`${root}-btnBox-btn-icon`} src={'https://fe-cloud.uni-ubi.com/image/1716622900325-yuanbao.png?x-oss-process=img/q/80'} />
        <View>{rateValue === 400 ? '今日功德圆满，大吉大利～' : `敬拜财神 (剩${count}次)`}</View>
      </View>
    </View>
    {
      isOpened && (
        <AtFloatLayout isOpened={isOpened}>
          {
            isOpened && (
              <View className={`${root}-guiImg`}>
                <View  className={`${root}-guiImg-title`}>财神在上，敬此一拜～</View>
              </View>
            )
          }
        </AtFloatLayout>
      )
    }
    <ResultModal btnText={'继续'} resultContent={resultContent} visible={resultVisible}  onCancel={()=>setResultVisible(false)}/>
    <MoreTimeModal visible={moreVisible}  onOk={fetchMoreTime}/>
  </View>;

};

export default Page;
