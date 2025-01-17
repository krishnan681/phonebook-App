import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "./AuthContext";

export default function CustomDrawerContent(props) {
  const { user, logout } = useContext(AuthContext);

  // List of allowed mobile numbers for the Admin page
  const allowedAdminNumbers = ["6383965890", "9843657564","8344508070"]; // Add your admin mobile numbers here

  // Normalize and check if the logged-in user is an admin
  const isAdmin = allowedAdminNumbers.includes(user.mobileno?.trim());

  const handleMediaPartner = () => {
    if (user === "") {
      Alert.alert("Login Required");
      props.navigation.navigate("Login");
    } else {
      props.navigation.navigate("MediaPartner");
    }
  };

  const handleAdminPage = () => {
    if (user === "") {
      Alert.alert("Login Required");
      props.navigation.navigate("Login");
    } else if (!isAdmin) {
      Alert.alert("Access Denied", "You do not have permission to access the Admin page.");
    } else {
      props.navigation.navigate("AdminPage");
    }
  };

  const handleSendSms = () => {
    if (user === "") {
      Alert.alert("Login Required");
      props.navigation.navigate("Login");
    } else {
      props.navigation.navigate("NearbyPromotion");
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.brand}>Welcome {user.username || "Guest"}</Text>
      </View>

      <View style={styles.menu}>
        <DrawerItem
          label="Home"
          icon={() => <Icon name="home-outline" size={20} color="#fff" />}
          onPress={() => props.navigation.navigate("Home")}
          labelStyle={styles.label}
        />
        <DrawerItem
          label="Media Partner"
          icon={() => <Icon name="book-outline" size={20} color="#f5365c" />}
          onPress={handleMediaPartner}
          labelStyle={styles.label}
        />
        <DrawerItem
          label="Nearby Promotion"
          icon={() => (
            <Icon name="document-text-outline" size={20} color="#5e72e4" />
          )}
          onPress={handleSendSms}
          labelStyle={styles.label}
        />
        <DrawerItem
          label="Profile"
          icon={() => <Icon name="person-outline" size={20} color="#f5365c" />}
          onPress={() => alert("Update Will Come Soon!")}
          labelStyle={styles.label}
        />
        {/* Conditionally render the Admin menu item */}
        {isAdmin && (
          <DrawerItem
            label="Admin"
            icon={() => <Icon name="person" size={20} color="#f5365c" />}
            onPress={handleAdminPage}
            labelStyle={styles.label}
          />
        )}
        <DrawerItem
          label="Account"
          icon={() => (
            <Icon name="settings-outline" size={20} color="#11cdef" />
          )}
          onPress={() => alert("Update Will Come Soon!")}
          labelStyle={styles.label}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Documentation</Text>
        <DrawerItem
          label="Getting Started"
          icon={() => <Icon name="rocket-outline" size={20} color="#fff" />}
          onPress={() => alert("Update Will Come Soon")}
          labelStyle={styles.footerLabel}
        />
        <DrawerItem
          label="Logout"
          icon={() => <Icon name="log-out-outline" size={20} color="#f5365c" />}
          onPress={() => logout(props.navigation)}
          labelStyle={styles.footerLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6a0dad",
  },
  brand: {
    marginLeft: 10,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  menu: {
    flex: 1,
    backgroundColor: "#3b0c5c",
    paddingVertical: 10,
  },
  label: {
    color: "#fff",
    marginLeft: -20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#fff",
    paddingVertical: 10,
    backgroundColor: "#3b0c5c",
  },
  footerTitle: {
    color: "#8898aa",
    marginLeft: 20,
    marginVertical: 5,
  },
  footerLabel: {
    color: "#fff",
    marginLeft: -20,
  },
});
