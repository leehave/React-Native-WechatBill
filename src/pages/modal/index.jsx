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
import {classification_list} from '~/assets/json/classification';
import {setDayCalendarList} from '~/utils/date';

const DATE = new Date(),
  currentYear = DATE.getFullYear(),
  currentMonth = DATE.getMonth() + 1,
  currentDay = DATE.getDate();
const startCalendarTime = 1588262400;
const outgoingsArr = classification_list.filter(
        item => item.bill_type === 1,
      );
const incomesArr = classification_list.filter(
        item => item.bill_type === 2,
      )
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPickerFlag: `${currentYear}${
        currentMonth < 10 ? '0' + currentMonth : currentMonth
      }${currentDay < 10 ? '0' + currentDay : currentDay}`,
      navigationIndex: 0,
      models: [[], []],
      currentId: outgoingsArr[0].id,
      ifShowCursor: false,
      datePickerShow: false,
      calendar: [],
      calendarTime: startCalendarTime,
      opacity: new Animated.Value(0),
      currentMonth: currentMonth,
      currentDay: currentDay,
      currentAtive: 'outgoings',
      classificationData: outgoingsArr,
    };
  }
  componentDidMount() {
    this.animate = Animated.loop(
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        delay: 300,
        useNativeDriver: true, // 启用原生动画驱动
        isInteraction: false,
      }),
    ).start();
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
  tabChange = (type) => {
    this.setState({
      currentAtive: type,
      classificationData: []
    });
    if (type === 'incomes') {
      this.setState({
        currentId: incomesArr[0].id,
        classificationData: incomesArr
      })
    } else {
      this.setState({
        currentId: outgoingsArr[0].id,
        classificationData: outgoingsArr
      })
    }
  }
  render() {
    console.log(this.props.route, 'render props');
    const {params} = this.props.route;
    const {
      currentId,
      currentDay,
      currentMonth,
      currentAtive,
      classificationData,
    } = this.state;
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
              <TouchableHighlight
                onPress={() => this.tabChange('outgoings')}
                style={[
                  {
                    backgroundColor: 'transparent',
                  },
                ]}
                underlayColor={'rgba(250, 250, 250, .1)'}>
                <View
                  style={[
                    styles.tagItem,
                    currentAtive === 'outgoings'
                      ? styles.tagItemActiveBg
                      : styles.tagItemNormalBg,
                  ]}>
                  <Text
                    style={[
                      styles.tagText,
                      currentAtive === 'outgoings'
                        ? styles.tagItemActive
                        : styles.tagItemNormal,
                    ]}>
                    支出
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.tabChange('incomes')}
                style={[
                  {
                    backgroundColor: 'transparent',
                  },
                ]}
                underlayColor={'rgba(250, 250, 250, .1)'}>
                <View
                  style={[
                    styles.tagItem,
                    currentAtive === 'incomes'
                      ? {
                          backgroundColor: '#FCF8EC',
                        }
                      : styles.tagItemNormalBg,
                  ]}>
                  <Text
                    style={[
                      styles.tagText,
                      currentAtive === 'incomes'
                        ? {
                            color: '#E7BA54',
                          }
                        : styles.tagItemNormal,
                    ]}>
                    入账
                  </Text>
                </View>
              </TouchableHighlight>
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
                  <Text>
                    {currentMonth}月{currentDay}日
                  </Text>
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
                data={classificationData}
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
                        source={{
                          uri:
                            currentId === item.id
                              ? currentAtive === 'incomes'
                                ? item.icon_url_income
                                : item.icon_url_out
                              : item.icon_grey_url,
                        }}
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
              currentAtive={currentAtive}
              model={params['model']}></CustomKeyBoard>
          </View>
          <DateDayPicker
            datePickerVisible={this.state.datePickerShow}
            startCalendarTime={this.state.calendarTime}
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