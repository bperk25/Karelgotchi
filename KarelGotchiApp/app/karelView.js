import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";

export default function Page() {
  const params = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Karel View</Text>
        <Text style={styles.subtitle}>Currently viewing {params.name}</Text>
        <Pressable
          style={styles.btn}
          onPress={() =>
            router.push({
              pathname: "/",
            })
          }
        >
          <Text>Return</Text>
        </Pressable>
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
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  btn: {
    backgroundColor: "#CF9FFF",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
});
