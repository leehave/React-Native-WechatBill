import * as echarts from 'echarts/core';

import {BarChart, LineChart} from 'echarts/charts';
import {GridComponent, TooltipComponent} from 'echarts/components';
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
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';

import {IconManager} from '~/assets/json/iconManager';
import Progress from '~/components/progress/index';
import {base} from '~/style/fonts';
import {dealList} from '~/utils/filters';

echarts.use([SVGRenderer, LineChart, TooltipComponent, GridComponent, BarChart]);
const MockData = [
    {
      amount: 25580,
      week_desc: '一',
      year: 2023,
      month: 5,
      day: 1,
    },
    {
      amount: 0,
      week_desc: '日',
      year: 2023,
      month: 4,
      day: 30,
    },
    {
      amount: 8646,
      week_desc: '六',
      year: 2023,
      month: 4,
      day: 29,
    },
    {
      amount: 3846,
      week_desc: '五',
      year: 2023,
      month: 4,
      day: 28,
    },
    {
      amount: 1500,
      week_desc: '四',
      year: 2023,
      month: 4,
      day: 27,
    },
    {
      amount: 0,
      week_desc: '三',
      year: 2023,
      month: 4,
      day: 26,
    },
    {
      amount: 0,
      week_desc: '二',
      year: 2023,
      month: 4,
      day: 25,
    },
    {
      amount: 30010,
      week_desc: '一',
      year: 2023,
      month: 4,
      day: 24,
    },
    {
      amount: 1690,
      week_desc: '日',
      year: 2023,
      month: 4,
      day: 23,
    },
    {
      amount: 5963,
      week_desc: '六',
      year: 2023,
      month: 4,
      day: 22,
    },
    {
      amount: 5420,
      week_desc: '五',
      year: 2023,
      month: 4,
      day: 21,
    },
    {
      amount: 2100,
      week_desc: '四',
      year: 2023,
      month: 4,
      day: 20,
    },
    {
      amount: 1290,
      week_desc: '三',
      year: 2023,
      month: 4,
      day: 19,
    },
    {
      amount: 1301,
      week_desc: '二',
      year: 2023,
      month: 4,
      day: 18,
    },
    {
      amount: 1104,
      week_desc: '一',
      year: 2023,
      month: 4,
      day: 17,
    },
    {
      amount: 1020,
      week_desc: '日',
      year: 2023,
      month: 4,
      day: 16,
    },
    {
      amount: 14068,
      week_desc: '六',
      year: 2023,
      month: 4,
      day: 15,
    },
    {
      amount: 3286,
      week_desc: '五',
      year: 2023,
      month: 4,
      day: 14,
    },
    {
      amount: 1300,
      week_desc: '四',
      year: 2023,
      month: 4,
      day: 13,
    },
    {
      amount: 1000,
      week_desc: '三',
      year: 2023,
      month: 4,
      day: 12,
    },
    {
      amount: 2200,
      week_desc: '二',
      year: 2023,
      month: 4,
      day: 11,
    },
    {
      amount: 34242,
      week_desc: '一',
      year: 2023,
      month: 4,
      day: 10,
    },
    {
      amount: 4977,
      week_desc: '日',
      year: 2023,
      month: 4,
      day: 9,
    },
    {
      amount: 3260,
      week_desc: '六',
      year: 2023,
      month: 4,
      day: 8,
    },
    {
      amount: 900,
      week_desc: '五',
      year: 2023,
      month: 4,
      day: 7,
    },
    {
      amount: 1300,
      week_desc: '四',
      year: 2023,
      month: 4,
      day: 6,
    },
    {
      amount: 1000,
      week_desc: '三',
      year: 2023,
      month: 4,
      day: 5,
    },
    {
      amount: 2707,
      week_desc: '二',
      year: 2023,
      month: 4,
      day: 4,
    },
    {
      amount: 1300,
      week_desc: '一',
      year: 2023,
      month: 4,
      day: 3,
    },
    {
      amount: 8320,
      week_desc: '日',
      year: 2023,
      month: 4,
      day: 2,
    },
  ];
const formatData = dealList(MockData, 'outgoings', 16);
const chartData = [], dayTime = [];
for (let index = 0; index < formatData.length; index++) {
  const item = formatData[index];
  const style = {
    color: '#D2EDDE',
  };
  chartData.push({
    value: item.amount,
    itemStyle: style
  });
  dayTime.push(item.year + '.' + item.month + '.' + item.day);
}
export default class ComparedPillar extends Component {
  constructor(props) {
    super(props);
    this.chart = null;
    this.state = {
      color: ['rgb(62,181,117,0.3)'],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              type: 'dashed',
              width: 0.5,
              color: 'rgba(0,0,0,0.7)',
            },
            label: {
              color: 'rgb(62,181,117,0.3)',
            },
            shadowStyle: {
              opacity: 0,
            },
          },
          enterable: !0,
          triggerOn: "'mousemove|click'",
          hideDelay: 0,
          formatter: function (e) {
            return '';
          },
        },
        grid: {
          left: '16px',
          right: '1px',
          bottom: '11px',
          containLabel: !0,
          top: '54px',
        },
        xAxis: [
          {
            id: 'x',
            name: '',
            color: 'rgba(62,181,117,0.3)',
            type: 'category',
            data: dayTime,
            axisTick: {
              show: !1,
            },
            axisLabel: {
              interval: 0,
              show: !0,
              color: 'rgba(0,0,0,0.5)',
              fontSize: 10,
              formatter: function (e, t) {
                let r = e.split('.'),
                  i = parseInt(r[0]),
                  o = parseInt(r[1]),
                  a = parseInt(r[2]);
                return (
                  (1 !== a && a % 5 != 0) || 30 == a
                    ? (e = '')
                    : ('12.25' != (e = o + '.' + a) && '1.1' != e) ||
                      (e = '{a|' + e + '\n' + i + '}'),
                  e
                );
              },
              rich: {
                a: {
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 10,
                  padding: [0, 0, 2, 0],
                },
              },
            },
            axisLine: {
              lineStyle: {
                color: '#E0E6F1',
                width: 0.5,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: !0,
              lineStyle: {
                color: ['rgba(0,0,0,0.05)'],
                width: 0.5,
              },
            },
            min: 0,
            axisTick: {
              show: !1,
            },
            axisLabel: {
              show: !0,
              color: 'rgba(0,0,0,0.5)',
              fontSize: 10,
              formatter: '¥{value}',
            },
            axisLine: {
              lineStyle: {
                show: !1,
              },
            },
          },
        ],
        series: [
          {
            name: ' ',
            type: 'bar',
            barWidth: 6,
            data: chartData,
            backgroundStyle: {
              color: 'rgba(110, 193, 244, 0.2)',
            },
            emphasis: {
              itemStyle: {
                color: '#3EB575',
              },
            },
          },
        ],
      },
    };
    this.skiaRef = React.createRef();
  }
  componentDidMount() {
    if (this.skiaRef.current) {
      this.chart = echarts.init(this.skiaRef.current, 'light', {
        renderer: 'svg',
        width: 360,
        height: 320,
      });
      this.chart.setOption(this.state.option);
    }
  }
  componentWillUnmount() {
    this.chart?.dispose();
  }
  render() {
    // const {  } = this.props;
    return (
      <View style={styles.container}>
        <SkiaChart ref={this.skiaRef} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
});
