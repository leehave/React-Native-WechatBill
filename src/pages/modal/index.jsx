import {
  Animated,
  Button,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Component} from "react";
import {
  SCREEN_WIDTH,
  countcoordinatesX
} from '@app/utils/util';

import CustomKeyBoard from '~/components/keyboard/keyboard'
import DateDayPicker from '~/components/datepicker';
import { IconManager } from '~/assets/json/iconManager';
import Provider from '~/components/provider';
import { SimpleGrid } from 'react-native-super-grid';
import { base } from '~/style/fonts'
import {setDayCalendarList} from '~/utils/date';

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
];
const DATE = new Date(),
  currentYear = DATE.getFullYear(),
  currentMonth = DATE.getMonth() + 1,
  currentDay = DATE.getDate();
const startCalendarTime = 1588262400;
const dayCalendarData = setDayCalendarList(startCalendarTime);
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPickerFlag: `${currentYear}${
        currentMonth < 10 ? '0' + currentMonth : currentMonth
      }${currentDay < 10 ? '0' + currentDay : currentDay}`,
      navigationIndex: 0,
      models: [[], []],
      currentId: 1,
      ifShowCursor: false,
      datePickerShow: false,
      calendar: [],
      calendarTime: startCalendarTime,
      dateCalendarData: dayCalendarData,
      opacity: new Animated.Value(0),
    };
  }
  componentDidMount() {
     Animated.loop(Animated.timing(this.state.opacity, {
      toValue: 1,
      duration:2000,
      easing: Easing.linear,
      delay:300,
      useNativeDriver:true, // 启用原生动画驱动
      isInteraction: false
    })).start()
  }
  monthPicker = () => {
    this.setState({
      datePickerShow: true,
    });
  };
  closeMonthPicker = () => {
    this.setState({
      datePickerShow: false,
    });
  };
  render() {
    console.log(this.props.route, 'render props');
    const {params} = this.props.route;
    const { currentId } = this.state;
    return (
      <Provider>
        <View style={styles.container}>
          <View style={[styles.closeWrap]}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.goBack();
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
            <TouchableHighlight
              onPress={this.monthPicker}
              style={[
                {
                  backgroundColor: 'transparent',
                },
              ]}
              underlayColor={'rgba(250, 250, 250, .1)'}>
              <View style={styles.controlRight}>
                <View style={styles.datePicker}>
                  <Text>5月7日</Text>
                  <Image
                    source={IconManager.icon_dowm_arrow}
                    style={{width: 12, height: 6, marginLeft: 6}}
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.noteCenter}>
            <View style={styles.noteCenterIcon}>
              <Text style={styles.noteCenterUnit}>￥</Text>
            </View>
            <View style={styles.noteCenterMoney}>
              <Text style={styles.noteMoney}>100</Text>
              <Animated.View
                style={[
                  styles.cursor,
                  {
                    opacity: this.state.opacity.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1, 0],
                    }),
                  },
                ]}></Animated.View>
            </View>
          </View>
          <View style={styles.gridIconScroll}>
            <ScrollView style={styles.scrollView} ref="flatGrid">
              <SimpleGrid
                itemDimension={50}
                data={MockData}
                staticDimension={SCREEN_WIDTH}
                spacing={10}
                renderItem={({item, id}) => (
                  <TouchableHighlight
                    key={id}
                    style={[
                      {
                        width: countcoordinatesX(100),
                        height: countcoordinatesX(120),
                        paddingBottom: 10,
                      },
                    ]}
                    underlayColor="#ddd"
                    onPress={() => {}}>
                    <View style={styles.classIcon}>
                      <Image
                        source={
                          currentId === item.id
                            ? item.icon_url_normal
                            : item.icon_grey_url
                        }
                        style={{width: 30, height: 30, marginBottom: 6}}
                      />
                      <Text
                        style={[
                          styles.gridText,
                          {opacity: currentId === item.id ? 1 : 0.5},
                        ]}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableHighlight>
                )}
              />
            </ScrollView>
            <View style={styles.customText}>
              <Text style={styles.remark}>添加备注</Text>
            </View>
            <CustomKeyBoard
              ref={'keyboard'}
              onBookPress={() => {
                console.log('keybord');
              }}
              model={params['model']}></CustomKeyBoard>
          </View>
          <DateDayPicker
            datePickerVisible={this.state.datePickerShow}
            calendar={this.state.dateCalendarData}
            dateFlag={this.state.dataPickerFlag}
            closeMonthPicker={() => this.closeMonthPicker()}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 20,
  },
  closeWrap: {
    display: 'flex',
    marginBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
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
    paddingRight: 20,
  },
  controlLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  controlRight: {
    width: 106,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
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
    paddingRight: 20,
  },
  noteCenterMoney: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cursor: {
    width: 1,
    height: 30,
    marginLeft: 4,
    borderRightWidth: 1,
    borderRightColor: '#999',
  },
  noteCenterIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  noteCenterUnit: {
    fontSize: 24,
    fontWeight: '500',
    verticalAlign: 'top',
    marginRight: 4,
    fontFamily: base.fontFamily,
  },
  noteMoney: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: base.fontFamily,
  },
  tagItem: {
    paddingTop: 5,
    paddingLeft: 20,
    paddingBottom: 5,
    paddingRight: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginRight: 10,
  },
  tagText: {
    fontSize: 14,
  },
  tagItemNormal: {
    color: '#A5A5A5',
  },
  tagItemActiveBg: {
    backgroundColor: '#ECF7F1',
  },
  tagItemActive: {
    color: '#65AB79',
  },
  tagItemNormalBg: {
    backgroundColor: '#F7F7F7',
  },
  scrollView: {
    flex: 1,
    // paddingLeft: 5,
    // paddingRight: 5,
    maxHeight: countcoordinatesX(260),
  },
  gridIconScroll: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  classIcon: {
    width: 50,
    flexBasis: 60,
    // marginLeft: 6,
    marginRight: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginBottom: 15,
  },
  gridText: {
    fontSize: 12,
  },
  customText: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 20,
  },
  remark: {
    color: '#175199',
    fontSize: 14,
  },
});