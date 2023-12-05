import React, { useState } from "react";
import { Alert, Pressable, Image, StyleSheet, Text, View } from "react-native";
import supabase from "../Supabase";
import { Button, Input } from "react-native-elements";
import images from "../assets/images/images";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);

    setLoading(false);
  }

  const onNewUser = async () => {
    const response = await supabase.from("UserInfo").insert({
      user: "James Landay",
      timestamp: "now",
      text: input,
    });
  };

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> KarelGotchi </Text>
      <Image style={{ width: 100, height: 125 }} source={images.karel_basic} />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          labelStyle={{ color: "black" }}
          placeholderTextColor={{ color: "black" }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          labelStyle={{ color: "black" }}
          placeholderTextColor={{ color: "black" }}
        />
      </View>
      <View style={{ alignItems: "center", maxWidth: 400, width: "100%" }}>
        <View style={[styles.btns, styles.mt20]}>
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
        <View style={styles.btns}>
          <Button
            title="Sign up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    marginTop: 40,
    padding: 24,
    maxWidth: 400,
    backgroundColor: "rgba(255, 154, 138, 0.5)",
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    maxWidth: 400,
    width: "100%",
  },
  btns: {
    // I want the button to be #C7A0D2
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
