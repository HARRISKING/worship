import React, { useState } from 'react';
import { View, Image } from '@tarojs/components';
import { AtTextarea } from 'taro-ui';
import './index.scss';
interface IStep3Props {
  keyVal: number;
  onEmit: (type: 1 | 2 | 3 | 4) => void;
}
const Step3: React.FC<IStep3Props> = ({ keyVal, onEmit }) => {
  const root = 'step3';
  const [isSelect, setIsSelect] = useState(false);
  const [text, setText] = useState('');
  const typeList = (type: number) => {
    const typeMap = new Map([
      [0, '欺诈'],
      [1, '色情低俗'],
      [2, '诱导'],
      [3, '传播不实信息'],
      [4, '违法犯罪'],
      [5, '骚扰'],
      [6, '侵权（诽谤、抄袭）'],
      [7, '混淆他人投诉'],
      [8, '恶意营销'],
      [9, '与服务类目不符'],
      [10, '隐私信息收集'],
      [11, '其他'],
    ]);
    return typeMap.get(type);
  };

  return (
    <View className={root}>
      <View className={`${root}-target`}>
        <View className={`${root}-target-title`}>投诉对象</View>
        <View className={`${root}-target-body`}>
          <Image
            className={`${root}-target-body-icon`}
            src={
              'https://fe-cloud.uni-ubi.com/image/1717045717520-版本3.png?x-oss-process=img/q/80'
            }
          />
          <View className={`${root}-target-body-name`}>天官赐富</View>
        </View>
      </View>
      <View className={`${root}-content`}>
        <View className={`${root}-content-title`}>{typeList(keyVal)}</View>
        <View className={`${root}-content-textarea`}>
          <AtTextarea
            value={text}
            onChange={setText}
            maxLength={200}
            count
            placeholder="请输入投诉内容"
          />
        </View>
        <View className={`${root}-content-btnBox`}>
          <View
            className={`${root}-content-btnBox-tips`}
            onClick={() => setIsSelect((pre) => !pre)}
          >
            <Image
              className={`${root}-content-btnBox-tips-icon`}
              src={
                isSelect
                  ? 'https://fe-cloud.uni-ubi.com/image/1705379681671-选择 (1) (1).png?x-oss-process=img/q/80'
                  : 'https://fe-cloud.uni-ubi.com/image/1705379681677-选择 (2).png?x-oss-process=img/q/80'
              }
            />
            <View className={`${root}-content-btnBox-tips-info`}>
              允许微信使用小程序当前页面的数据和截图作为投诉证据。
              <View className={`${root}-content-btnBox-tips-protocal`}>
                《相关说明》
              </View>
            </View>
          </View>
          <View
            onClick={() => isSelect && text && onEmit(4)}
            className={
              isSelect && text
                ? `${root}-content-btnBox-btn`
                : `${root}-content-btnBox-actice`
            }
          >
            提交
          </View>
        </View>
      </View>
    </View>
  );
};
export default Step3;
