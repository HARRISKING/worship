import React from 'react';
import { View } from '@tarojs/components';
import { AtCalendar } from 'taro-ui';
import moment from 'moment';
import './index.less';
interface IPassCompsProps {
  date: { start: string; end: string };
  onDayClick: (e) => void;
}
const PassComps: React.FC<IPassCompsProps> = ({ date, onDayClick }) => {
  const root = 'pass';
  return (
    <View className={root}>
      <View className={`${root}-calendarBox`}>
        <View className={`${root}-calendarBox-dateBox`}>
          <View className={`${root}-calendarBox-dateBox-timeBox`}>
            已过了
            <View style={{ color: '#fec30a', fontSize: 36, margin: '0 10px' }}>
              {moment(date?.start).dayOfYear()}
            </View>
            天
          </View>
          <View className={`${root}-calendarBox-dateBox-timeBox`}>
            本年第
            <View style={{ color: '#fec30a', fontSize: 36, margin: '0 10px' }}>
              {moment(date?.start).week()}
            </View>
            周
          </View>
          <View className={`${root}-calendarBox-dateBox-timeBox`}>
            ISO周号为
            <View style={{ color: '#fec30a', fontSize: 36, margin: '0 10px' }}>
              {moment(date?.start).isoWeek()}
            </View>
          </View>
        </View>
        <View className={`${root}-calendarBox-calendar`}>
          <AtCalendar onSelectDate={onDayClick} />
        </View>
      </View>
    </View>
  );
};
export default PassComps;
