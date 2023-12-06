import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import images from "../assets/images/images";
import { useState, useEffect } from "react";
import supabase from "../Supabase";

export default function Page() {
  const params = useLocalSearchParams();
  const [karel, setKarelObj] = useState(params);
  // id, created_at, last_visited_at, user_id, happiness, hunger, hygiene
  let prevVisitInMS = Date.parse(karel.last_visited_at);
  let currTimeInMS = Date.now();
  let hoursElapsed = Math.floor((currTimeInMS - prevVisitInMS) / 3600000);

  const updateKarelHappiness = (newHappiness) => {
    setKarelObj((prevKarelObj) => ({
      ...prevKarelObj,
      happiness: newHappiness,
    }));
  };

  const updateKarelHunger = (newHunger) => {
    setKarelObj((prevKarelObj) => ({
      ...prevKarelObj,
      hunger: newHunger,
    }));
  };

  const updateKarelHygiene = (newHygiene) => {
    setKarelObj((prevKarelObj) => ({
      ...prevKarelObj,
      hygiene: newHygiene,
    }));
  };

  // Stats should depreciate if this Karel hasn't been visited in >=1 hour
  useEffect(() => {
    let happinessDelta = 5 * hoursElapsed;
    let hungerDelta = 5 * hoursElapsed;
    let hygieneDelta = 5 * hoursElapsed;

    let newHappiness = Math.max(parseInt(karel.happiness) - happinessDelta, 0);
    let newHunger = Math.max(parseInt(karel.hunger) - hungerDelta, 0);
    let newHygiene = Math.max(parseInt(karel.hygiene) - hygieneDelta, 0);

    updateKarelHappiness(newHappiness);
    updateKarelHunger(newHunger);
    updateKarelHygiene(newHygiene);

    let date = new Date();

    const updateLastVisited = async () => {
      const { error } = await supabase
        .from("KarelInfo")
        .update({ last_visited_at: date.toISOString() })
        .eq("id", karel.id);
    };
    updateLastVisited();
  }, []);

  const updateStatsToDatabase = async () => {
    const { error } = await supabase
      .from("KarelInfo")
      .update({
        happiness: karel.happiness,
        hygiene: karel.happiness,
        hunger: karel.hunger,
      })
      .eq("id", karel.id);
  };

  let happinessBucket = "";
  let hungerBucket = "";
  let hygieneBucket = "";

  if (karel.happiness < 10) {
    happinessBucket = "--";
  } else if (karel.happiness < 25) {
    happinessBucket = "-";
  } else if (karel.happiness < 50) {
    happinessBucket = "\u2713-";
  } else if (karel.happiness < 75) {
    happinessBucket = "\u2713";
  } else if (karel.happiness < 99) {
    happinessBucket = "\u2713+";
  } else {
    happinessBucket = "+";
  }

  if (karel.hunger < 10) {
    hungerBucket = "--";
  } else if (karel.hunger < 25) {
    hungerBucket = "-";
  } else if (karel.hunger < 50) {
    hungerBucket = "\u2713-";
  } else if (karel.hunger < 75) {
    hungerBucket = "\u2713";
  } else if (karel.hunger < 99) {
    hungerBucket = "\u2713+";
  } else {
    hungerBucket = "+";
  }

  if (karel.hygiene < 10) {
    hygieneBucket = "--";
  } else if (karel.hygiene < 25) {
    hygieneBucket = "-";
  } else if (karel.hygiene < 50) {
    hygieneBucket = "\u2713-";
  } else if (karel.hygiene < 75) {
    hygieneBucket = "\u2713";
  } else if (karel.hygiene < 99) {
    hygieneBucket = "\u2713+";
  } else {
    hygieneBucket = "+";
  }
  updateStatsToDatabase();
  let karel_image = images.karel_basic;
  if (karel.karel_color == "BLUE") {
    karel_image = images.karel_blue;
  } else if (karel.karel_color == "GREEN") {
    karel_image = images.karel_green;
  } else if (karel.karel_color == "PINK") {
    karel_image = images.karel_pink;
  }

  return (
    <ImageBackground
      source={images.karel_view_bg} // Replace with the path to your image
      imageStyle={{ opacity: 0.2 }}
      style={{
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={{ justifyContent: "center" }}>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.btn}>Back</Text>
            </Pressable>
          </View>
          <Text style={styles.title}>Karel View</Text>
          <Text></Text>
        </View>

        <View style={styles.main}>
          <Text style={styles.subtitle}>{karel.name}</Text>
          <Image
            style={{ width: 200, height: 250 }}
            source={images.karel_basic}
          />
          <View style={styles.stats}>
            <Text>Happiness: {happinessBucket}</Text>
            <Text>Hunger: {hungerBucket}</Text>
            <Text>Hygiene: {hygieneBucket}</Text>
          </View>
          <View style={styles.gotchi_panel}>
            <Pressable
              onPress={() => {
                let hungerDelta = 5;
                let currHunger = parseInt(karel.hunger);
                if (currHunger >= 100) {
                  hungerDelta = 0;
                }
                updateKarelHunger(currHunger + hungerDelta);
              }}
            >
              <Text style={styles.btn}>Feed</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                let hygieneDelta = 5;
                let currHygiene = parseInt(karel.hygiene);
                if (currHygiene >= 100) {
                  hygieneDelta = 0;
                }
                updateKarelHygiene(currHygiene + hygieneDelta);
              }}
            >
              <Text style={styles.btn}>Clean</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                let happinessDelta = 5;
                let currHappiness = parseInt(karel.happiness);
                if (currHappiness >= 100) {
                  happinessDelta = 0;
                }
                updateKarelHappiness(currHappiness + happinessDelta);
              }}
            >
              <Text style={styles.btn}>Play</Text>
            </Pressable>
          </View>
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
    width: "100%",
  },
  main: {
    flex: 1,
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
  stats: {
    fontSize: 20,
    color: "black",
  },
});
