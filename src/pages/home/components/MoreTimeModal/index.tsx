import React from  'react';
import { View } from '@tarojs/components';

import { AtModal, AtModalContent  } from "taro-ui"
import "taro-ui/dist/style/components/modal.scss";

import './index.less'
interface IMoreTimeModalProps {
  visible: boolean;
  onOk: () => void;
}
const MoreTimeModal: React.FC<IMoreTimeModalProps> = ({visible, onOk}) => {
  const root = 'MoreTimeModal'
  React.useEffect(()=>{
  },[])
  return (
    <AtModal closeOnClickOverlay={false} className={root} isOpened={visible}>
      <AtModalContent>
        <View className={`${root}-content`}>{'哎呀，敬拜次数用完啦～'}</View>
        <View className={`${root}-btn`} onClick={onOk}> 
          <View>获得更多次数</View>
          </View>
      </AtModalContent>
    </AtModal>
  )
}
export default MoreTimeModal