import React from  'react';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from "taro-ui"

import './index.scss'
interface IStep1Props {
  onEmit: (type:1|2|3|4) => void
}
const Step1: React.FC<IStep1Props> = ({onEmit}) => {
  const root = 'step1';
  return (
    <View className={root}>
      <View  className={`${root}-title`}>请选择反馈类型</View>
      <View  className={`${root}-tips`}>向微信平台投诉</View>
      <AtList>
        <AtListItem onClick={()=>onEmit(2)} title='违规举报' note='若遇色情、诱导、骚扰、欺诈、恶意营销、违法犯罪等情况，可向微信举报。' arrow='right' />
      </AtList>
    </View>
  )
}
export default Step1