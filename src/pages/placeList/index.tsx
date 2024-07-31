import React from 'react';
import { View, Image } from '@tarojs/components';
import BasicLayout from '@/layout/BasicLayout';
import 'taro-ui/dist/style/components/article.scss';
interface IPlaceListProps {}
const PlaceList: React.FC<IPlaceListProps> = () => {
  return (
    <BasicLayout title={'联动财神庙'} back fill>
      <View className="at-article">
        <View className="at-article__content">
          <View className="at-article__section">
            <View className="at-article__h2">上海城隍庙</View>
            <View className="at-article__p">
              上海城隍庙不仅是上海著名的旅游景点，也是一个重要的财神庙。每逢中国新年，这里都会举行盛大的财神祈福活动，吸引了众多商人和游客前来祈求财运。城隍庙内供奉的财神赵公明形象威武，手持宝剑，象征着财富和权力的守护。庙宇内古色古香，香火鼎盛，是一个求财祈福的好去处。
            </View>
          </View>
          <View className="at-article__section">
            <View className="at-article__h2">北京白云观</View>
            <View className="at-article__p">
              北京白云观是中国道教全真派的重要宫观之一，也是北京著名的财神庙之一。在这里，人们可以向道教中的财神赵公明祈福，希望得到财富和平安的保佑。白云观内建筑雄伟，环境幽静，每年春节都有来自全国各地的信众来此烧香拜财神，祈求新的一年里生意兴隆、财源滚滚。
            </View>
          </View>
          <View className="at-article__section">
            <View className="at-article__h2">广州五仙观</View>
            <View className="at-article__p">
              广州五仙观是一座历史悠久的道教古观，相传是五位仙人所创，著名的五路财神之一。五仙观位于广东省广州市，是当地最受欢迎的拜财神地点之一。观内供奉的五路财神代表着不同的财富方向和含义，每逢重要节日，尤其是春节，都有众多信众来此祈福，希望商业繁荣、财运亨通。
            </View>
          </View>
          <View className="at-article__section">
            <View className="at-article__h2">泉州开元寺</View>
            <View className="at-article__p">
              位于福建省泉州市，开元寺是中国东南地区最大的佛教寺庙之一，也是人们拜访的财神之一。开元寺内供奉有财神赵公明的像，特别是在春节和赵公明的诞辰，会举行盛大的财神迎神仪式，吸引了大量信众前来祈求财运。开元寺不仅是佛教圣地，也成为了人们祈求财富和吉祥的地方。
            </View>
          </View>
        </View>
      </View>
    </BasicLayout>
  );
};
export default PlaceList;
