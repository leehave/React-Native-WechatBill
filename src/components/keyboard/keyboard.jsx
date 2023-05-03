import {
  Animated,
  Easing,
  Image,
  Keyboard,
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
} from '@app/utils/util';
import React, {Component, LegacyRef} from 'react';
import {WithTheme, WithThemeStyles} from '../style';

import Calculation from './calculation';
import DateExtension from '@app/utils/date-extension';
import {IconManager} from '~/assets/json/iconManager';
import KeybodrdStyles from './style/keyboard';

export default class KeyBoardButton extends React.Component {
  keyboardDidShowListener;
  keyboardDidHideListener;
  field = React.createRef();
  // picker: any;
  constructor(props) {
    super(props);
    this.state = {
      keyboardAnim: new Animated.Value(0),
      inputAnim: new Animated.Value(0),
      money: '0',
      date: undefined,
    };
  }
  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this._keyboardDidHide,
    );
    // 修改
    if (this.props.model) {
      const model = this.props.model;
      this.setState({
        money: parseFloat(model.price) + '',
      });
      this.field?.current?.setText(model.mark);
      this._onConfirm(model.year, model.month, model.day);
    }
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  // 键盘显示
  _keyboardDidShow = e => {
    const keyboardH = e.endCoordinates.height;
    const inputKeyH = (SCREEN_HEIGHT - NAVIGATION_HEIGHT) / 2;
    const inputH = 120;
    const offsetY = inputH - (inputKeyH - keyboardH);

    Animated.timing(this.state.inputAnim, {
      duration: 200,
      easing: Easing.elastic(0),
      toValue: -offsetY,
      useNativeDriver: false,
    }).start(result => {});
  };
  // 键盘隐藏
  _keyboardDidHide = e => {
    Animated.timing(this.state.inputAnim, {
      duration: 200,
      easing: Easing.elastic(0),
      toValue: 0,
      useNativeDriver: false,
    }).start(result => {});
  };
  // 点击Item
  _onItemPress = index => {
    // 点击时间
    if (Calculation.isDate(index)) {
      // this.picker.show();
    }
    // 其他
    else {
      const money = this.state.money;
      // 显示
      var newMoney = Calculation.getMoneyString(money, index);
      this.setState({money: newMoney});

      // 点击完成
      if (Calculation.isComplete(index)) {
        // 回调
        if (Calculation.isCalculation(money)) {
          const mark = this.field?.current?.getText();
          const date =
            this.state.date != undefined
              ? this.state.date
              : DateExtension.dateToStr(new Date());
          this.props.onBookPress(newMoney, mark, date);
        }
      }
    }
  };
  // 动画
  _switchAnimation(isShow) {
    Animated.timing(this.state.keyboardAnim, {
      duration: 400,
      easing: Easing.elastic(0),
      toValue: isShow == true ? (SCREEN_HEIGHT - NAVIGATION_HEIGHT) / 2 : 0,
      useNativeDriver: false,
    }).start(result => {});
  }

  // 确认
  _onConfirm = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    if (!DateExtension.isToday(date)) {
      const dateStr = DateExtension.dateToStr(date);
      this.setState({date: dateStr});
    } else {
      this.setState({date: '今天'});
    }
  };

  renderButtonGroup = _styles => {
    return (
      <View style={_styles.keyboardWrapper}>
        <View
          style={[
            _styles.keyboardWd,
            {flexDirection: 'column', backgroundColor: '#FAFAFA', margin: 0},
          ]}>
          <View
            style={{
              flex: 1,
              padding: 5,
              flexDirection: 'row',
              backgroundColor: '#FAFAFA',
            }}>
            <View style={{flex: 3, backgroundColor: '#aaaabb'}}>
              <View
                style={{
                  flex: 3,
                  flexDirection: 'column',
                  backgroundColor: '#FAFAFA',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#FAFAFA',
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, padding: 5}}>
                      <TouchableHighlight
                        onPress={() => {}}
                        style={[
                          _styles.singleBtn,
                          {
                            backgroundColor: 'white',
                          },
                        ]}
                        underlayColor={'rgba(250, 250, 250, 1)'}>
                        <View style={_styles.view}>
                          <Text style={_styles.keyboardText}>1</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, padding: 5}}>
                      <TouchableHighlight
                        onPress={() => {}}
                        style={[
                          _styles.singleBtn,
                          {
                            backgroundColor: 'white',
                          },
                        ]}
                        underlayColor={'rgba(250, 250, 250, 1)'}>
                        <View style={_styles.view}>
                          <Text style={_styles.keyboardText}>2</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, padding: 5}}>
                      <TouchableHighlight
                        onPress={() => {}}
                        style={[
                          _styles.singleBtn,
                          {
                            backgroundColor: 'white',
                          },
                        ]}
                        underlayColor={'rgba(250, 250, 250, 1)'}>
                        <View style={_styles.view}>
                          <Text style={_styles.keyboardText}>3</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: '#FAFAFA',
                    }}>
                    <View style={{flex: 1, padding: 5}}>
                      <TouchableHighlight
                        onPress={() => {}}
                        style={[
                          _styles.singleBtn,
                          {
                            backgroundColor: 'white',
                          },
                        ]}
                        underlayColor={'rgba(250, 250, 250, 1)'}>
                        <View style={_styles.view}>
                          <Text style={_styles.keyboardText}>4</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, padding: 5}}>
                      <TouchableHighlight
                        onPress={() => {}}
                        style={[
                          _styles.singleBtn,
                          {
                            backgroundColor: 'white',
                          },
                        ]}
                        underlayColor={'rgba(250, 250, 250, 1)'}>
                        <View style={_styles.view}>
                          <Text style={_styles.keyboardText}>5</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, padding: 5}}>
                      <TouchableHighlight
                        onPress={() => {}}
                        style={[
                          _styles.singleBtn,
                          {
                            backgroundColor: 'white',
                          },
                        ]}
                        underlayColor={'rgba(250, 250, 250, 1)'}>
                        <View style={_styles.view}>
                          <Text style={_styles.keyboardText}>6</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: '#FAFAFA',
                    }}>
                    <View style={{flex: 1, padding: 5}}>
                      <TouchableHighlight
                        onPress={() => {}}
                        style={[
                          _styles.singleBtn,
                          {
                            backgroundColor: 'white',
                          },
                        ]}
                        underlayColor={'rgba(250, 250, 250, 1)'}>
                        <View style={_styles.view}>
                          <Text style={_styles.keyboardText}>7</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, padding: 5}}>
                      <TouchableHighlight
                        onPress={() => {}}
                        style={[
                          _styles.singleBtn,
                          {
                            backgroundColor: 'white',
                          },
                        ]}
                        underlayColor={'rgba(250, 250, 250, 1)'}>
                        <View style={_styles.view}>
                          <Text style={_styles.keyboardText}>8</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, padding: 5}}>
                      <TouchableHighlight
                        onPress={() => {}}
                        style={[
                          _styles.singleBtn,
                          {
                            backgroundColor: 'white',
                          },
                        ]}
                        underlayColor={'rgba(250, 250, 250, 1)'}>
                        <View style={_styles.view}>
                          <Text style={_styles.keyboardText}>9</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'space-between',
                  }}>
                  <View style={{flex: 2, padding: 5}}>
                    <TouchableHighlight
                      onPress={() => {}}
                      style={[
                        _styles.singleBtn,
                        {
                          backgroundColor: 'white',
                          flex: 2,
                        },
                      ]}
                      underlayColor={'rgba(250, 250, 250, 1)'}>
                      <View style={_styles.view}>
                        <Text style={_styles.keyboardText}>0</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={{flex: 1, padding: 5}}>
                    <TouchableHighlight
                      onPress={() => {}}
                      style={[
                        _styles.singleBtn,
                        {
                          backgroundColor: 'white',
                          flex: 1,
                        },
                      ]}
                      underlayColor={'rgba(250, 250, 250, 1)'}>
                      <View style={_styles.view}>
                        <Text style={_styles.keyboardText}>.</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, padding: 5}}>
                  <TouchableHighlight
                    onPress={() => {}}
                    style={[
                      _styles.singleBtn,
                      {
                        backgroundColor: 'white',
                        flex: 1,
                      },
                    ]}
                    underlayColor={'rgba(250, 250, 250, 1)'}>
                    <View style={_styles.view}>
                      <Image
                        style={[
                          {
                            width: 24,
                            height: 24,
                          },
                        ]}
                        source={IconManager.keyboard_delete}></Image>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={{flex: 2, padding: 5}}>
                  <TouchableHighlight
                    onPress={() => {}}
                    style={[
                      _styles.singleBtn,
                      {
                        backgroundColor: '#A8D6B9',
                        borderBottomColor: '#A8D6B9',
                        borderRightColor: '#A8D6B9',
                        flex: 2,
                      },
                    ]}
                    underlayColor={'#63b27b'}>
                    <View style={_styles.view}>
                      <Text
                        style={[
                          {
                            color: 'white',
                            fontSize: 16,
                          },
                        ]}>
                        确定
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // 初始化
  render() {
    return (
      <WithTheme themeStyles={KeybodrdStyles}>
        {_styles => {
          return (
            <Animated.View style={{height: this.state.keyboardAnim}}>
              <Animated.View style={_styles.container}>
                {this.renderButtonGroup(_styles)}
              </Animated.View>
            </Animated.View>
          );
        }}
      </WithTheme>
    );
  }
}
