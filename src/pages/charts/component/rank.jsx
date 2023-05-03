import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {
  NAVIGATION_HEIGHT,
  SAFE_AREA_BOTTOM_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
  STATUS_TABBAR_HEIGHT,
} from '~/utils/util';
import React, {Component} from 'react';
import {getProgress, moneyFormat} from '~/utils/filters';

import {IconManager} from '~/assets/json/iconManager';
import Progress from '~/components/progress/index';
import {base} from '~/style/fonts';

const MockData = [
  {
    precent: 39,
    amount: 10000,
    classification_id: 34,
    classification_name: '转账',
    classification_icon: require('~/assets/images/outlay/icon-zhuanzhang-active.png'),
  },
  {
    precent: 38,
    amount: 9800,
    classification_id: 16,
    classification_name: '服务',
    classification_icon: require('~/assets/images/outlay/icon-fuwu-active.png'),
  },
  {
    precent: 11,
    amount: 3000,
    classification_id: 20,
    classification_name: '旅行',
    classification_icon: require('~/assets/images/outlay/icon-lvyou-active.png'),
  },
  {
    precent: 6,
    amount: 1580,
    classification_id: 13,
    classification_name: '交通',
    classification_icon: require('~/assets/images/outlay/icon-jiaotong-active.png'),
  },
  {
    precent: 3,
    amount: 1000,
    classification_id: 32,
    classification_name: '其他',
    classification_icon: require('~/assets/images/outlay/icon-other-active.png'),
  },
  {
    precent: 0,
    amount: 200,
    classification_id: 12,
    classification_name: '餐饮',
    classification_icon: require('~/assets/images/outlay/icon-canyin-active.png'),
  },
];
export default class RankCellList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {  } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.constituteList}>
          {
            MockData.map((item, index) => {
              return (
                <TouchableHighlight
                  onPress={() => {}}
                  style={[
                    {
                      backgroundColor: 'white',
                      flex: 1,
                    },
                  ]}
                  key={index}
                  underlayColor={'rgba(250, 250, 250, 1)'}>
                  <View style={styles.constituteListItemNew}>
                    <View style={styles.listItemLeftNew}>
                      <Image
                        style={styles.listItemIconNew}
                        source={item.classification_icon}></Image>
                      <View style={styles.listItemNameNew}>
                        <Text style={styles.listItemNameNewText}>
                          {item.classification_name}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.listItemRightNew}>
                      <Progress
                        percent={getProgress(item.precent, MockData[0].precent)}
                        barStyle={{backgroundColor: '#3EB575'}}
                      />
                      <View style={styles.listItemMoney}>
                        <View style={styles.money}>
                          <Text style={styles.unit}>￥</Text>
                          <Text style={styles.amount}>
                            {moneyFormat(item.amount)}
                          </Text>
                        </View>
                        <Image
                          style={styles.back}
                          source={IconManager.icon_back}></Image>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
  },
  constituteList: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  constituteListItemNew: {
    flex: 1,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listItemLeftNew: {
    flexDirection: 'row',
    flex: 1,
    flexBasis: 40,
  },
  listItemIconNew: {
    width: 24,
    height: 24,
  },
  listItemNameNewText: {
    color: '#000',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 8,
    opacity: 0.9,
    textAlign: 'left',
  },
  listItemRightNew: {
    flex: 2,
    flexBasis: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 4,
    width: '90%',
  },
  listItemMoney: {
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: base.fontFamily,
    fontSize: 14,
    marginLeft: 8,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  money: {
    textAlign: 'right',
    width: 60,
    flexDirection: 'row',
  },
  back: {
    width: 10,
    height: 20,
  },
});
