import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {WithTheme, WithThemeStyles} from '../style';

import Calculation from './calculation';
import KeyboardButtonStyle from './style/index';

export default class KeyBoardButton extends React.Component {
  static defaultProps = {
    onPress: (_) => {},
    index: 0,
    title: '今日',
  };
  constructor(props) {
    super(props);
  }
  // 初始化
  render() {
    const {onPress, index, title, style} = this.props;
    
    return (
      <WithTheme themeStyles={KeyboardButtonStyle} styles={style}>
        {_styles => {
          return (
            <TouchableHighlight
              onPress={() => onPress(index)}
              style={[
                _styles.container,
                {
                  backgroundColor: index != 15 ? 'white' : '#63b27b',
                },
              ]}
              underlayColor={
                index != 15 ? 'rgba(250, 250, 250, 1)' : '#63b27b'
              }>
              <View style={_styles.view}>
                <Text
                  style={[
                    _styles.name,
                    {
                      fontSize:
                        Calculation.isDate(index) && title !== '今天' ? 12 : 16,
                    },
                  ]}>
                  {title}
                </Text>
              </View>
            </TouchableHighlight>
          );
        }}
      </WithTheme>
    );
  }

  // 内容
  getButtonContent = (index, date) => {
    if (index == 0) {
      return '7';
    } else if (index == 1) {
      return '8';
    } else if (index == 2) {
      return '9';
    } else if (index == 3) {
      return '今天';
    } else if (index == 4) {
      return '4';
    } else if (index == 5) {
      return '5';
    } else if (index == 6) {
      return '6';
    } else if (index == 7) {
      return '+';
    } else if (index == 8) {
      return '1';
    } else if (index == 9) {
      return '2';
    } else if (index == 10) {
      return '3';
    } else if (index == 11) {
      return '-';
    } else if (index == 12) {
      return '.';
    } else if (index == 13) {
      return '0';
    } else if (index == 14) {
      return 'delete';
    } else if (index == 15) {
      return '完成';
    }
  };
}
