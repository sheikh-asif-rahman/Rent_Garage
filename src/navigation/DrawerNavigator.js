import React from 'react';
import { StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import { COLORS } from '../constants/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <SafeAreaProvider>
      {/* Status bar setup only */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      <Drawer.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.headerText,
          drawerActiveTintColor: COLORS.activeItem,
          drawerInactiveTintColor: COLORS.inactiveItem,
          drawerStyle: { backgroundColor: COLORS.drawerBackground },
        }}
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Test" component={DashboardScreen} />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};

export default DrawerNavigator;
