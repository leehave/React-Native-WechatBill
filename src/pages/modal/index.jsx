import { Animated, Button, Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, {Component} from "react";

import CustomKeyBoard from '~/components/keyboard/keyboard'
import { IconManager } from '~/assets/json/iconManager';

const MockData = [
  {
    id: 1,
    icon_url_normal: require('~/assets/images/outlay/icon-canyin-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-canyin.png'),
    classId: 1,
    name: '餐饮'
  },
  {
    id: 2,
    icon_url_normal: require('~/assets/images/outlay/icon-jiaotong-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-jiaotong.png'),
    classId: 2,
    name: '交通'
  },
  {
    id: 3,
    icon_url_normal: require('~/assets/images/outlay/icon-fushi-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-fushi.png'),
    classId: 3,
    name: '服饰'
  },
  {
    id: 4,
    icon_url_normal: require('~/assets/images/outlay/icon-gouwu-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-gouwu.png'),
    classId: 4,
    name: '购物'
  },
  {
    id: 5,
    icon_url_normal: require('~/assets/images/outlay/icon-fuwu-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-fuwu.png'),
    classId: 5,
    name: '服务'
  },
  {
    id: 6,
    icon_url_normal: require('~/assets/images/outlay/icon-edu-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-edu.png'),
    classId: 6,
    name: '教育'
  },
  {
    id: 7,
    icon_url_normal: require('~/assets/images/outlay/icon-yule-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-yule.png'),
    classId: 7,
    name: '娱乐'
  },
  {
    id: 8,
    icon_url_normal: require('~/assets/images/outlay/icon-sport-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-sport.png'),
    classId: 8,
    name: '运动'
  },
  {
    id: 9,
    icon_url_normal: require('~/assets/images/outlay/icon-life-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-life.png'),
    classId: 9,
    name: '生活缴费'
  },
  {
    id: 10,
    icon_url_normal: require('~/assets/images/outlay/icon-lvyou-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-lvyou.png'),
    classId: 10,
    name: '旅行'
  },
  {
    id: 11,
    icon_url_normal: require('~/assets/images/outlay/icon-chongwu-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-chongwu.png'),
    classId: 11,
    name: '宠物'
  },
  {
    id: 12,
    icon_url_normal: require('~/assets/images/outlay/icon-yiliao-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-yiliao.png'),
    classId: 12,
    name: '医疗'
  },
  {
    id: 13,
    icon_url_normal: require('~/assets/images/outlay/icon-baoxian-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-baoxian.png'),
    classId: 13,
    name: '保险'
  },
  {
    id: 14,
    icon_url_normal: require('~/assets/images/outlay/icon-gongyi-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-gongyi.png'),
    classId: 14,
    name: '公益'
  },
  {
    id: 15,
    icon_url_normal: require('~/assets/images/outlay/icon-hongbao-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-hongbao.png'),
    classId: 15,
    name: '红包'
  },
  {
    id: 16,
    icon_url_normal: require('~/assets/images/outlay/icon-zhuanzhang-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-zhuanzhang.png'),
    classId: 16,
    name: '转账'
  },
  {
    id: 17,
    icon_url_normal: require('~/assets/images/outlay/icon-qinshu-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-qinshu.png'),
    classId: 17,
    name: '亲属卡'
  },
  {
    id: 18,
    icon_url_normal: require('~/assets/images/outlay/icon-qita-active.png'),
    icon_grey_url: require('~/assets/images/outlay/icon-qita.png'),
    classId: 18,
    name: '其他人情'
  },
]
export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationIndex: 0,
      models: [[], []],
      ifShowCursor: false
    }
  }
  render() {
    console.log(this.props.route, 'render props')
    const {params} = this.props.route
    const renderIconGroup = MockData.map((item, index) => {
      return (
        <TouchableHighlight key={index} underlayColor="#ddd" onPress={() => {console.log('press');}}>
          <View style={styles.classIcon}>
            <Image
              source={item.icon_url_normal}
              style={{ width: 30, height: 30, marginBottom: 6 }}
            />
            <Text style={styles.gridText}>{item.name}</Text>
          </View>
        </TouchableHighlight>
      )
    })
    return (
      <View style={styles.container}>
        <View style={[styles.closeWrap]}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.goBack()
            }}>
              <View>
                <Text style={[styles.close]}>×</Text>
              </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.classAndDayPicker}>
          <View style={styles.controlLeft}>
            <View style={[styles.tagItem, styles.tagItemActiveBg]}>
              <Text style={[styles.tagText, styles.tagItemActive]}>支出</Text>
            </View>
            <View style={[styles.tagItem, styles.tagItemNormalBg]}>
              <Text style={[styles.tagText, styles.tagItemNormal]}>入账</Text>
            </View>
          </View>
          <View style={styles.controlRight}>
            <View style={styles.datePicker}>
              <Text>4月18日</Text>
              <Image
                source={IconManager.icon_dowm_arrow}
                style={{ width: 12, height: 6, marginLeft: 6 }}
              />
            </View>
          </View>
        </View>
        <View style={styles.noteCenter}>
          <View style={styles.noteCenterIcon}>
            <Text style={styles.noteCenterUnit}>￥</Text>
          </View>
          <View style={styles.noteCenterMoney}>
            <Text style={styles.noteMoney}>100</Text>
            <Animated.View style={styles.cursor}></Animated.View>
          </View>
        </View>
        <View style={styles.gridIconScroll}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.gridIconWrapper}>
              {renderIconGroup}
            </View>
          </ScrollView>
          <CustomKeyBoard ref={"keyboard"} onBookPress={() => {console.log('keybord');}}  model={params["model"]}></CustomKeyBoard>
        </View>
      </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: "#ffffff",
    paddingTop: 20,
    paddingBottom: 20,
  },
  closeWrap: {
    display: 'flex',
    marginBottom: 12,
    paddingLeft: 20,
    paddingRight: 20
  },
  close: {
    fontSize: 40,
    fontWeight: '200',
    color: '#bcbcbc',
    lineHeight: 30,
  },
  classAndDayPicker: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  controlLeft: {
    flex: 1,
    flexDirection: 'row'
  },
  controlRight: {
    width: 106,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    display: 'flex',
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  datePicker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteCenter: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E4E4E4',
    paddingLeft: 20,
    paddingRight: 20
  },
  noteCenterMoney: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cursor: {
    width: 1,
    height: 30,
    marginLeft: 4,
    borderRightWidth: 1,
    borderRightColor: '#E4E4E4'
  },
  noteCenterIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  noteCenterUnit: {
    fontSize: 24,
    fontWeight: '500',
    verticalAlign: 'top',
    marginRight: 4
  },
  noteMoney: {
    fontSize: 32
  },
  tagItem: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginRight: 10
  },
  tagText: {
    fontSize: 16
  },
  tagItemNormal: {
    color: '#A5A5A5',
  },
  tagItemActiveBg: {
    backgroundColor: '#ECF7F1',
  },
  tagItemActive: {
    color: '#65AB79'
  },
  tagItemNormalBg: {
    backgroundColor: '#F7F7F7',
  },
  scrollView: {
    marginHorizontal: 20,
    maxHeight: 120
  },
  gridIconScroll: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  gridIconWrapper: {
    display: 'flex',
    // flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  classIcon: {
    width: 50,
    flexBasis: 50,
    marginLeft: 2,
    marginRight: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginBottom: 15
  },
  gridText: {
    fontSize: 12
  }
});