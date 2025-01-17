import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons
import Dashboard from './Dashboard';  // Import your existing Dashboard component
import Datas from './Datas';  // Import your existing Datas component
import TotalEntries from './TotalEntries';  // Import your existing TotalEntries component
import TotalCount from './TotalCount';  // Import your existing TotalCount component
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const Tab = createBottomTabNavigator();

export default function AdminPage() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Datas" 
        component={Datas} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Total Entries by day" 
        component={TotalEntries} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Total Counts - Full" 
        component={TotalCount} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="clipboard-list" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}
