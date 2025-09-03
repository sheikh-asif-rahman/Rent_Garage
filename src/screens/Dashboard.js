import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const buttonsData = [
  { id: "1", name: "home", label: "Home" },
  { id: "2", name: "person", label: "Profile" },
  { id: "3", name: "settings", label: "Settings" },
  { id: "4", name: "notifications", label: "Alerts" },
  { id: "5", name: "chatbubbles", label: "Chat" },
];

const sliderData = [
  { id: "1", image: "https://picsum.photos/400/200?random=1", title: "Text 1" },
  { id: "2", image: "https://picsum.photos/400/200?random=2", title: "Text 2" },
  { id: "3", image: "https://picsum.photos/400/200?random=3", title: "Text 3" },
];

const Dashboard = () => {
  const renderSlide = ({ item }) => (
    <TouchableOpacity style={styles.sliderWrapper} activeOpacity={0.8}>
      <ImageBackground source={{ uri: item.image }} style={styles.sliderImage}>
        <View style={styles.overlay} />
        <Text style={styles.sliderText}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* First Big Complex Container */}
      <View style={[styles.card, { width: width * 0.9 }]}>
        {/* Row 1: 5 Buttons */}
        <View style={styles.buttonRow}>
          {buttonsData.map((btn) => (
            <TouchableOpacity key={btn.id} style={styles.iconButton}>
              <View style={styles.circleIcon}>
                <Icon name={btn.name} size={28} color="#fff" />
              </View>
              <Text style={styles.iconText}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Row 2: Slider with image and text */}
        <FlatList
          data={sliderData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderSlide}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      </View>

      {/* Other 2 Empty Containers */}
      <View style={styles.card}>
        <Text style={styles.emptyText}>Empty Container 1</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.emptyText}>Empty Container 2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconButton: {
    alignItems: "center",
    flex: 1,
  },
  circleIcon: {
    backgroundColor: "#34affc",
    padding: 12,
    borderRadius: 50,
  },
  iconText: {
    marginTop: 6,
    fontSize: 13,
    color: "#333",
  },
  sliderWrapper: {
    width: width * 0.7,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
  },
  sliderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    padding: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 16,
  },
  sliderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
  },
});

export default Dashboard;
