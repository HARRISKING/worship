import React from  'react';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from "taro-ui"
import './index.scss'
interface IStep2Props {
  onEmit: (type:1|2|3|4, keyVal) => void
}
const Step2: React.FC<IStep2Props> = ({onEmit}) => {
  const root="step2"
  const typeList = [
    { keyVal: 0, label: '欺诈' },
    { keyVal: 1, label: '色情低俗' },
    { keyVal: 2, label: '诱导' },
    { keyVal: 3, label: '传播不实信息' },
    { keyVal: 4, label: '违法犯罪' },
    { keyVal: 5, label: '骚扰' },
    { keyVal: 6, label: '侵权（诽谤、抄袭）' },
    { keyVal: 7, label: '混淆他人投诉' },
    { keyVal: 8, label: '恶意营销' },
    { keyVal: 9, label: '与服务类目不符' },
    { keyVal: 10, label: '隐私信息收集' },
    { keyVal: 11, label: '其他' }
  ]
  return (
    <View className={root}>
       <View  className={`${root}-title`}>请选择投诉原因</View>
      <AtList>
        {(typeList||[]).map(item=>(
          <AtListItem onClick={() => onEmit(3, item.keyVal)} key={item.keyVal} title={item?.label} arrow='right' />
        ))}
      </AtList>
    </View>
  )
}
export default Step2