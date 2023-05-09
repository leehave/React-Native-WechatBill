import {
  FlatList,
  Image,
  Platform,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {Component} from 'react';
import { SCREEN_WIDTH, countcoordinatesX } from '~/utils/util';

import CardItem from './component/card';
import ClassPicker from '~/components/classchoose/index';
import {IconManager} from '~/assets/json/iconManager';
import Modal from '~/components/modal/index';
import MonthPicker from '~/components/monthpicker/index';
import Provider from '~/components/provider';
import {classification_list} from '~/assets/json/classification';
import {setMonthCalendarList} from '~/utils/date';

const classification = {
  outcomesArr: classification_list.filter(item => item.bill_type === 1),
  incomesArr: classification_list.filter(item => item.bill_type === 2),
};
const class_icon = require('~/assets/images/icon/leixing.png');
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
];
const DATE = new Date(),
  currentYear = DATE.getFullYear(),
  currentMonth = DATE.getMonth() + 1,
  currentDay = DATE.getDate();
const startCalendarTime = 1588262400;
const monthCalendarData = setMonthCalendarList(startCalendarTime);
export default class HomeStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPickerFlag: `${currentYear}${
        currentMonth < 10 ? '0' + currentMonth : currentMonth
      }`,
      monthPickerShow: false,
      calendar: [],
      calendarTime: startCalendarTime,
      monthCalendarData: monthCalendarData,
      classPickerShow: false,
      currentYear: currentYear,
      currentMonth: currentMonth,
      currentDay: currentDay,
    };
  }
  monthPicker = () => {
    this.setState({
      monthPickerShow: true,
    });
  };
  classPicker = () => {
    this.setState({
      classPickerShow: true,
    });
  };
  closeMonthPicker = () => {
    this.setState({
      monthPickerShow: false,
    });
  };
  closeClassPicker = () => {
    this.setState({
      classPickerShow: false,
    });
  };
  render() {
    const renderItem = () => {
      return (
        <View>
          <CardItem></CardItem>
        </View>
      );
    };
    const { currentYear, currentMonth, currentDay } = this.state;
    return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <View style={styles.customheader}>
            <View style={styles.content}>
              <Text style={styles.headercolor}>记账本</Text>
            </View>
            <View style={styles.classification}>
              <TouchableHighlight
                onPress={this.classPicker}
                style={[styles.classgroup]}
                underlayColor={'rgba(250, 250, 250, .1)'}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.classtext}>全部类型</Text>
                  <View style={styles.line}></View>
                  <Image style={styles.classicon} source={class_icon} />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.datetime}>
              <TouchableHighlight
                onPress={this.monthPicker}
                style={[
                  {
                    backgroundColor: 'transparent',
                  },
                ]}
                underlayColor={'rgba(250, 250, 250, .1)'}>
                <View style={styles.monthdesc}>
                  <Text style={styles.timetext}>{currentYear}年{currentMonth}月</Text>
                  <Image
                    style={styles.arrow}
                    source={IconManager.icon_dowm_arrow}
                  />
                </View>
              </TouchableHighlight>
              <View style={styles.monthAmount}>
                <View style={styles.amountItem}>
                  <Text style={styles.amountText}>总支出￥0.00</Text>
                </View>
                <View style={styles.amountItem}>
                  <Text style={styles.amountText}>总收入￥0.00</Text>
                </View>
              </View>
            </View>
          </View>
          <MonthPicker
            monthPickerVisible={this.state.monthPickerShow}
            calendar={this.state.monthCalendarData}
            dateFlag={this.state.dataPickerFlag}
            closeMonthPicker={() => this.closeMonthPicker()}
          />
          <ClassPicker
            classPickerVisible={this.state.classPickerShow}
            classification={classification}
            closeClassPicker={() => this.closeClassPicker()}
          />
          <View style={styles.card_wrapper}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View
            style={[
              {
                width: SCREEN_WIDTH,
                height: 40,
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#fff',
              },
            ]}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  card_wrapper: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#EDEDED',
  },
  datetime: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
  },
  monthAmount: {
    // flex: 1
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  timetext: {
    fontSize: 14,
    color: '#ffffff',
  },
  monthdesc: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 12,
    height: 6,
    marginLeft: 6,
    marginRight: 6,
  },
  amountText: {
    color: '#ffffff',
    marginRight: 6,
  },
  customheader: {
    paddingTop: countcoordinatesX(80),
    paddingBottom: 15,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#63b27b',
    paddingLeft: 20,
    paddingRight: 20,
  },
  classification: {
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  line: {
    width: 1,
    height: 15,
    backgroundColor: 'rgba(255,255,255, .25)',
    marginLeft: 5,
    marginRight: 5,
  },
  classgroup: {
    width: countcoordinatesX(200),
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255,255,255, .15)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  classicon: {
    width: 16,
    height: 16,
  },
  classtext: {
    color: '#ffffff',
    fontWeight: '800',
  },
  headercolor: {
    color: '#ffffff',
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#22D3EE',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  dateContent: {
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  contentTitle: {
    backgroundColor: '#fafafa',
    borderBottomColor: 'rgba(0,0,0,.1)',
    position: 'relative',
    height: 50,
  },
  titleName: {
    color: 'rgba(0,0,0,.9)',
    fontSize: 20,
    textAlign: 'center',
  },
  dateContentMain: {
    maxHeight: 370,
    paddingBottom: 32,
  },
});
