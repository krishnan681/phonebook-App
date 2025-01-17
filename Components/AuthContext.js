import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const login = async (username, password, navigation) => {
    if (!username) {
      Alert.alert("Error", "Please enter your mobile number.");
      return;
    }

    if (password !== "Signpost") {
      Alert.alert("Invalid Password", "Please enter the correct password.");
      return;
    }

    try {
      const response = await axios.post(
        "https://signpostphonebook.in/client_login.php",
        { mobileno: username }
      );

      if (response.data.valid) {
        setUser({
          username: response.data.businessname,
          mobileno: username, 

        });
        navigation.navigate("Home");
      } else {
        Alert.alert("User not found", "Please sign up.");
        navigation.navigate("Signup");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to login. Please try again later.");
    }
  };

  const logout = (navigation) => {
    setUser(""); // Reset user state to an empty string
    navigation.navigate("Login"); // Redirect to Login screen
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


