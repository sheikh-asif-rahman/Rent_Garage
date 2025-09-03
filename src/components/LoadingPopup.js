import React from "react";
import {
  View,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";

export default function LoadingPopup({ visible, message = "Wait" }) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}
    >
      {/* Dark overlay */}
      <View style={styles.overlay}>
        {/* Floating container */}
        <View style={styles.popup}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // dark semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    width: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});
