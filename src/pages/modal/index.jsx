import { StyleSheet, Text, View } from "react-native";

import React from "react";

function Profile() {
  return (
    <View style={styles.container}>
      <Text>记账</Text>
    </View>
  );
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#818CF8",
    alignItems: "center",
    justifyContent: "center",
  },
});