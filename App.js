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

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawerContent from "./Components/CustomDrawerContent";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import MediaPartner from "./Components/MediaPartner";
import SendSMS from "./Components/SendSms";
import Test from "./Components/Test";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            width: 250,
          },
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="MediaPartner" component={MediaPartner} />
        <Drawer.Screen name="SendSms" component={SendSMS} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
