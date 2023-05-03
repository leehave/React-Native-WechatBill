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
  countcoordinatesX
} from '~/utils/util';
import React, {Component} from 'react';

import {IconManager} from '~/assets/json/iconManager';
import Modal from '~/components/modal/index';
import Provider from '~/components/provider';
import {base} from '~/style/fonts';
import {moneyFormat} from '~/utils/filters';

export default class MonthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {monthPickerVisible, dateFlag, calendar} =
      this.props;
    return (
      <Modal
        maskClosable
        visible={monthPickerVisible}
        animationType="slide-up"
        popup>
        <View style={styles.container}>
          <View style={styles.dateContent}>
            <View style={styles.contentTitle}>
              <Text style={styles.titleName}>请选择月份</Text>
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
                <Image style={styles.close} source={IconManager.close_new} />
              </TouchableHighlight>
            </View>
          </View>
          <ScrollView style={styles.dateContentMain} alwaysBounceVertical>
            {calendar.map((item, index) => {
              return (
                <View style={styles.timeList} key={index}>
                  <View style={styles.dateTitle}>
                    <Text style={{fontSize: 14, color: '#000', opacity: 0.5}}>{item.year}年</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {item.month.map((item2, idx) => {
                      return !item2.future ? (
                        <View
                          key={idx}
                          style={[
                            dateFlag === item2.flag
                              ? (styles.dateButton, styles.dateButtonChoose)
                              : styles.dateButton,
                          ]}>
                          <Text
                            style={[
                              styles.dateButtonText,
                              {color: item2.future ? 'rgba(0,0,0,0.2)' : null},
                              {color: dateFlag === item2.flag ? '#fff' : null},
                            ]}>
                            {item2.value}月
                          </Text>
                        </View>
                      ) : null;
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
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
    paddingBottom: countcoordinatesX(160),
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
    width: countcoordinatesX(162),
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
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 35,
    textAlign: 'center',
  },
  dateButtonChoose: {
    borderRadius: 4,
    width: countcoordinatesX(162),
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
    width: 24,
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
});
