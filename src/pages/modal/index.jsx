import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {Component} from "react";

// function Profile() {
//   return (
//     <View style={styles.container}>
//       <Text>记账</Text>
//       <Button onPress={() => {
//         nav
//       }}></Button>
//     </View>
//   );
// }
export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationIndex: 0,
      models: [[], []],
    }
  }
  render() {
    console.log(this.props.route, 'render props')
    const {params} = this.props.route
    return (
      <View style={styles.container}>
        <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          this.props.navigation.goBack()
        }}>
        <Text >记账</Text>
          </TouchableOpacity>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#818CF8",
    alignItems: "center",
    justifyContent: "center",
  },
});