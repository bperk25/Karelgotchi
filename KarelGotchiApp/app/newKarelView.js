import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
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
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import supabase from "../Supabase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const params = useLocalSearchParams();

  const [karelTheme, setKarelTheme] = useState("WHITE");
  const [karelImg, setKarelImg] = useState("WHITE");
  const [inputText, setInputText] = useState(images.karel_basic);

  const white = "WHITE";
  const green = "GREEN";
  const blue = "BLUE";
  const pink = "PINK";

  const addKarelInfo = async () => {
    const { data, error } = await supabase.from("KarelInfo").insert([
      {
        user_id: params.uid,
        happiness: 100,
        hunger: 100,
        hygiene: 100,
        karel_name: inputText,
        karel_theme: karelTheme,
      },
    ]);
    router.push({
      pathname: "/",
    });
  };

  const opacity = useSharedValue(0);
  const fadeDuration = 1000; // Set your desired fade-in duration in milliseconds

  // const fadeIn = () => {
  //   opacity.value = withTiming(1, { duration: fadeDuration });
  // };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity]);

  const updateKarelImage = (karelTheme) => {
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
      {/* <View style={{ width: "100%", height: "100%" }}>
        
      </View> */}
      <ImageBackground
        source={images.handheld_bg} // Replace with the path to your image
        imageStyle={{ opacity: "20%" }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          borderWidth: 1,
        }}
      >
        <View style={styles.outerView}>
          <View style={styles.container}>
            <View style={styles.navbar}>
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/",
                    })
                  }
                >
                  <Text style={styles.btn}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
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
                {/* <Text style={styles.subtitle}>{params.name}</Text> */}
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
                    {/* <View stlye={styles.karelFlex}> */}
                    <Image
                      style={styles.skin_style}
                      source={images.karel_green}
                    />
                    {/* </View> */}
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
                <Text style={styles.backButton}>Done</Text>
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
    // backgroundColor: "green",
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
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  karel_img: {
    width: 200,
    height: 250,
  },
  karel_skins: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "40%",
    borderWidth: 1,
  },
  create_box: {
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 20,
  },
  intro_box: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // margin: "10%",
    // marginVertical: 20,
  },
  skin_style: {
    // width: "20%",
    // height: "90%",
    backgroundColor: "blue",
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  upperHalf: {
    height: "50%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  mainImage: {
    width: "60%",
    height: "50%",
    resizeMode: "contain",
  },
  nameFlex: {
    flex: 1,
    // backgroundColor: "blue",
    justifyContent: "flex-end",
  },
  skinFlex: {
    flex: 1,
  },
  karelFlex: {
    // flex: 1,
    width: "20%",
    height: "40%",
    // backgroundColor: "blue",
  },
  backButton: {
    fontSize: 10 + 0.01 * windowWidth,
    backgroundColor: "#CF9FFF",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  textInput: {
    opacity: "50%",
    backgroundColor: "lightpink",
    borderRadius: 5,
    padding: 8,
    // margin: "5%",
  },
  safeArea: {
    width: "100%",
    height: "100%",
  },
});
