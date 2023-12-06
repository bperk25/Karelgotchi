import { Link, router } from "expo-router";
import {
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { Input } from "react-native-elements";
import images from "../assets/images/images";
import HomePage from "./home";
import Auth from "../components/Auth";
import supabase from "../Supabase";

export default function Page() {
  const [session, setSession] = useState(null);
  const [userName, setUserName] = useState("");
  const [nameIsSet, setNameIsSet] = useState(false);
  const [curData, setCurData] = useState(null);

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert(error.message);
    } else {
      // Optional: You can perform additional actions after successful sign-out
      setNameIsSet(false);
      console.log("User signed out successfully");
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <ImageBackground
          source={images.login_bg} // Replace with the path to your image
          imageStyle={{ opacity: "20%" }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            borderWidth: 1,
            width: "100%",
          }}
        >
          <Auth />
        </ImageBackground>
      </View>
    );
  }

  async function addUser() {
    let response = await supabase
      .from("UserInfo")
      .select("*")
      .eq("uid", session.user.id);

    // Add to UserInfo table if first time signing in
    if (response.data.length == 0) {
      const { data, error } = await supabase
        .from("UserInfo")
        .insert([
          {
            num_pets: 0,
            uid: session.user.id,
          },
        ])
        .select();
      response = await supabase
        .from("UserInfo")
        .select("*")
        .eq("uid", session.user.id);
    }
    setCurData(response.data);

    let validName =
      response.data[0].username != null && response.data[0].username != "";
    setNameIsSet(validName);
  }

  async function initUserName() {
    const { data, error } = await supabase
      .from("UserInfo")
      .update({ username: userName })
      .eq("uid", session.user.id)
      .select();
    setNameIsSet(true);
    setUserName("");
  }
  // change so that it is not requesting when it doesn't need to
  if (!nameIsSet) addUser();
  if (!nameIsSet) {
    return (
      <View style={styles.container}>
        <Input
          label="User Name"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          placeholder="Enter User Name"
          autoCapitalize={"none"}
        />
        <Pressable
          style={{
            backgroundColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
          }}
          onPress={() => initUserName()}
        >
          <Text>Submit Username</Text>
        </Pressable>
      </View>
    );
  }

  // Regular Home Screen should add props to home
  // return (
  //   <View>
  //     <HomePage  />
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.login_bg} // Replace with the path to your image
        imageStyle={{ opacity: "20%" }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          borderWidth: 1,
        }}
      >
        <Text style={styles.title}> KarelGotchi </Text>
        <Image
          style={{ width: 200, height: 250 }}
          source={images.karel_basic}
        />
        <Text>
          Welcome {curData[0].username + "\n"}(
          {session && session.user && <Text>{session.user.id}</Text>})
        </Text>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/home",
            })
          }
        >
          <Text style={styles.btn}>Go Home</Text>
        </Pressable>
        <Pressable onPress={() => signOut()}>
          <Text>Sign Out</Text>
        </Pressable>
      </ImageBackground>
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
