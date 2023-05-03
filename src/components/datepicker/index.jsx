import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  NAVIGATION_HEIGHT,
  SAFE_AREA_BOTTOM_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
  STATUS_TABBAR_HEIGHT,
  countcoordinatesX,
} from '~/utils/util';
import React, {Component} from 'react';

import {IconManager} from '~/assets/json/iconManager';
import Modal from '~/components/modal/index';
import {base} from '~/style/fonts';
import {moneyFormat} from '~/utils/filters';

export default class DateDayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {datePickerVisible, dateFlag, calendar} = this.props;
    return (
      <Modal
        maskClosable
        visible={datePickerVisible}
        animationType="slide-up"
        popup>
        <View style={styles.container}>
          <View style={styles.dateContent}>
            <View style={styles.contentTitle}>
              <Text style={styles.titleName}>请选择时间</Text>
              <TouchableHighlight
                onPress={() => this.props.closeMonthPicker()}
                style={[
                  {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    left: 16,
                    top: 12,
                  },
                ]}
                underlayColor={'rgba(250, 250, 250, .1)'}>
                <Image style={styles.close} source={IconManager.header_back} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={[styles.date, {flex: 1, width: SCREEN_WIDTH, flexDirection: 'column'}]}>
            <View style={styles.dateHd}>
              <View style={styles.dateWeek}>
                <View style={styles.weekLi}>
                  <Text style={[styles.weekLiText]}>日</Text>
                </View>
                <View style={styles.weekLi}>
                  <Text style={[styles.weekLiText]}>一</Text>
                </View>
                <View style={styles.weekLi}>
                  <Text style={[styles.weekLiText]}>二</Text>
                </View>
                <View style={styles.weekLi}>
                  <Text style={[styles.weekLiText]}>三</Text>
                </View>
                <View style={styles.weekLi}>
                  <Text style={[styles.weekLiText]}>四</Text>
                </View>
                <View style={styles.weekLi}>
                  <Text style={[styles.weekLiText]}>五</Text>
                </View>
                <View style={styles.weekLi}>
                  <Text style={[styles.weekLiText]}>六</Text>
                </View>
              </View>
            </View>
            <ScrollView style={styles.dateBd} alwaysBounceVertical>
              {calendar.map((item, index) => {
                return (
                  <View style={[styles.timeList, styles.dateMod]} key={index}>
                    <View style={styles.dateTitle}>
                      <Text style={{fontSize: 14, color: '#000', opacity: 0.5}}>
                        {item.year}年{item.month}月
                      </Text>
                    </View>
                    <View
                      style={[styles.dateMain, styles.dayMain, {
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }]}>
                      {item.days.map((item2, idx) => {
                        return item2.value ? (
                          <View
                            key={idx}
                            style={[
                              styles.dayRec,
                              item2.future ? styles.dayRecDisable : null,
                              dateFlag === item2.string
                                ? styles.dayRecActive
                                : null,
                              {
                                marginRight: (idx + 1) % 7 === 0 ? 0 : 10,
                              },
                            ]}>
                            <Text
                              style={[
                                styles.dateButtonText,
                                {
                                  color: 'rgba(0,0,0,0.9)',
                                },
                                {
                                  color:
                                    dateFlag === item2.string
                                      ? '#fff'
                                      : item2.future
                                    ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.9)',
                                },
                              ]}>
                              {item2.value}
                            </Text>
                          </View>
                        ) : (
                          <View
                            key={idx}
                            style={[
                              styles.dayRec,
                              {
                                marginRight: (idx + 1) % 7 === 0 ? 0 : 10,
                                backgroundColor: 'transparent',
                              },
                            ]}></View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
    backgroundColor: '#fafafa',
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
  },
  titleName: {
    color: 'rgba(0,0,0,.9)',
    fontSize: 18,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
  dateContentMain: {
    flex: 1,
    width: SCREEN_WIDTH,
    flexDirection: 'column',
    maxHeight: 370,
    paddingBottom: 32,
  },
  timeList: {
    width: SCREEN_WIDTH,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  dateButton: {
    backgroundColor: '#fff',
    borderRadius: 4,
    width: 81,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
  },
  dateButtonText: {
    color: 'rgba(0,0,0,.9)',
    fontSize: 14,
    letterSpacing: 0,
    // lineHeight: 24,
    textAlign: 'center',
  },
  dateButtonChoose: {
    borderRadius: 4,
    width: 81,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    backgroundColor: '#3eb575',
    color: '#fff',
  },
  close: {
    width: 12,
    height: 24,
    opacity: 0.6,
  },
  dateTitle: {
    marginTop: 24,
    marginBottom: 24,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  weekLiText: {
    color: '#000',
    opacity: 0.4,
  },
  dateHd: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,.1)',
    height: 30,
    lineHeight: 30,
    paddingLeft: 17,
    paddingRight: 17,
  },
  dateWeek: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekLi: {
    width: countcoordinatesX(84),
    fontSize: 14,
  },
  weekLiText: {
    color: 'rgba(0,0,0,.5)',
    letterSpacing: 0,
    textAlign: 'center',
  },
  dateBd: {
    marginBottom: 16,
    paddingLeft: 6,
    // paddingRight: 16,
  },
  dateMod: {
    width: SCREEN_WIDTH,
  },
  dayRec: {
    backgroundColor: '#fff',
    borderRadius: 4,
    width: countcoordinatesX(84),
    height: 60,
    lineHeight: 50,
    marginBottom: 8,
    marginRight: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayRecActive: {
    backgroundColor: '#3eb575',
    borderRadius: 4,
    width: countcoordinatesX(84),
    height: 60,
    lineHeight: 50,
    marginBottom: 8,
    marginRight: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  dayRecDisable: {
    // opacity: 0.2,
  },
});
