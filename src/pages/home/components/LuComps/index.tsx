import React from  'react';
import { View, Image } from '@tarojs/components';

import './index.less'
interface ILuCompsProps {
  imgName: string;  
  rate: number;
}
const LuComps: React.FC<ILuCompsProps> = ({imgName, rate}) => {
  const root = 'lu-comps'
return (
  <View className={root}>
    <View className={`${root}-container`}>
      <Image className={`${root}-container-img`} src={imgName} />
      <View style={{
        top: `${rate}%`,
      }} className={`${root}-container-warter`}>
        <View>未</View>
        <View>开</View>
        <View>光</View>
        </View>
    </View>
    
  </View>
  )
}
export default LuComps
