import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    ...Platform.select({
      ios: {
        paddingTop: 20
      },
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  },
  button: {
    alignSelf: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 20,
    flex: 1
  },
  buttonRight: {
    alignItems: "flex-end"
  },
  icon: {
    width: 18
  }
});
