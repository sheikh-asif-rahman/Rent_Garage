import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/ExploreScreen";
import Dashboard from "../screens/Dashboard"; // renamed component
import SettingsScreen from "../screens/Settings";

import { COLORS } from "../constants/colors";

const Stack = createNativeStackNavigator();
const { width } = Dimensions.get("window");

// ---------- Animated Icon ----------
const AnimatedIcon = ({ name, focused, size, color }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animation;
    if (focused) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 400,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    } else {
      scaleAnim.stopAnimation();
      scaleAnim.setValue(1);
    }

    return () => animation && animation.stop();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Icon name={name} size={size} color={color} />
    </Animated.View>
  );
};

// ---------- AppBar Component ----------
const AppBar = ({ title }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.appBarContainer,
        { paddingTop: insets.top, height: insets.top + 60 },
      ]}
    >
      <Text style={styles.appBarTitle}>{title}</Text>
      <TouchableOpacity style={styles.appBarIcon}>
        <Icon name="notifications-outline" size={24} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};

// ---------- Two-layer Floating Bottom Bar ----------
const CoolBottomBar = ({ tabs, activeIndex, onPress }) => {
  const insets = useSafeAreaInsets();
  const barHeight = 70;

  return (
    <View style={[styles.coolBarContainer, { bottom: insets.bottom }]}>
      {/* White background bar */}
      <View style={[styles.coolBarBackground, { height: barHeight }]} />

      {/* Tabs */}
      <View style={[styles.coolBarTabs, { height: barHeight }]}>
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity
              key={index}
              style={styles.coolTabButton}
              activeOpacity={1}
              onPress={() => onPress(index)}
            >
              {isActive && (
                <View
                  style={[
                    styles.activeTabPill,
                    { height: barHeight * 0.9, borderRadius: (barHeight * 0.9) / 2 },
                  ]}
                />
              )}
              <View style={styles.tabContent}>
                <AnimatedIcon
                  name={tab.iconName}
                  focused={isActive}
                  color={isActive ? COLORS.secondary : COLORS.inactiveItem}
                  size={24}
                />
                <Text
                  style={{
                    color: isActive ? COLORS.secondary : COLORS.inactiveItem,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  {tab.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ---------- Main Scaffold ----------
const Scaffold = ({ tabs, screens, appBarTitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <AppBar title={appBarTitle} />
      <View style={{ flex: 1 }}>{screens[activeIndex]}</View>
      <CoolBottomBar tabs={tabs} activeIndex={activeIndex} onPress={setActiveIndex} />
    </View>
  );
};

// ---------- App Navigator ----------
export default function AppNavigator() {
  const tabs = [
    { title: "Explore", iconName: "search" },
    { title: "Dashboard", iconName: "home" }, // updated title
    { title: "Settings", iconName: "settings" },
  ];

  const screens = [
    <HomeScreen key="home" />,
    <Dashboard key="dashboard" />, // updated component
    <SettingsScreen key="settings" />,
  ];

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Main"
            options={{}}
            children={() => <Scaffold tabs={tabs} screens={screens} appBarTitle="My App" />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  appBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  appBarIcon: {
    padding: 5,
  },

  // Bottom Bar Styles
  coolBarContainer: {
    position: "absolute",
    width: width,
    alignItems: "center",
    zIndex: 10,
  },
  coolBarBackground: {
    position: "absolute",
    bottom: 0,
    width: width * 0.95,
    height: 70,
    backgroundColor: "#fff", // bottom layer
    borderRadius: 35,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  coolBarTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.95,
    paddingVertical: 10,
  },
  coolTabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabPill: {
    position: "absolute",
    width: 115,
    borderRadius: (70 * 0.9) / 2,
    backgroundColor: COLORS.primary,
    zIndex: -1,
  },

  tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
