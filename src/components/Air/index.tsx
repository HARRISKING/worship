import { View } from '@tarojs/components';
import classNames from 'classnames';
import * as React from 'react';

import './index.scss';

interface IAirProps {
  mode?: 'cold' | 'heat';
}

const prefix = 'c-air';

const Air: React.FunctionComponent<IAirProps> = ({ mode }) => {
  return (
    <View className={`${prefix}-wrap`}>
      <View
        className={classNames(prefix, mode === 'heat' && `${prefix}-heat`)}
      />
    </View>
  );
};

export default Air;
