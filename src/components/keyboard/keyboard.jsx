import {
  Animated,
  Easing,
  Keyboard,
  Text,
  TouchableHighlight,
  View
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

import Button from './button'
import Calculation from './calculation'
import DateExtension from '@app/utils/date-extension';
import Field from './field'
import {KeyBoardFiledPropsType} from './field';
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
  _keyboardDidShow = (e) => {
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
  _keyboardDidHide = (e) => {
    Animated.timing(this.state.inputAnim, {
      duration: 200,
      easing: Easing.elastic(0),
      toValue: 0,
      useNativeDriver: false,
    }).start(result => {});
  };
  // 点击Item
  _onItemPress = (index) => {
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

  //============================ 界面 ============================//
  // 按钮
  subitem = (_styles) => {
    // var button = [];
    var button = [];
    for (var i = 0; i < 4; i++) {
      var subbutton = [];
      for (var y = 0; y < 4; y++) {
        const key = i * 4 + y;
        subbutton.push(
          <Button
            key={key}
            index={key}
            title={Calculation.getButtonString(
              i * 4 + y,
              this.state.money,
              this.state.date,
            )}
            onPress={this._onItemPress}
            style={_styles.subview}
          />,
        );
      }
      button.push(
        <View key={i} style={_styles.view}>
          {subbutton}
        </View>,
      );
    }
    
    return button
  };
  // 初始化
  render() {
    // const renderButtonGroup = (_styles) => {
    //   return (
    //     <View style={_styles.keyboardWrapper}>
    //       <View style={_styles.boardLeft}>
    //         <View styles={_styles.boardBtnGrow}>
    //           <Button
    //             title={'1'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //           <Button
    //             title={'2'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //           <Button
    //             title={'3'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //         </View>
    //         <View styles={_styles.boardBtnGrow}>
    //           <Button
    //             title={'4'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //           <Button
    //             title={'5'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //           <Button
    //             title={'6'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //         </View>
    //         <View styles={_styles.boardBtnGrow}>
    //           <Button
    //             title={'7'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //           <Button
    //             title={'8'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //           <Button
    //             title={'9'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //         </View>
    //         <View styles={_styles.boardBtnGrow}>
    //           <Button
    //             title={'0'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //           <Button
    //             title={'.'}
    //             onPress={() => {}}
    //             style={_styles.subview}
    //           />
    //         </View>
    //       </View>
    //       <View style={_styles.boardRight}>
    //         <Button
    //           title={'1'}
    //           onPress={() => {}}
    //           style={_styles.subview}
    //         />
    //         <Button
    //           title={'1'}
    //           onPress={() => {}}
    //           style={_styles.subview}
    //         />
    //       </View>
    //     </View>
    //   )
    // }
    return (
      <WithTheme themeStyles={KeybodrdStyles}>
        {_styles => {
          return (
            <Animated.View style={{height: this.state.keyboardAnim}}>
              <Animated.View style={_styles.container}>
                {/* <Field
                  ref={this.field}
                  money={this.state.money}
                  styles={{top: this.state.inputAnim}}
                /> */}
                {/* {renderButtonGroup(_styles)} */}
                {this.subitem(_styles)}
              </Animated.View>
            </Animated.View>
          );
        }}
      </WithTheme>
    );
  }
}
