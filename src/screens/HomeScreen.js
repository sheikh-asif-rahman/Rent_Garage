import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8F9FA",
      }}
    >
      {/* Row 1: Location Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#c9c9c9ff",
          padding: 7,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: "#000000",
            fontWeight: "800",
          }}
        >
          📍 Current Location
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#000000ff",
            padding: 5,
            borderRadius: 100,
          }}
        >
          <Icon name="refresh" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Row 2: Colorful Container */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#FF6B6B",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "600" }}>
          Row 2 Content
        </Text>
      </View>

      {/* Row 3: Colorful Container */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#4ECDC4",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "600" }}>
          Row 3 Content
        </Text>
      </View>
    </View>
  );
}
