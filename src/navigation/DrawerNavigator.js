import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import { COLORS } from '../constants/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
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
  );
};

export default DrawerNavigator;