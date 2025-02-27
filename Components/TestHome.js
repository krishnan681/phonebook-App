import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "./AuthContext";

const TestHome = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Welcome, {userData.businessname || userData.person}!</Text>
          <Button title="Logout" onPress={() => logout(navigation)} />
        </>
      ) : (
        <Text style={styles.notLoggedInText}>You are not logged in.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  notLoggedInText: {
    fontSize: 18,
    color: "#888",
  },
});

export default TestHome;
