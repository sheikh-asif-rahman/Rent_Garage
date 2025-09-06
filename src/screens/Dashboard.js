import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  ActivityIndicator,
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

const Dashboard = () => {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example API call
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=3")
      .then((res) => res.json())
      .then((data) => {
        // Map API data to match slider structure
        const mappedData = data.map((item) => ({
          id: item.id.toString(),
          image: item.url,
          title: item.title,
        }));
        // Append Add card at the end
        setSliderData([...mappedData, { id: "add", type: "add" }]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const renderSlide = ({ item }) => {
    if (item.type === "add") {
      return (
        <TouchableOpacity
          style={[styles.sliderWrapper, styles.addCard]}
          activeOpacity={0.8}
          onPress={() => console.log("Add card clicked")}
        >
          <Icon name="add" size={40} color="#fff" />
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.sliderWrapper} activeOpacity={0.8}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.sliderImage}
          imageStyle={{ borderRadius: 16 }}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Text style={styles.sliderText}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* First Big Container */}
      <View style={[styles.card, { width: width * 0.9 }]}>
        {/* Row 1: Buttons */}
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

        {/* Row 2: Slider */}
        {loading ? (
          <ActivityIndicator size="large" color="#34affc" style={{ marginVertical: 20 }} />
        ) : (
          <FlatList
            data={sliderData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderSlide}
            contentContainerStyle={{ paddingVertical: 16 }}
          />
        )}
      </View>

      {/* Other Empty Containers */}
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
    flex: 1,
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
  addCard: {
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
  },
});

export default Dashboard;
