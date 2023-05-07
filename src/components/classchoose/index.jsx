import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  countcoordinatesX,
} from '~/utils/util';

import {IconManager} from '~/assets/json/iconManager';
import Modal from '~/components/modal/index';

export default class ClassPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemIdx: 0,
      billType: 1,
    };
  }
  render() {
    const {classPickerVisible, classification} = this.props;
    const {selectedItemIdx, billType} = this.state;
    return (
      <Modal
        maskClosable
        visible={classPickerVisible}
        animationType="slide-up"
        popup>
        <View style={[styles.container, {paddingBottom: 60}]}>
          <View style={styles.dateContent}>
            <View style={styles.contentTitle}>
              <Text style={styles.titleName}>请选择分类</Text>
              <TouchableHighlight
                onPress={() => this.props.closeClassPicker()}
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
          <ScrollView
            style={[styles.dateContentMain, {paddingBottom: 60}]}
            alwaysBounceVertical
            scrollEventThrottle={16}>
            <View style={[{flex: 1, paddingTop: 10, paddingBottom: 60}]}>
              <View
                style={[
                  styles.selectButton,
                  selectedItemIdx === 0 ? styles.selectButtonChoose : null,
                ]}>
                <Text
                  style={[
                    styles.selectButtonText,
                    {
                      color: selectedItemIdx === 0 ? '#fff' : '#000',
                    },
                  ]}>
                  全部类型
                </Text>
              </View>
              <View style={styles.chooseTitle}>
                <Text style={{fontSize: 14, color: '#999'}}>支出</Text>
              </View>
              <View style={[{flex: 1}, styles.selectRow]}>
                {classification.outcomesArr.map((item, index) => {
                  return (
                    <View
                      style={[
                        styles.selectButton,
                        selectedItemIdx === item.id && billType == 1
                          ? styles.selectButtonChoose
                          : null,
                      ]}
                      key={index}>
                      <Text style={[styles.selectButtonText]}>{item.name}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.chooseTitle}>
                <Text style={{fontSize: 14, color: '#999'}}>收入</Text>
              </View>
              <View style={[{flex: 1}, styles.selectRow]}>
                {classification.incomesArr.map((item, index) => {
                  return (
                    <View
                      style={[
                        styles.selectButton,
                        selectedItemIdx === item.id && billType == 1
                          ? styles.selectButtonChoose
                          : null,
                      ]}
                      key={index}>
                      <Text style={[styles.selectButtonText]}>{item.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
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
  selectButtonChoose: {
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
  chooseTitle: {
    paddingBottom: 10,
    paddingLeft: 10,
  },
  selectRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight: 10,
    // alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#fff',
    borderRadius: 4,
    color: 'rgba(0,0,0,.9)',
    width: countcoordinatesX(224),
    height: 54,
    marginLeft: 10,
    marginBottom: 10,
  },
  selectButtonText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    lineHeight: 54,
  },
});
