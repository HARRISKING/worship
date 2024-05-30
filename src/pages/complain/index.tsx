import React, { useState } from 'react';
import { View } from '@tarojs/components';
import OfficialLayout from '@/components/OfficialLayout';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import './index.scss';
interface IComplainProps {}
const Complain: React.FC<IComplainProps> = () => {
  const root = 'complain';
  const [current, setCurrent] = useState<1 | 2 | 3 | 4>(1);
  const [keyVal, setKeyVal] = useState<number>(0);

  const onHandleEmit = (type: 1 | 2 | 3 | 4, keyData?: number) => {
    setCurrent(type);
    if (keyData === undefined) return;
    setKeyVal(keyData || 0);
  };

  const formatHtml = (type: 1 | 2 | 3 | 4, keyData: number) => {
    switch (type) {
      case 1:
        return <Step1 onEmit={onHandleEmit} />;
      case 2:
        return <Step2 onEmit={onHandleEmit} />;
      case 3:
        return <Step3 keyVal={keyData} onEmit={onHandleEmit} />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 onEmit={onHandleEmit} />;
    }
  };
  return (
    <OfficialLayout title="" fill back hasTabBar>
      <View className={root}>{formatHtml(current || 1, keyVal)}</View>
    </OfficialLayout>
  );
};
export default Complain;
