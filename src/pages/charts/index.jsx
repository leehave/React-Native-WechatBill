import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {Component} from 'react';

import ChartPie from './component/pie';
import {IconManager} from '~/assets/json/iconManager';
import MonthCompairBar from './component/bar';
import MonthDayPillar from './component/pillars';
import MonthPicker from '~/components/monthpicker/index';
import RankCellList from './component/rank';
import { SCREEN_WIDTH } from '~/utils/util';
import {base} from '~/style/fonts';
import {setMonthCalendarList} from '~/utils/date';

const DATE = new Date(),
  currentYear = DATE.getFullYear(),
  currentMonth = DATE.getMonth() + 1,
  currentDay = DATE.getDate();
const startCalendarTime = 1588262400;
const monthCalendarData = setMonthCalendarList(startCalendarTime);
export default class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthCalendarData: monthCalendarData,
      fontsLoaded: false,
      currentYear: currentYear,
      currentMonth: currentMonth,
      currentDay: currentDay,
      monthPickerShow: false,
      dataPickerFlag: `${currentYear}${
        currentMonth < 10 ? '0' + currentMonth : currentMonth
      }`,
    };
  }

  monthPicker = () => {
    this.setState({
      monthPickerShow: true,
    });
  };

  closeMonthPicker = () => {
    this.setState({
      monthPickerShow: false,
    });
  };

  render() {
    const {currentYear, currentMonth, currentDay} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.customheader}>
            <View style={styles.monthHeader}>
              <View style={styles.choosemonTh}>
                <TouchableHighlight
                  onPress={this.monthPicker}
                  style={[
                    styles.month,
                    {
                      backgroundColor: 'transparent',
                    },
                  ]}
                  underlayColor={'rgba(250, 250, 250, .1)'}>
                  <View style={[{  flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={styles.monthText}>
                      {currentYear}年{currentMonth}月
                    </Text>
                    <Image
                      style={styles.calendar}
                      source={IconManager.icon_calendar2}></Image>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.rightTab}>
                <View style={[styles.tabItem, {backgroundColor: '#70BA87'}]}>
                  <Text style={styles.tabText}>支出</Text>
                </View>
                <View style={styles.tabItem}>
                  <Text style={styles.tabText}>入账</Text>
                </View>
              </View>
            </View>
            <View style={styles.totalMoney}>
              <Text style={styles.text}>共支出</Text>
              <View style={styles.bigNum}>
                <Text style={styles.unit}>￥</Text>
                <Text style={[styles.money, {fontFamily: base.fontFamily}]}>
                  1464.40
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.chartTitle}>
            <Text style={[{color: '#333', fontSize: 16}]}>支出构成</Text>
          </View>
          <ChartPie />
          <RankCellList />
          <View style={styles.line} />
          <View style={styles.chartTitle}>
            <Text style={[{color: '#333', fontSize: 16}]}>每日对比</Text>
          </View>
          <MonthDayPillar />
          <View style={styles.line} />
          <View style={styles.chartTitle}>
            <Text style={[{color: '#333', fontSize: 16}]}>月度对比</Text>
          </View>
          <MonthCompairBar />
        </ScrollView>
        <MonthPicker
          monthPickerVisible={this.state.monthPickerShow}
          calendar={this.state.monthCalendarData}
          dateFlag={this.state.dataPickerFlag}
          closeMonthPicker={() => this.closeMonthPicker()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100
  },
  customheader: {
    paddingTop: 40,
    paddingBottom: 15,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#63b27b',
    paddingLeft: 20,
    paddingRight: 20,
  },
  monthHeader: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  choosemonTh: {
    alignItems: 'center',
  },
  month: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  calendar: {
    width: 14,
    height: 14,
  },
  monthText: {
    color: '#ffffff',
    fontSize: 16,
    marginRight: 6,
  },
  rightTab: {
    flexDirection: 'row',
  },
  tabItem: {
    paddingTop: 4,
    paddingLeft: 12,
    paddingBottom: 4,
    paddingRight: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: 4,
  },
  tabText: {
    color: '#ffffff',
    fontSize: 16,
  },
  totalMoney: {
    paddingBottom: 30,
    flexDirection: 'column',
  },
  text: {
    fontSize: 16,
    color: '#A5D7B4',
  },
  bigNum: {
    marginTop: 20,
    flexDirection: 'row',
  },
  unit: {
    fontSize: 24,
    fontWeight: 'bold',
    verticalAlign: 'top',
    color: '#ffffff',
    marginRight: 4,
    fontFamily: base.fontFamily,
  },
  line: {
    width: SCREEN_WIDTH,
    height: 1,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    marginTop: 20
  },
  money: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  chartTitle: {
    paddingLeft: 20,
    paddingTop: 30,
  },
});
