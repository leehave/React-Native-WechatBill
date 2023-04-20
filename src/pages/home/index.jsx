import { Image, Platform, SectionList, StatusBar, StyleSheet, Text, View } from "react-native";

import { IconManager } from '~/assets/json/iconManager'
import React from "react";

const class_icon = require('~/assets/images/icon/leixing.png');
const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
  },
];

function Home() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.customheader}>
        <View style={styles.content}>
          <Text style={styles.headercolor}>记账本</Text>
        </View>
        <View style={styles.classification}>
          <View style={styles.classgroup}>
            <Text style={styles.classtext}>全部类型</Text>
            <View style={styles.line}></View>  
            <Image
              style={styles.classicon}
              source={class_icon}
            />
          </View>  
        </View>
        <View style={styles.datetime}>
          <View style={styles.monthdesc}>
            <Text style={ styles.timetext}>2023年4月</Text>  
            <Image style={styles.arrow} source={IconManager.icon_dowm_arrow} />
          </View>
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
      {/* <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      /> */}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  datetime: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
  },
  monthAmount: {
    // flex: 1
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  timetext: {
    fontSize: 16,
    color: '#ffffff'
  },
  monthdesc: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 12,
    height: 6,
    marginLeft: 6,
    marginRight: 6
  },
  amountText: {
    color: '#ffffff',
    marginRight: 6
  },
  customheader: {
    paddingTop: 20,
    paddingBottom: 15,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#63b27b',
    paddingLeft: 20,
    paddingRight: 20
  },
  classification: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
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
    marginRight: 5
  },
  classgroup: {
    width: 106,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    display: 'flex',
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
    fontWeight: '800'
  },
  headercolor: {
    color: '#ffffff',
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    backgroundColor: "#22D3EE",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});