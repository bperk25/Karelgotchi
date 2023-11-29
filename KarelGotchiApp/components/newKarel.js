import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";

const CreateKarelBtn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.btn_bg}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/newKarelView",
            })
          }
        >
          <Text>+ Create new Karel +</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateKarelBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    width: "100%",
    marginBottom: 10,
  },
  btn_bg: {
    backgroundColor: "#CF9FFF",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
