import React, { useRef, useEffect } from "react";
import { Animated, TouchableOpacity, Easing } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/HomeScreen";

import { COLORS } from "../constants/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Smooth continuous breathing animation
const AnimatedIcon = ({ name, color, size, focused }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation;
    if (focused) {
      animation = Animated.loop(
        Animated.timing(progress, {
          toValue: 1,
          duration: 1500, // 2 seconds per full cycle
          easing: Easing.inOut(Easing.sin), // smooth sine-like easing
          useNativeDriver: true,
          isInteraction: false,
        })
      );
      animation.start();
    } else {
      progress.stopAnimation();
      progress.setValue(0);
    }

    return () => {
      if (animation) animation.stop();
    };
  }, [focused]);

  // Interpolate progress to scale smoothly 0.95 → 1.05 → 0.95
  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.95, 1.05, 0.95],
  });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Icon name={name} size={size} color={color} />
    </Animated.View>
  );
};

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.secondary,
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.inactiveItem,
        tabBarStyle: { backgroundColor: COLORS.primary, paddingBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Settings":
              iconName = focused ? "settings" : "settings-outline";
              break;
          }
          return <AnimatedIcon name={iconName} focused={focused} color={color} size={size} />;
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={1}>
            {props.children}
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
