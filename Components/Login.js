import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

const Login = ({ navigation }) => {
  const [mobileno, setMobileno] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobileno) {
      Alert.alert("Error", "Please enter your mobile number.");
      return;
    }

    if (password !== "Signpost") {
      Alert.alert("Invalid Password", "Please enter the correct password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://signpostphonebook.in/client_login.php",
        { mobileno }
      );

      setLoading(false);

      if (response.data.valid) {
        // Navigate to Home and pass the businessname
        navigation.navigate("Home", {
          businessname: response.data.businessname || "Guest",
        });
        setMobileno("");
        setPassword("");
      } else {
        Alert.alert("User not found", "Please sign up.");
        navigation.navigate("Signup");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Unable to login. Please try again later.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signpost Phone Book</Text>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={24} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
          maxLength={10}
          value={mobileno}
          onChangeText={setMobileno}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          placeholderTextColor="#999"
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>
          Note: Your Password is Signpost
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
        {/* <Text style={styles.loginText}>LOGIN</Text> */}
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9", // light background
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6a0dad",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  forgotPassword: {
    color: "#888",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#6a0dad", // purple color
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signupText: {
    color: "#888",
  },
  signupLink: {
    color: "#6a0dad", // purple link color
    fontWeight: "bold",
  },
});

export default Login;
