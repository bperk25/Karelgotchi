import { Link, router } from "expo-router";
import {
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Button,
} from "react-native";
import LoadKarelBtn from "../components/LoadKarelBtn";
import KarelObj from "../components/kgObjs";
import { useState, useEffect } from "react";
import "react-native-url-polyfill/auto";
import supabase from "../Supabase";
import images from "../assets/images/images";

const StarterKarel = KarelObj;

const loggedIn = true;

export default function Page() {
  // would map data base to button flat list
  return (
    <View style={styles.container}>
      <Text style={styles.title}> KarelGotchi </Text>
      <Image
          style={{ width: 200, height: 250 }}
          source={images.karel_basic}
        />
        <Pressable
            onPress={() =>
              router.push({
                pathname: "/home",
              })
            }
          >
            <Text style={styles.btn}>Go Home</Text>
          </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#CF9FFF",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});
