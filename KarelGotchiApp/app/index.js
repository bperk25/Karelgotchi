import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LoadKarelBtn from "../components/LoadKarelBtn"
import KarelObj from "../components/kgObjs";
import supabase from './Supabase';

const StarterKarel = KarelObj;

export default function Page() {
  // would map data base to button flat list
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Home</Text>
        <LoadKarelBtn inputObj={StarterKarel}></LoadKarelBtn>
      </View>
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
});
