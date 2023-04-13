import {
  Animated,
  Text,
  TextInput,
} from 'react-native';
import KeyboardFieldStyle, {KeybodrdFieldStyle} from './style/field';
import React, {Component} from 'react';
import {WithTheme, WithThemeStyles} from '../style';

export default class KeyBoardFiled extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  getText = () => {
    return this.state.text;
  };

  setText = (text) => {
    this.setState({
      text: text,
    });
  };
  // 初始化
  render() {
    const {money, styles} = this.props;

    return (
      <WithTheme themeStyles={KeyboardFieldStyle} styles={styles}>
        {_styles => {
          return (
            <Animated.View style={[_styles.container, {...styles}]}>
              <Text style={_styles.name}>备注：</Text>
              <TextInput
                style={_styles.input}
                maxLength={20}
                placeholder={'点击写备注'}
                placeholderTextColor={'#cccccc'}
                contextMenuHidden={true}
                onChangeText={text => this.setState({text})}
                selectionColor={'#07c160'}
                returnKeyType={'done'}
                autoCorrect={false}
                value={this.state.text}
              />
              <Text style={_styles.money}>{money}</Text>
            </Animated.View>
          );
        }}
      </WithTheme>
    );
  }
}
