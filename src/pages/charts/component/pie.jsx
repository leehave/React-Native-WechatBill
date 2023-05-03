import * as echarts from 'echarts/core';

import {
  Animated,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {LineChart, PieChart} from 'echarts/charts';
import React, {Component} from 'react';
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';

import {GridComponent} from 'echarts/components';
import {IconManager} from '~/assets/json/iconManager';
import { getPercent } from '~/utils/filters';

echarts.use([SVGRenderer, LineChart, GridComponent, PieChart]);
const outgoings = [
  'rgba(62, 181, 117, 1)',
  'rgba(62, 181, 117, 0.9)',
  'rgba(62, 181, 117, 0.8)',
  'rgba(62, 181, 117, 0.7)',
  'rgba(62, 181, 117, 0.6)',
  'rgba(62, 181, 117, 0.5)',
  'rgba(62, 181, 117, 0.4)',
  'rgba(62, 181, 117, 0.3)',
  'rgba(62, 181, 117, 0.2)',
  'rgba(62, 181, 117, 0.1)',
];
const incomes = [
  'rgba(240,183,58,1)',
  'rgba(240,183,58,0.9)',
  'rgba(240,183,58,0.8)',
  'rgba(240,183,58,0.7)',
  'rgba(240,183,58,0.6)',
  'rgba(240,183,58,0.5)',
  'rgba(240,183,58,0.4)',
  'rgba(240,183,58,0.3)',
  'rgba(240,183,58,0.2)',
  'rgba(240,183,58,0.1)',
];
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
export default class ChatPie extends Component {
  constructor(props) {
    super(props);
    this.chart = null;
    this.state = {
      month_outgoings_balance: 25580, // 支出
      month_incomes_balance: 0, // 收入
      option: {
        label: {
          fontSize: 12,
          color: 'rgba(0,0,0,0.50)',
        },
        color: outgoings,
        series: [
          {
            type: 'pie',
            radius: ['32%', '55%'],
            minAngle: 20,
            selectedMode: true,
            label: {
              fontSize: 4.05,
              color: 'rgba(0,0,0,0.5)',
              fontWeight: 600,
              formatter: '\n{b|{b}}\n',
              fontFamily: 'PingFang SC',
              rich: {
                b: {
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.5)',
                  fontWeight: 600,
                  fontFamily: 'PingFang SC',
                },
              },
            },
            labelLine: {
              length: 24,
              length2: 6,
              maxSurfaceAngle: 80,
              lineStyle: {
                color: 'rgba(0,0,0,0.1)',
              },
            },
            data: MockData.map(item => {
              return {
                name:
                  item.classification_name +
                  getPercent(item.amount, 25580) +
                  '%',
                value: getPercent(
                  item.amount,
                  25580,
                ),
              };
            }),
            itemStyle: {
              borderWidth: 1.2,
              borderColor: '#fff',
            },
            select: {
              disabled: true,
            },
          },
        ],
      },
    };
    this.skiaRef = React.createRef()
  }
  componentDidMount() {
    if (this.skiaRef.current) {
      this.chart = echarts.init(this.skiaRef.current, 'light', {
        renderer: 'svg',
        width: 320,
        height: 320,
      });
      this.chart.setOption(this.state.option);
    }
  }
  componentWillUnmount() {
    this.chart?.dispose();
  }
  render() {
    return (
      <View style={styles.container}>
        <SkiaChart ref={this.skiaRef} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
