import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Text>My name is Anastasia.</Text>
      <Text>This is my first React Native App for DEV 272.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  }
})