import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import moment from 'moment';
import { View, Image } from '@tarojs/components';
import { AtFloatLayout } from 'taro-ui';
import type { FC } from 'react';
import LuComps from './components/LuComps';
import ResultModal from './components/ResultModal';
import { RouterUtil } from '@/utils';
import SiderBar from './components/SiderBar';
import MoreTimeModal from './components/MoreTimeModal';
import './index.less';
import 'taro-ui/dist/style/components/float-layout.scss';
import 'taro-ui/dist/style/components/calendar.scss';
import PassComps from './components/PassComps';
import { postApiV1Hotmaps, getApiV1Hotmaps } from '@/api';
import { useRequest } from 'ahooks';
const Page: FC = () => {
  const root = 'home';
  const [rateValue, setRateValue] = useState(0);
  const [count, setCount] = useState<number>(12);
  const [isOpened, setIsOpened] = useState(false);
  const [siderBarVisible, setSiderBarVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [resultContent, setResultContent] = useState({});
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [date, setDate] = useState<{ start: string; end: string }>({
    start: moment().format('YYYY-MM-DD'),
  } as any);

  const { run: updateHotmap } = useRequest(postApiV1Hotmaps, {
    manual: true,
  });

  const { run: fetchHotList } = useRequest(getApiV1Hotmaps, {
    manual: true,
    onSuccess: (res) => {
      const today_value =
        res?.data?.today_value >= 14 ? 14 : res?.data?.today_value || 0;
      setRateValue(30 * (today_value || 0));
      setCount(14 - today_value <= 0 ? -1 : 14 - today_value);
    },
  });
  const fetchBasicInfo = async () => {
    const res = await wx.login();
    if (res?.code) {
      fetchHotList({ open_id: res.code });
    }
  };
  const formatResult = () => {
    let resultObj;
    if (rateValue >= 99 && rateValue < 132) {
      resultObj = {
        tagName: '发财',
        words: '财运亨通',
        num: (Math.random() * 0.8 + 0.1).toFixed(2),
      };
    } else if (rateValue >= 198 && rateValue < 231) {
      resultObj = {
        tagName: '健康',
        words: '身强体健',
        num: (Math.random() * 30 + 10).toFixed(2),
      };
    } else if (rateValue >= 297 && rateValue < 330) {
      resultObj = {
        tagName: '桃花',
        words: '十里桃花',
        num: (Math.random() * 40 + 40).toFixed(2),
      };
    } else if (rateValue >= 396 && rateValue < 429) {
      resultObj = {
        tagName: '好运',
        words: '时来运转',
        num: (Math.random() * 20 + 80).toFixed(2),
      };
    }
    setResultContent(resultObj);
  };
  const onMammon = () => {
    const prev = rateValue + 30 > 400 ? 400 : rateValue + 30;
    const prevCount = count - 1 <= 0 ? 0 : count - 1;
    setCount(prevCount);
    setRateValue(prev);
  };
  const onOpen = () => {
    setSiderBarVisible(false);
    Taro.vibrateLong();
    setIsOpened(true);
    setTimeout(() => {
      setIsOpened(false);
      Taro.vibrateLong();
      onMammon();
    }, 2000);
  };
  // 获取当前时间的时间戳
  const currentTime = new Date().getTime();

  // 增加毫秒数
  const oneDay = 1 * 6 * 60 * 60 * 1000;

  // 计算明天的时间戳 修改处
  const tomorrowTime = 1 + oneDay;

  // 广告完成，获得次数
  const fetchMoreTime = () => {
    setSiderBarVisible(false);
    if (rateValue > 330 && rateValue < 400) {
      // 在页面中定义激励视频广告
      let videoAd: any = null;
      // 在页面onLoad回调事件中创建激励视频广告实例
      // @ts-ignore
      if (wx.createRewardedVideoAd) {
        // @ts-ignore
        videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-5bf9f7aa42580516',
        });
        videoAd?.onLoad(() => {});
        videoAd?.onError((err) => {
          console.error('激励视频加载失败', err);
        });
        videoAd?.onClose((res) => {
          if (res?.isEnded) {
            setCount(8);
            setMoreVisible(false);
          } else {
            setMoreVisible(false);
          }
        });
      }
      // 用户触发广告后，显示激励视频广告
      if (videoAd) {
        setSiderBarVisible(false);
        videoAd.show().catch(() => {
          // 失败重试
          videoAd
            .load()
            .then(() => videoAd.show())
            .catch((err) => {
              console.error('激励视频 广告显示失败', err);
            });
        });
      }
    } else {
      setCount(8);
      setMoreVisible(false);
    }
  };
  const fetchInfo = async () => {
    const res = await wx.login();
    if (res?.code) {
      updateHotmap({ open_id: res.code });
    }
  };
  const onSubmit = () => {
    setSiderBarVisible(false);
    if (rateValue < 400) {
      if (count > 0) {
        onOpen();
        fetchInfo();
      } else {
        setMoreVisible(true);
      }
    }
  };

  useEffect(() => {
    if (
      (rateValue > 99 && rateValue < 132) ||
      (rateValue > 198 && rateValue < 231) ||
      (rateValue > 297 && rateValue < 330) ||
      (rateValue > 396 && rateValue < 429)
    ) {
      formatResult();
      setResultVisible(true);
    }
  }, [rateValue]);

  const onDayClick = (e) => {
    setDate(e.value);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].pageX);
    setTouchStartY(e.touches[0].pageY);
  };
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].pageX);
    setTouchEndY(e.touches[0].pageY);
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 当手指左滑（结束位置小于起始位置）时触发某些操作
      if (deltaX > 0) {
        setSiderBarVisible(false);
      } else if (deltaX < 0) {
        setSiderBarVisible(true);
      }
      Taro.vibrateShort();
    }
  };
  useEffect(() => {
    // 将屏幕亮度调至最亮
    // @ts-ignore
    wx.setScreenBrightness({
      value: 1,
    });
    if (currentTime > tomorrowTime) {
      fetchBasicInfo();
    }
  }, []);

  useEffect(() => {
    if (count === 0) {
      setMoreVisible(true);
    }
  }, [count]);
  return (
    <View className={root}>
      {!(currentTime > tomorrowTime) ? (
        <PassComps onDayClick={onDayClick} date={date} />
      ) : (
        <View>
          <View
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <SiderBar visible={siderBarVisible} />
            <View className={`${root}-frontBG`}></View>
            <View className={`${root}-mammon`}>
              <View className={`${root}-mammon-item1`}></View>
            </View>
            <View className={`${root}-processBox`}>
              <LuComps
                imgName={
                  'https://wechat-oss.s3.cn-south-1.jdcloud-oss.com/fc.png?AWSAccessKeyId=JDC_4C732AF01388729C725284951596&Expires=1779367602&Signature=DkCkzAIO4Z%2B%2FzEtpjztl6BP%2BCA0%3D'
                }
                rate={rateValue > 0 ? rateValue : 0}
              />
              <LuComps
                imgName={
                  'https://wechat-oss.s3.cn-south-1.jdcloud-oss.com/jk.png?AWSAccessKeyId=JDC_4C732AF01388729C725284951596&Expires=1779367617&Signature=zk2ZqjRGAtXy9QPKaoa%2BDD%2F%2B2Go%3D'
                }
                rate={rateValue - 100 > 0 ? rateValue - 100 : 0}
              />
              <LuComps
                imgName={
                  'https://wechat-oss.s3.cn-south-1.jdcloud-oss.com/th.png?AWSAccessKeyId=JDC_4C732AF01388729C725284951596&Expires=1779367632&Signature=ibYzBzcIy35GwDAKlPcnM3qFy0M%3D'
                }
                rate={rateValue - 200 > 0 ? rateValue - 200 : 0}
              />
              <LuComps
                imgName={
                  'https://wechat-oss.s3.cn-south-1.jdcloud-oss.com/hy.png?AWSAccessKeyId=JDC_4C732AF01388729C725284951596&Expires=1779367648&Signature=TLTdGFDnx5YXJ8Yb1sk5PylMiLk%3D'
                }
                rate={rateValue - 300 > 0 ? rateValue - 300 : 0}
              />
            </View>
            <View
              className={`${root}-tips`}
              onClick={() => setSiderBarVisible(true)}
            >
              <View>右滑进入个人中心</View>
              <Image
                className={`${root}-tips-icon`}
                src={
                  'https://wechat-oss.s3.cn-south-1.jdcloud-oss.com/worship/%E6%96%B9%E5%90%91%E5%90%91%E5%8F%B3-%E5%8F%8C.png?AWSAccessKeyId=JDC_4C732AF01388729C725284951596&Expires=1784117566&Signature=88UF2nt0iO%2BhxZzQcBhlHjGNGaU%3D'
                }
              />
            </View>
          </View>
          <View className={`${root}-btnBox`} onClick={onSubmit}>
            <View className={`${root}-btnBox-btn`}>
              <Image
                className={`${root}-btnBox-btn-icon`}
                src={
                  'https://wechat-oss.s3.cn-south-1.jdcloud-oss.com/yuanbao.png?AWSAccessKeyId=JDC_4C732AF01388729C725284951596&Expires=1779367586&Signature=jNRZgDHyxiI9%2F90PHW5WEi5fqw0%3D'
                }
              />
              <View>
                {rateValue >= 400
                  ? '今日功德圆满，大吉大利～'
                  : `敬拜财神 (剩 ${count} 次)`}
              </View>
            </View>
          </View>
          <View
            className={`${root}-btnBoxLink`}
            onClick={() => RouterUtil.navigateTo(`/pages/complain/index`)}
          >
            <Image
              className={`${root}-btnBoxLink-icon`}
              src="https://wechat-oss.s3.cn-south-1.jdcloud-oss.com/%E6%8A%95%E8%AF%89%281%29.png?AWSAccessKeyId=JDC_4C732AF01388729C725284951596&Expires=1779367998&Signature=IiOax9eNqZTl7%2F79x7RyV%2Fk3Mhg%3D"
            />
            投诉
          </View>
        </View>
      )}

      {isOpened && (
        <AtFloatLayout isOpened={isOpened}>
          {isOpened && (
            <View className={`${root}-guiImg`}>
              <View className={`${root}-guiImg-title`}>
                财神在上，敬此一拜～
              </View>
            </View>
          )}
        </AtFloatLayout>
      )}
      <ResultModal
        btnText={'继续'}
        resultContent={resultContent}
        visible={resultVisible}
        onCancel={() => setResultVisible(false)}
      />
      <MoreTimeModal visible={moreVisible} onOk={fetchMoreTime} />
    </View>
  );
};

export default Page;
