import React from 'react';
import { View, Image } from '@tarojs/components';
import BasicLayout from '@/layout/BasicLayout';
import 'taro-ui/dist/style/components/article.scss';

interface IWorshipListProps {}
const WorshipList: React.FC<IWorshipListProps> = () => {
  return (
    <BasicLayout title={'财神名册'} back fill>
      <View className="at-article">
        <View className="at-article__content">
          <View className="at-article__section">
            <View className="at-article__h2">赵公明</View>
            <View className="at-article__p">
              道教中的财神，原为战神，后因其广施财富而成为人们心目中的财神。赵公明形象通常骑着黑虎，身穿战袍，手持宝剑，象征着以威武之姿庇护商贾，帮助人们赚取财富。相传他能够呼风唤雨，为百姓带来丰收，同时也保护商旅平安。
            </View>
          </View>
          <View className="at-article__section">
            <View className="at-article__h2">财帛星君</View>
            <View className="at-article__p">
              又称文财神，是中国民间供奉的一个财神形象，他原是汉代的著名文学家、历史学家班固。文财神主管文运和财富，特别是通过知识、智慧和文化活动所获得的财富。他的形象通常是手持写作工具，象征着通过文化教育和智慧获得财富。
            </View>
          </View>
          <View className="at-article__section">
            <View className="at-article__h2">武财神</View>
            <View className="at-article__p">
              关羽，三国时期刘备的结义兄弟，以忠义著称。在民间信仰中，关羽被奉为武财神，信众认为他能够保佑商业兴隆、生意兴旺。他的形象通常是红面长须，手持青龙偃月刀，象征着以武力保护财富，同时也代表着诚信和忠义。
            </View>
          </View>
          <View className="at-article__section">
            <View className="at-article__h2">五路财神</View>
            <View className="at-article__p">
              据说是由五位不同的神灵组成，分别保佑五个方向的财运。五路财神的信仰来源于民间对于五行思想的应用，代表金、木、水、火、土五路财富的流通和增长。五路财神的形象和属性各有不同，但共同的目的都是为了保佑信徒财运亨通，生意兴隆。
            </View>
          </View>
        </View>
      </View>
    </BasicLayout>
  );
};
export default WorshipList;
