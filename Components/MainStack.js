import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TestHome from "./TestHome";
import TestLogin from "./TestLogin";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Define screens in the stack */}
        <Stack.Screen
          name="Login"
          component={TestLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TestHome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// ======================================================== Main Coding Here ==================================
// import React, { useState } from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
// import CustomDrawerContent from "./Components/CustomDrawerContent";
// import Login from "./Components/Login";
// import Signup from "./Components/Signup";
// import Home from "./Components/Home";
// import MediaPartner from "./Components/MediaPartner";
// import SendSMS from "./Components/SendSms";
// import Test from "./Components/Test";

// const Drawer = createDrawerNavigator();

// export default function App() {
//   const [isAuthenticate, setIsAuthenticate] = useState(false);
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         drawerContent={(props) => <CustomDrawerContent {...props} />}
//         screenOptions={{
//           drawerStyle: {
//             width: 250,
//           },
//         }}
//       >
//         <Drawer.Screen name="Home" options={{ headerShown: true }}>
//           {(props) => <Home {...props} isAuthenticate={isAuthenticate} />}
//         </Drawer.Screen>
//         <Drawer.Screen name="Login" options={{ headerShown: false }}>
//           {(props) => (
//             <Login {...props} setIsAuthenticate={setIsAuthenticate} />
//           )}
//         </Drawer.Screen>
//         <Drawer.Screen
//           name="Signup"
//           component={Signup}
//           options={{ headerShown: false }}
//         />
//         <Drawer.Screen
//           name="MediaPartner"
//           component={MediaPartner}
//           options={{ headerShown: true }}
//         />
//         <Drawer.Screen
//           name="SendSms"
//           component={SendSMS}
//           options={{ headerShown: true }}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }