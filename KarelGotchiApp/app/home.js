import { Link, router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  ImageBackground,
} from "react-native";
import LoadKarelBtn from "../components/LoadKarelBtn";
import CreateKarelBtn from "../components/newKarel";
import KarelObj from "../components/kgObjs";
import { useState, useEffect } from "react";
import supabase from "../Supabase";
import images from "../assets/images/images";

const StarterKarel = KarelObj;

const renderBtn = ({ item }) => {
  return <LoadKarelBtn inputObj={item} />;
};

export default function Page({ signOutFunc, cur_uid, cur_name }) {
  //Supabase stuff
  const [data, setData] = useState(null);

  const createKarel = () => {
    return <CreateKarelBtn cur_uid={cur_uid} />;
  };

  const handleRecordUpdated = (payload) => {
    console.log("UPDATE", payload);
    //setData(oldData => )
  };

  const handleRecordInserted = (payload) => {
    console.log("INSERT", payload);
    setData((oldData) => [...oldData, payload.new]);
  };

  const handleRecordDeleted = (payload) => {
    console.log("DELETE", payload);
    setData((oldData) => oldData.filter((item) => item.id !== payload.old.id));
  };

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
      const response = await supabase
        .from("KarelInfo")
        .select("*")
        .eq("user_id", cur_uid);
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);

  // would map data base to button flat list
  // removed this:  keyExtractor={(item) => item.user_id}
  return (
    <ImageBackground
      source={images.home_bg} // Replace with the path to your image
      imageStyle={{ opacity: 0.2 }}
      style={{
        // alignItems: "center",
        // justifyContent: "center",
        height: "100%",
        // borderWidth: 1,
      }}
    >
      <View style={styles.container}>
        <Pressable onPress={() => signOutFunc()}>
          <Text>Sign out</Text>
        </Pressable>
        <View style={styles.main}>
          <Text style={styles.title}>Home</Text>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={data}
              renderItem={renderBtn}
              style={{}}
              ListFooterComponent={createKarel}
            />
          </SafeAreaView>
        </View>
      </View>
    </ImageBackground>
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
  createKarolStyle: {
    backgroundColor: "#00FF00",
    width: "100%",
  },
});
