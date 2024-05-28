import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import moment from 'moment';
import { View, Image } from '@tarojs/components';
import { AtFloatLayout, AtCalendar } from 'taro-ui';
import type { FC } from 'react';
import LuComps from './components/LuComps';
import ResultModal from './components/ResultModal';
import MoreTimeModal from './components/MoreTimeModal';
import './index.less';
import 'taro-ui/dist/style/components/float-layout.scss';
import 'taro-ui/dist/style/components/calendar.scss';
const Page: FC = () => {
  const root = 'home';
  const [rateValue, setRateValue] = useState(0);
  const [count, setCount] = useState(4);
  const [isOpened, setIsOpened] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [resultContent, setResultContent] = useState({});
  const [date, setDate] = useState<{ start: string; end: string }>({
    start: moment().format('YYYY-MM-DD'),
  } as any);

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

  // 增加两天的毫秒数
  const oneDay = 2 * 24 * 60 * 60 * 1000;

  // 计算明天的时间戳 修改处
  const tomorrowTime = 1706407949603 + oneDay;

  // 广告完成，获得次数
  const fetchMoreTime = () => {
    // 在页面中定义激励视频广告
    let videoAd = null;

    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-5bf9f7aa42580516',
      });
      videoAd?.onLoad(() => {});
      videoAd?.onError((err) => {
        console.error('激励视频加载失败', err);
      });
      videoAd?.onClose((res) => {
        if (res?.isEnded) {
          setCount(4);
          setMoreVisible(false);
        }
      });
    }
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
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
  };

  const onSubmit = () => {
    if (rateValue < 400) {
      if (count > 0) {
        onOpen();
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

  useEffect(() => {
    let timeoutId; // 用来保存定时器ID

    // 将屏幕亮度调至最亮
    wx.setScreenBrightness({
      value: 1,
    });

    const resetAtMidnight = () => {
      setRateValue(0); // 清空数据
      setNextMidnightTimeout(); // 再次设置定时器，准备下一轮触发
    };

    const setNextMidnightTimeout = () => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      );
      const delay = midnight.getTime() - now.getTime(); // 计算当前时间到次日0点的时间差

      if (timeoutId !== null) {
        clearTimeout(timeoutId); // 如果有正在等待的定时器，先清除
      }
      timeoutId = setTimeout(resetAtMidnight, delay); // 保存新的定时器ID
    };

    setNextMidnightTimeout(); // 首次调用，设置定时器
    return () => {
      clearTimeout(timeoutId); // 组件卸载时清除定时器
    };
  }, []);

  const onDayClick = (e) => {
    setDate(e.value);
  };
  return (
    <View className={root}>
      {!!(currentTime > tomorrowTime) ? (
        <View className={`${root}-calendarBox`}>
          <View className={`${root}-calendarBox-dateBox`}>
            <View className={`${root}-calendarBox-dateBox-timeBox`}>
              已过了
              <View
                style={{ color: '#fec30a', fontSize: 36, margin: '0 10px' }}
              >
                {moment(date?.start).dayOfYear()}
              </View>
              天
            </View>
            <View className={`${root}-calendarBox-dateBox-timeBox`}>
              本年第
              <View
                style={{ color: '#fec30a', fontSize: 36, margin: '0 10px' }}
              >
                {moment(date?.start).week()}
              </View>
              周
            </View>
            <View className={`${root}-calendarBox-dateBox-timeBox`}>
              ISO周号为
              <View
                style={{ color: '#fec30a', fontSize: 36, margin: '0 10px' }}
              >
                {moment(date?.start).isoWeek()}
              </View>
            </View>
          </View>
          <View className={`${root}-calendarBox-calendar`}>
            <AtCalendar onSelectDate={onDayClick} />
          </View>
        </View>
      ) : (
        <View>
          <View className={`${root}-mammon`}>
            <View className={`${root}-mammon-item1`}></View>
            <View className={`${root}-mammon-item2`}></View>
          </View>
          <View className={`${root}-processBox`}>
            <LuComps
              imgName={
                'https://fe-cloud.uni-ubi.com/image/1716622900318-fc.png?x-oss-process=img/q/80'
              }
              rate={rateValue > 0 ? rateValue : 0}
            />
            <LuComps
              imgName={
                'https://fe-cloud.uni-ubi.com/image/1716622900322-jk.png?x-oss-process=img/q/80'
              }
              rate={rateValue - 100 > 0 ? rateValue - 100 : 0}
            />
            <LuComps
              imgName={
                'https://fe-cloud.uni-ubi.com/image/1716622900323-th.png?x-oss-process=img/q/80'
              }
              rate={rateValue - 200 > 0 ? rateValue - 200 : 0}
            />
            <LuComps
              imgName={
                'https://fe-cloud.uni-ubi.com/image/1716622900320-hy.png?x-oss-process=img/q/80'
              }
              rate={rateValue - 300 > 0 ? rateValue - 300 : 0}
            />
          </View>
          <View className={`${root}-btnBox`} onClick={onSubmit}>
            <View className={`${root}-btnBox-btn`}>
              <Image
                className={`${root}-btnBox-btn-icon`}
                src={
                  'https://fe-cloud.uni-ubi.com/image/1716622900325-yuanbao.png?x-oss-process=img/q/80'
                }
              />
              <View>
                {rateValue === 400
                  ? '今日功德圆满，大吉大利～'
                  : `敬拜财神 (剩${count}次)`}
              </View>
            </View>
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
