import {Image, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {
  NAVIGATION_HEIGHT,
  SAFE_AREA_BOTTOM_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
  STATUS_TABBAR_HEIGHT,
} from '~/utils/util';
import React, {Component} from 'react';
import {dealList, getLastIdOfArray, moneyFormat} from '~/utils/filters';

import {base} from '~/style/fonts';

const MockData = [
  {
    amount: 25580,
    year: 2023,
    month: 5,
  },
  {
    amount: 146340,
    year: 2023,
    month: 4,
  },
  {
    amount: 213056,
    year: 2023,
    month: 3,
  },
  {
    amount: 350872,
    year: 2023,
    month: 2,
  },
  {
    amount: 129156,
    year: 2023,
    month: 1,
  },
  {
    amount: 222972,
    year: 2022,
    month: 12,
  },
];
const monthOutgoingsCompared = dealList(MockData, 'outgoings', 20);
export default class MonthCompairBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollViewPadding: 48,
      selectedId: getLastIdOfArray(monthOutgoingsCompared),
    };
  }
  componentDidMount() {
    
  }
  componentWillUnmount() {
  }

  render() {
    // const {  } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          style={[
            {
              width: SCREEN_WIDTH,
              paddingRight: this.state.scrollViewPadding,
              paddingLeft: 0,
            },
          ]}>
          <View style={styles.bar}>
            {monthOutgoingsCompared.map((item, index) => {
              return (
                <View
                  style={[
                    styles.barItemContainer,
                    item.id === this.state.selectedId
                      ? styles.barItemHighlight
                      : styles.barItemNormal,
                    item.amount === '0.00' ? styles.barItemZero : null,
                    {
                      width: item.barItemContainerWidth,
                    },
                  ]}
                  key={index}>
                  <View style={styles.barItemTop}>
                    <View
                      style={[
                        styles.barItemVal,
                        {
                          width: item.barItemContainerWidth,
                          opacity:
                            item.id === this.state.selectedId ? 0.9 : 0.5,
                        },
                      ]}>
                      <Text style={[styles.unit, {color: item.barColor}]}>
                        ￥
                      </Text>
                      <Text style={[styles.amount, {color: item.barColor}]}>
                        100
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.barItemBar,
                        {
                          height: item.height,
                          backgroundColor: item.barColor,
                          width: item.barWidth,
                          opacity:
                            item.id === this.state.selectedId ? 0.9 : 0.3,
                        },
                      ]}></View>
                  </View>
                  <View
                    style={[
                      styles.barItemDate,
                      {
                        dateGap: item.isGap,
                        width: item.barItemContainerWidth,
                        opacity: item.id === this.state.selectedId ? 0.9 : 0.6,
                      },
                    ]}>
                    {item.week_desc !== undefined && (
                      <View style={styles.dateItem}>
                        <Text style={styles.dateItemText}>
                          {item.week_desc}
                        </Text>
                      </View>
                    )}
                    {item.day_desc !== undefined && (
                      <View style={styles.dateItem}>
                        <Text style={styles.dateItemText}>{item.day_desc}</Text>
                      </View>
                    )}
                    {item.month_desc !== undefined && (
                      <View style={styles.dateItem}>
                        <Text style={styles.dateItemText}>
                          {item.month_desc}
                        </Text>
                      </View>
                    )}
                    {item.year_desc !== undefined && (
                      <View style={styles.dateItem}>
                        <Text style={styles.dateItemText}>
                          {item.year_desc}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    flex: 1,
    width: 350,
    flexDirection: 'row',
  },
  barItemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  barItemTop: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    height: 355,
    justifyContent: 'flex-end',
  },
  barItemVal: {
    fontFamily: base.fontFamily,
    marginBottom: 16,
    opacity: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barItemDate: {
    borderTopColor: '#e5e5e5',
    borderTopWidth: 1,
    color: '#000',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
    width: '100%'
  },
  barItemNormal: {
    opacity: 30,
  },
  dateGap: {
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    left: 0,
    width: 1,
  },
  dateItem: {
  },
  unit: {
    fontSize: 12,
  },
  amount: {
    fontSize: 12,
  },
  barItemBar: {
    height: 0,
  },
  dateItemText: {
    fontSize: 12,
    color: '#000',
  }
});
