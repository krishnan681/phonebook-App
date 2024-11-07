import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TextInput,
  Linking,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const HomePage = ({ route, navigation }) => {
  const businessname = route?.params?.businessname || "Guest";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firmName, setFirmName] = useState("");
  const [productName, setProductName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch.php"
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log("Fetched Data:", jsonResponse);

      if (Array.isArray(jsonResponse)) {
        const sortedData = jsonResponse.sort((a, b) => b.id - a.id);
        setData(sortedData);
      } else {
        Alert.alert("Error", "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      Alert.alert("Error", "Failed to load data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFirmData = async (name) => {
    if (!name) {
      return;
    }
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_byname.php?businessname=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse);
      } else {
        Alert.alert("Error", "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      Alert.alert("Error", "Failed to load firm data: " + error.message);
    }
  };

  const fetchProductData = async (name) => {
    if (!name) {
      return;
    }
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_product.php?product=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse);
      } else {
        Alert.alert("Error", "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      Alert.alert("Error", "Failed to load product data: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (firmName) {
      fetchFirmData(firmName);
    } else {
      fetchData(); // Reset to original data if input is cleared
    }
  }, [firmName]);

  useEffect(() => {
    if (productName) {
      fetchProductData(productName);
    } else {
      fetchData(); // Reset to original data if input is cleared
    }
  }, [productName]);

  const renderItem = ({ item }) => {
    const openModal = () => {
      if (selectedItem === item.id) {
        setSelectedItem(""); // Collapse the card if it's already open
      } else {
        setSelectedItem(item.id); // Set the selected card to fetch details
        setModalVisible(true);
      }
    };

    const closeModal = () => {
      setModalVisible(false);
    };
    const maskedMobile = `${item.mobileno.slice(0, 5)}xxxxx`;
    const dialedNumber = item.mobileno;

    const OpenDialpad = () => {
      let phoneUrl = `tel:${dialedNumber}`;
      Linking.canOpenURL(phoneUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(phoneUrl);
          } else {
            Alert.alert("Error", "Dial pad is not supported on this device.");
          }
        })
        .catch((err) => console.error("An error occurred", err));
    };
    return (
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.businessName}>{item.businessname}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#000000" />
            <Text style={styles.locationText}>
              {item.city}, {item.pincode}
            </Text>
          </View>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.mobile}>{maskedMobile}</Text>
          <View style={styles.buttonContainer}>
            {/* Dial Button */}
            <TouchableOpacity style={styles.button} onPress={OpenDialpad}>
              <Ionicons name="call-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Dial</Text>
            </TouchableOpacity>

            {/* More Button */}
            <TouchableOpacity style={styles.button} onPress={openModal}>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={20}
                color="#fff"
              />
              <Text style={styles.buttonText}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
        {selectedItem === item.id && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.Modelcard}>
                <View style={styles.rightSection}>
                  <Text style={styles.Modelname}>{item.businessname}</Text>
                  <Text style={styles.Modeldesignation}>{item.product}</Text>
                  <Text style={styles.Modelinfo}>
                    <Ionicons name="call-outline" size={16} />
                    {item.mobileno}
                  </Text>
                  <Text style={styles.Modelinfo}>
                    <Ionicons name="location-outline" size={16} />
                    {item.doorno}, {item.city}, {item.pincode}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.ModelcloseButton}
                onPress={closeModal}
              >
                <Text style={styles.ModelcloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="royalblue" style={styles.loader} />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>{businessname}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="search" size={24} color="#6a0dad" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Firm/Person"
            value={firmName}
            onPress={() => setProductName("")}
            onChangeText={setFirmName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="search" size={24} color="#6a0dad" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Product"
            value={productName}
            onPress={() => setFirmName("")}
            onChangeText={setProductName}
          />
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    margin: 10,
  },
  infoContainer: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#6a0dad",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 4,
  },
  contactContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 12,
  },
  mobile: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6a0dad",
    borderRadius: 5,
    padding: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
  },
  welcome: {
    alignSelf: "center",
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: "#6a0dad",
    borderWidth: 1,
    paddingLeft: 40,
    borderRadius: 5,
    flex: 1,
  },
  icon: {
    position: "absolute",
    left: 10,
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1, // Ensure it's on top of other components
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  Modelcard: {
    width: 300,
    height: 180,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
  },
  rightSection: {
    paddingLeft: 15,
    justifyContent: "center",
    width: "65%",
  },
  Modelname: {
    fontSize: 16,
    fontWeight: "bold",
  },
  Modeldesignation: {
    fontSize: 14,
    color: "#555",
  },
  Modelinfo: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
  ModelcloseButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#00D9D5",
    borderRadius: 5,
  },
  ModelcloseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomePage;
