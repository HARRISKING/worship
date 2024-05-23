import React from 'react';
import { View } from '@tarojs/components';

import type { FC } from 'react';
import './index.less'
const Page: FC = () => {
  const root='home'
  return <View className={root}>
    <View  className={`${root}-mammon`}></View>
    <View  className={`${root}-processBox`}>
      <View  className={`${root}-processBox-processItem`}>富强</View>
      <View  className={`${root}-processBox-processItem`}>民主</View>
      <View  className={`${root}-processBox-processItem`}>文明</View>
      <View  className={`${root}-processBox-processItem`}>和谐</View>
    </View>
    <View  className={`${root}-person`}>跪拜区</View>
  </View>;

};

export default Page;
