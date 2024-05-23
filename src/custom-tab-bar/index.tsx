import { Image as CoverImage, View as CoverView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { RouterUtil } from '@/utils';

import { tabList } from './config';
import styles from './index.module.scss';

interface IProps {}

const CustomTabBar: Taro.FC<IProps> = () => {
  const [tempPath, setTempPath] = useState('/pages/home/index');
  const [pagePath, setPagePath] = useState('/pages/home/index');

  /**
   * 切换 Tab
   * @param path {String} 路由地址
   */
  const handleToggle = (path: string) => {
    RouterUtil.switchTab(path);
  };

  // 判断是否在list内，并且为了list值为最新使用外层函数
  const isPath = () => {
    return tabList?.map((item) => item.pagePath)?.includes(tempPath);
  };

  useEffect(() => {
    wx.onAppRouteDone((res) => {
      const path = `/${res?.path}`;
      setTempPath(path);
    });
  }, []);

  useEffect(() => {
    if (isPath()) {
      setPagePath(tempPath);
    }
  }, [tempPath]);

  return (
    <CoverView className={styles.container}>
      {tabList.map((item) => {
        const isActive = item.pagePath === pagePath;
        return (
          <CoverView
            className={styles.item}
            key={item.pagePath}
            onClick={() => {
              handleToggle(item.pagePath);
            }}
          >
            {item?.isCenter ? (
              <CoverView className={styles.iconWrap}>
                <CoverImage
                  src={isActive ? item.selectedIconPath : item.iconPath}
                  className={styles.centerIcon}
                />
              </CoverView>
            ) : (
              <CoverImage
                src={isActive ? item.selectedIconPath : item.iconPath}
                className={styles.icon}
              />
            )}
            <CoverView
              className={classNames(styles.text, isActive && styles.activeText)}
            >
              {item.text}
            </CoverView>
          </CoverView>
        );
      })}
    </CoverView>
  );
};

export default CustomTabBar;
