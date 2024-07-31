import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import React from 'react';

import { RouterUtil } from '@/utils';
import { debounce } from '@/utils/tool';

import './index.scss';

interface HeaderProps {
  statusBarHeight?: number;
  back?: boolean;
  onBack?: () => void;
  home?: boolean;
  action?: React.ReactNode;
}

const prefix = 'g-basic-layout-header';

const Header: React.FC<HeaderProps> = ({
  statusBarHeight,
  back,
  onBack,
  home,
  action,
  children,
}) => {
  const headerClickCount = React.useRef(0);
  const headerClickReset = debounce(
    () => {
      headerClickCount.current = 0;
    },
    888,
    false
  );

  // 渲染操作按钮
  const renderAction = () => {
    // 如果存在自定义渲染方式则直接渲染
    if (action) return action;
    // 首页
    if (home) {
      return (
        <View
          className={classnames(
            'at-icon',
            'at-icon-home',
            `${prefix}-action-icon`
          )}
          onClick={() =>
            process.env.APPID === 'wx4ecfdb5bae248137'
              ? RouterUtil.closeAllTo('/pages/office/index')
              : RouterUtil.switchTab('/pages/workbench/index')
          }
        />
      );
    } else if (back) {
      // 返回键
      return (
        <View
          className={classnames(
            'at-icon',
            'at-icon-chevron-left',
            `${prefix}-action-icon`
          )}
          onClick={() => {
            onBack ? onBack() : RouterUtil.navigateBack();
          }}
        />
      );
    }
  };

  return (
    <View
      className={`${prefix}`}
      style={{
        paddingTop: `${statusBarHeight}px`,
      }}
    >
      <View
        className={`${prefix}-content`}
        style={{
          // 高度固定96
          height: Taro.pxTransform(96),
        }}
      >
        <View className={`${prefix}-action`}>{renderAction()}</View>
        <View
          className={`${prefix}-title`}
          onClick={() => {
            headerClickCount.current += 1;
            headerClickReset();
            if (headerClickCount.current === 5) {
              RouterUtil.navigateTo('/pages/devtools/index');
            }
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default Header;
