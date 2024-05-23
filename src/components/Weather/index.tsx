import { View ,Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';

interface IWeatherProps {}

const AMAP_KEY = '5d8a3509bd0c4b9f9c8b64051daffb19';

interface IWeather {
  text: string; // 天气状况
  temp: string; // 温度
  icon: number;
}

const Weather: React.FunctionComponent<IWeatherProps> = () => {
  const [weather, setWeather] = useState<IWeather>({} as any);

  const init = async () => {
    Taro.getLocation({
      success: (res) => {
        // 获取天气
        // 接入和风天气
        Taro.request({
          url: 'https://devapi.qweather.com/v7/weather/now',
          data: {
            key: AMAP_KEY,
            location: `${res.longitude},${res.latitude}`,
          },
        }).then((weatherRes) => {
          setWeather(weatherRes?.data?.now);
        });
      },
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View>
      <Image
        className="icon-weather"
        src={`https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/weather_custom/${100}.png`}
      />
      天气：{weather?.text}， 温度： {weather?.temp}
    </View>
  );
};

export default Weather;
