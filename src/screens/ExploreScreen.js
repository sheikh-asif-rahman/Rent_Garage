import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Keyboard,
  Animated,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/colors";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2;
const CARD_MARGIN = 6;
const CARD_WIDTH = (width - CARD_MARGIN * (COLUMN_COUNT * 2)) / COLUMN_COUNT;

export default function ExploreScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Bouncing location icon
  const bounceValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, { toValue: -5, duration: 300, useNativeDriver: true }),
        Animated.timing(bounceValue, { toValue: 0, duration: 300, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleSearch = () => {
    Keyboard.dismiss();
    console.log("Search:", searchQuery);
  };

  const handleLocationPress = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("MapScreen"); // MapScreen should exist in your navigator
    } else {
      console.log("Navigate pressed!");
    }
  };

  // Sample staggered data
  const data = [
    { id: "1", title: "Car 1", image: "https://picsum.photos/200/300" },
    { id: "2", title: "Car 2", image: "https://picsum.photos/200/250" },
    { id: "3", title: "Car 3", image: "https://picsum.photos/200/350" },
    { id: "4", title: "Car 4", image: "https://picsum.photos/200/270" },
    { id: "5", title: "Car 5", image: "https://picsum.photos/200/320" },
    { id: "6", title: "Car 6", image: "https://picsum.photos/200/310" },
  ].map((item) => ({
    ...item,
    height: Math.floor(Math.random() * 100 + 200),
  }));

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search cars..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Icon name="search" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Current Location with bouncing icon and underline */}
      <TouchableOpacity
        style={styles.locationContainer}
        onPress={handleLocationPress}
        activeOpacity={0.8}
      >
        <Text style={styles.locationText}>Current Location: Dhaka, Bangladesh</Text>
        <Animated.View style={{ transform: [{ translateY: bounceValue }] }}>
          <Icon name="location-sharp" size={20} color={COLORS.primary} />
        </Animated.View>
      </TouchableOpacity>

      {/* 2-column staggered grid */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: CARD_MARGIN }}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: CARD_WIDTH,
              margin: CARD_MARGIN,
              marginTop: index % 2 === 0 ? CARD_MARGIN : CARD_MARGIN * 3,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: item.height, borderRadius: 10 }}
            />
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.textDark, paddingVertical: 8 },
  searchIcon: { padding: 6 },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 6,
  },
  locationText: { fontSize: 12, color: COLORS.textMuted },
  itemText: { fontSize: 14, fontWeight: "600", color: COLORS.textDark, marginTop: 6, marginBottom: 10 },
});
