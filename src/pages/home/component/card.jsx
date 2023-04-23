import { Image, Platform, SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';

import { IconManager } from '~/assets/json/iconManager.js';
import List from '~/components/list/'
import React from 'react';
import SwipeAction from '~/components/swipe-action'

// const thumbIcon = require('~/assets/images/outlay/icon-baoxian-active.png')

function CardItem() {
  const right = [
    {
      text: '修改分类',
      onPress: () => console.log('more'),
      backgroundColor: '#4C4C4C',
      color: 'white',
    },
    {
      text: '删除',
      onPress: () => console.log('delete'),
      backgroundColor: '#E65F59',
      color: 'white',
    },
  ]
  return (
    <View style={styles.card}>
      <View style={styles.cell_title}>
        <View style={styles.name}>
          <Text style={styles.days}>4月18日</Text>
          <Text>今天</Text>  
        </View>
        <View style={styles.right_value}>
          <View style={styles.amount_item}>
            <View style={styles.tag}>
              <Text style={styles.tag_style}>出</Text>
            </View>
            <Text>13.1</Text> 
          </View>
          <View style={styles.amount_item}>
            <View style={styles.tag}>
              <Text style={styles.tag_style}>支</Text>
            </View>
            <Text>13.1</Text> 
          </View>
        </View>
      </View>
      <View style={styles.cell_group}>
        <List>
          <SwipeAction
            right={right}
            left={null}
            onSwipeableOpen={() => console.log('open')}
            onSwipeableClose={() => console.log('close')}>
            <List.Item align='center' thumb={
              <Image
                source={IconManager.test_icon}
                style={{ width: 40, height: 40, marginRight: 10 }}
              />
            } extra="-8.01">
              <View style={styles.cell_item_title}>
                <Text style={styles.cell_item_name}>餐饮</Text>
                <View style={styles.description}>
                    <Text style={styles.desc_text}>13:14</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.desc_text}>鲜蒸米皮坊郑州王屋路</Text>
                </View>
              </View>
            </List.Item>
          </SwipeAction>
        </List>
      </View>
    </View>
  )  
}
export default CardItem;
const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingLeft: 12,
    paddingRight: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 10
  },
  name: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  desc_item: {
    marginRight: 4
  },
  cell_item_title: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    flexWrap: 'nowrap',
  },
  cell_item_name: {
    fontSize: 14,
    marginBottom: 6
  },
  description: {
    display: 'flex',
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center'
  },
  desc_text: {
    fontSize: 12,
    color: '#A8A8A8',
  },
  cell_title: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 12
  },
  right_value: {
    display: 'flex',
    flexDirection: 'row',
  },
  days: {
    marginRight: 4
  },
  amount_item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10
  },
  datetime: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
  },
  tag: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    padding: 4,
    backgroundColor: '#F3F3F3',
    marginRight: 4
  },
  tag_style: {
    fontSize: 11,
    color: '#7D7D7D'
  },
  line: {
    width: 1,
    height: 8,
    backgroundColor: '#E6E6E6',
    marginLeft: 4,
    marginRight: 4
  }
})