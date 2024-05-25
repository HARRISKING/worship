import React from  'react';
import { View, Image } from '@tarojs/components';

import water1 from '@/assets/images/water2.webp'
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
        backgroundImage: `url(${water1})`,
        top: `${100}%`,
      }} className={`${root}-container-warter`}>
        <View>未</View>
        <View>开</View>
        <View>启</View>
        </View>
    </View>
    
  </View>
  )
}
export default LuComps
