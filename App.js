// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import Login from "./Components/Login";
// import Signup from "./Components/Signup";
// import Home from "./Components/Home";
// import MediaPartner from "./Components/MediaPartner";
// import SendSMS from "./Components/SendSms";

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="MediaPartner" component={MediaPartner} />
//         <Stack.Screen name="SendSms" component={SendSMS} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// =================== Drawer Section ====================
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import CustomDrawerContent from './Components/CustomDrawerContent';
// import Login from "./Components/Login";
// import Signup from "./Components/Signup";
// import Home from "./Components/Home";
// import MediaPartner from "./Components/MediaPartner";
// import SendSMS from "./Components/SendSms";

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         drawerContent={(props) => <CustomDrawerContent {...props} />}
//         initialParams={{ businessname: route.params.businessname }}
//         screenOptions={{
//           headerShown: true,
//           drawerStyle: {
//             width: 250,
//           },
//         }}
//       >
//         <Drawer.Screen name="Home" component={Home} />
//         <Drawer.Screen name="Login" component={Login} />
//         <Drawer.Screen name="Signup" component={Signup} />
//         <Drawer.Screen name="MediaPartner" component={MediaPartner} />
//         <Drawer.Screen name="SendSms" component={SendSMS} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// =================== Updated Drawer Section =============================================================
import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawerContent from "./Components/CustomDrawerContent";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import MediaPartner from "./Components/MediaPartner";
import SendSMS from "./Components/SendSms";
import AdminPage from "./Components/Admin/AdminPage";
import { AuthProvider } from "./Components/AuthContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              width: 250,
            },
          }}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{ headerShown: true }}
          />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="MediaPartner"
            component={MediaPartner}
            options={{ headerShown: true }}
          />
          <Drawer.Screen
            name="NearbyPromotion"
            component={SendSMS}
            options={{ headerShown: true }}
          />
          <Drawer.Screen
            name="AdminPage" // Add AdminPage screen to the drawer
            component={AdminPage}
            options={{ headerShown: true }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

// ================================== updated App ===================================
// App.js
// import React from "react";
// import { AuthProvider } from "./Components/AuthContext";
// import MainStack from "./Components/MainStack"; // Assuming your main navigation stack

// export default function App() {
//   return (
//     <AuthProvider>
//       <MainStack />
//     </AuthProvider>
//   );
// }
