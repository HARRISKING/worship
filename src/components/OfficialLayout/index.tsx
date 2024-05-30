import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';

import { RouterUtil, getSystemInfo, longStrHandle } from '@/utils';
import Header from './Header';

import './index.scss';

export interface BasicLayoutProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  title: React.ReactNode | string;
  action?: React.ReactNode; // 左上角操作按钮（优先级比 back 和 home 高）
  back?: boolean; // 操作按钮是否使用返回
  onBack?: () => void;
  home?: boolean; // 操作按钮是否使用主页（优先级比 back 高）
  fill?: boolean; // 内容区宽度是否占满屏幕（不留 padding）
  hasTabBar?: boolean; // 是否存在 tarBar
  isShowHeader?: boolean;
  [key: string]: any;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({
  children,
  className,
  style,
  contentStyle,
  id,
  title,
  action,
  back = true,
  home = false,
  fill = false,
  hasTabBar = false,
  isShowHeader = true,
  onBack,
}) => {
  const { statusBarHeight, supportCustomNav } = useMemo(
    () => getSystemInfo(),
    []
  );
  useEffect(() => {
    const pages = Taro.getCurrentPages();
    setIsHome(pages?.length === 1);
  }, []);

  const backHome = () => {
    RouterUtil.switchTab('/pages/workbench/index');
  };

  const [isHome, setIsHome] = useState<boolean>(home);

  useEffect(() => {
    Taro.showShareMenu({});
  }, []);

  return (
    <View
      className={classnames(
        'g-basic-layout',
        {
          'g-basic-layout-with-tab-bar': hasTabBar,
        },
        className
      )}
      style={style}
    >
      {supportCustomNav && isShowHeader && (
        <Header
          statusBarHeight={statusBarHeight}
          action={action}
          back={back}
          home={home}
          onBack={!isHome ? onBack : onBack || backHome}
        >
          {typeof title === 'string' ? longStrHandle(title, 8) : title}
        </Header>
      )}

      <View
        id={id}
        className={classnames('g-basic-layout-content', {
          'g-basic-layout-content-fill': fill,
        })}
        // height 固定是44
        style={{
          paddingTop:
            supportCustomNav && isShowHeader
              ? `calc(${statusBarHeight}px + ${Taro.pxTransform(96)})`
              : 0,
          ...contentStyle,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default BasicLayout;
