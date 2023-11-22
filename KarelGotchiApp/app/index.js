import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LoadKarelBtn from "../components/LoadKarelBtn";
import KarelObj from "../components/kgObjs";
import { useState, useEffect } from "react";
import 'react-native-url-polyfill/auto'
import supabase from "../Supabase";

const StarterKarel = KarelObj;

export default function Page() {
  //Supabase stuff
  const [data, setData] = useState(null);
  
  const handleRecordUpdated = (payload) => {
    console.log("UDPATE", payload);
    //setData(oldData => )
  }

  const handleRecordInserted = (payload) => {
    console.log("INSERT", payload);
    setData(oldData => [...oldData, payload.new])
  }

  const handleRecordDeleted = (payload) => {
    console.log("DELETE", payload);
    setData(oldData => oldData.filter(item => item.id !== payload.old.id));
  }

  useEffect(() => {
    // Listen for changes to db
    // From https://supabase.com/docs/guides/realtime/concepts#postgres-changes
    supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "KarelBtnTest" },
        handleRecordUpdated
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "KarelBtnTest" },
        handleRecordInserted
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "KarelBtnTest" },
        handleRecordDeleted
      )
      .subscribe();
  }, []);

  useEffect(() => {
    // Fetch data on initial load
    const fetchData = async () => {
      const response = await supabase.from("KarelBtnTest").select("*");
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);



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
