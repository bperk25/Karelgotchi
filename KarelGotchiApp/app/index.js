import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  // would make special button component and map data base to button flat list
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Home</Text>
        <Pressable
          style={styles.subtitle}
          onPress={() =>
            router.push({
              pathname: "/karelView",
              id: 1
            })
          }
        >
          <Text style={{ fontSize: 20 }}>Karelgotchi #1</Text>
        </Pressable>
        <Pressable
          style={styles.subtitle}
          onPress={() =>
            router.push({
              pathname: "/karelView",
              id: 2
            })
          }
        >
          <Text style={{ fontSize: 20 }}>Karelgotchi #2</Text>
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
});
