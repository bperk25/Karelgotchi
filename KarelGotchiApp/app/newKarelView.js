import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import images from "../assets/images/images";
import { useState } from "react";
import Animated, {
  withTiming,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import supabase from "../Supabase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const params = useLocalSearchParams();

  const [karelTheme, setKarelTheme] = useState("WHITE");
  const [karelImg, setKarelImg] = useState(images.karel_basic);
  const [inputText, setInputText] = useState("");

  const white = "WHITE";
  const green = "GREEN";
  const blue = "BLUE";
  const pink = "PINK";

  const addKarelInfo = async () => {
    const { data, error } = await supabase.from("KarelInfo").insert([
      {
        user_id: params.uid,
        happiness: 50,
        hunger: 50,
        hygiene: 50,
        karel_name: inputText,
        karel_theme: karelTheme,
      },
    ]);
    router.push({
      pathname: "/",
    });
  };

  // Main Karel image animation with help of ChatGPT.
  const opacity = useSharedValue(0);
  const fadeDuration = 1500;

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  }, [opacity]);

  const updateKarelImage = (karelTheme) => {
    setKarelTheme(karelTheme);
    opacity.value = 0;
    if (karelTheme === white) {
      setKarelImg(images.karel_basic);
    } else if (karelTheme === green) {
      setKarelImg(images.karel_green);
    } else if (karelTheme === blue) {
      setKarelImg(images.karel_blue);
    } else if (karelTheme === pink) {
      setKarelImg(images.karel_pink);
    } else {
      console.log("Error: Invalid color provided");
    }
    opacity.value = withSpring(1, { duration: fadeDuration });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={images.handheld_bg} // Replace with the path to your image
        imageStyle={{ opacity: 0.2 }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          borderWidth: 1,
          resizeMode: "stretch",
        }}
      >
        <View style={styles.outerView}>
          <View style={styles.container}>
            <View style={styles.upperHalf}>
              <View style={styles.nameFlex}>
                <View style={styles.intro_box}>
                  <Text style={styles.title}>Build your Karel! </Text>
                  <Text style={styles.subtitle}>
                    Choose Karel's nickname and color scheme:{" "}
                  </Text>
                </View>
                <View style={styles.textInput}>
                  <TextInput
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                    placeholder={"Enter Karel Name..."}
                  />
                </View>
              </View>
              <View style={styles.main}>
                <Animated.Image
                  style={[styles.mainImage, animatedStyle]}
                  source={karelImg}
                />
              </View>
              <View style={styles.skinFlex}>
                <View style={styles.karel_skins}>
                  <TouchableOpacity onPress={() => updateKarelImage(white)}>
                    <View stlye={styles.karelFlex}>
                      <Image
                        style={styles.skin_style}
                        source={images.karel_basic}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateKarelImage(blue)}>
                    <View stlye={styles.karelFlex}>
                      <Image
                        style={styles.skin_style}
                        source={images.karel_blue}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateKarelImage(green)}>
                    <View stlye={styles.karelFlex}>
                      <Image
                        style={styles.skin_style}
                        source={images.karel_green}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateKarelImage(pink)}>
                    <View stlye={styles.karelFlex}>
                      <Image
                        style={styles.skin_style}
                        source={images.karel_pink}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.gotchi_panel}>
              <TouchableOpacity style={styles.send} onPress={addKarelInfo}>
                <View style={styles.doneBackground}>
                  <Text style={styles.doneButton}>Done</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.send, {marginLeft: 5}]} onPress={() => router.back()}>
                <View style={styles.doneBackground}>
                  <Text style={styles.doneButton}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerView: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    width: "100%",
    maxWidth: 500,
  },
  main: {
    flex: 2,
    marginHorizontal: "auto",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  gotchi_panel: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  subtitle: {
    fontSize: 20,
    color: "#38434D",
  },
  btn: {
    backgroundColor: "#CF9FFF",
  },
  karel_skins: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 40 + 0.02 * windowHeight,
    borderWidth: 1,
    resizeMode: "contain",
  },
  create_box: {
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  intro_box: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  skin_style: {
    height: 30 + 0.02 * windowHeight,
    width: 30 + 0.02 * windowWidth,
    resizeMode: "contain",
  },
  upperHalf: {
    height: "50%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  mainImage: {
    width: "70%",
    height: "60%",
    resizeMode: "contain",
  },
  nameFlex: {
    flex: 1,
    justifyContent: "flex-end",
  },
  skinFlex: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  karelFlex: {
    width: "20%",
    height: "40%",
    resizeMode: "contain",
  },
  backButton: {
    fontSize: 10 + 0.01 * windowWidth,
  },
  textInput: {
    opacity: 0.5,
    backgroundColor: "lightpink",
    borderRadius: 5,
    padding: 8,
  },
  safeArea: {
    width: "100%",
    height: "100%",
  },
  doneBackground: {
    backgroundColor: "#CF9FFF",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "black",
    opacity: 0.8,
  },
  backBackground: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#CF9FFF",
    opacity: 0.8,
  },
  doneButton: {
    fontSize: 0.01 * windowWidth + 15,
  },
});
