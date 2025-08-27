import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      {/* Row 1 */}
      <View style={[styles.card, { backgroundColor: "#FFCDD2" }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rowContent}
          onPress={() => alert("Profile Clicked")}
        >
          <Icon name="person-outline" size={22} color="#333" />
          <Text style={styles.rowText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Row 2 */}
      <View style={[styles.card, { backgroundColor: "#C8E6C9" }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rowContent}
          onPress={() => alert("Notifications Clicked")}
        >
          <Icon name="notifications-outline" size={22} color="#333" />
          <Text style={styles.rowText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Row 3 */}
      <View style={[styles.card, { backgroundColor: "#BBDEFB" }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rowContent}
          onPress={() => alert("Settings Clicked")}
        >
          <Icon name="settings-outline" size={22} color="#333" />
          <Text style={styles.rowText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Row 4 */}
      <View style={[styles.card, { backgroundColor: "#FFE082" }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rowContent}
          onPress={() => alert("Logout Clicked")}
        >
          <Icon name="log-out-outline" size={22} color="red" />
          <Text style={[styles.rowText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16, // note: number, not string
  },
  // Outer wrapper that owns the rounded corners + clipping + shadow
  card: {
    borderRadius: 14,
    overflow: "hidden", // ensures perfect rounded corners
    marginBottom: 12,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // Shadow (Android)
    elevation: 3,
  },
  // Inner pressable area
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  rowText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
    fontWeight: "500",
  },
});
