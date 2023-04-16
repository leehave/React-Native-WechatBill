import { StyleSheet, Text, View } from "react-native";

import React from "react";

function ProfileSettings() {
  return (
    <View style={styles.container}>
      <Text>图表</Text>
    </View>
  );
}

export default ProfileSettings;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34D399",
    alignItems: "center",
    justifyContent: "center",
  },
});