import React from  'react';
import { View } from '@tarojs/components';

import { AtModal, AtModalContent  } from "taro-ui"
import "taro-ui/dist/style/components/modal.scss";

import './index.less'
interface IResultModalProps {
  visible: boolean;
  onCancel: () => void;
  btnText:string
  resultContent:any;
}
const ResultModal: React.FC<IResultModalProps> = ({visible,btnText,resultContent,onCancel}) => {
  const root = 'ResultModal'
  React.useEffect(()=>{
  },[])
  return (
    <AtModal closeOnClickOverlay={false} className={root} isOpened={visible}>
      <AtModalContent>
        <View className={`${root}-content`}>{`${resultContent?.tagName||'发财'}愿望达成，今日您必将${resultContent?.words||'财运亨通'}。`}</View>
        <View className={`${root}-content`}>{`此次敬拜，恭喜您击败了全国${resultContent?.num ||0 }%的用户。`}</View>
        <View className={`${root}-btn`} onClick={onCancel}> 
          <View>{btnText}</View>
          </View>
      </AtModalContent>
    </AtModal>
  )
}
export default ResultModal