import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import images from "../assets/images/images";

export default function Page() {
  const params = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={{ justifyContent: "center" }}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/",
              })
            }
          >
            <Text style={styles.btn}>Back</Text>
          </Pressable>
        </View>
        <Text style={styles.title}>Karel View</Text>
        <Text></Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.subtitle}>{params.name}</Text>
        <Image
          style={{ width: 200, height: 250 }}
          source={images.karel_basic}
        />
        <View style={styles.gotchi_panel}>
          <Pressable>
            <Text style={styles.btn}>Panel btn #1</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.btn}>Panel btn #1</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.btn}>Panel btn #1</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    width: "100%",
  },
  main: {
    flex: 1,
    marginHorizontal: "auto",
    alignItems: "center",
    width: "100%",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  gotchi_panel: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
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
});
