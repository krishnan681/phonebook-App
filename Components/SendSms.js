// ============================================= with dropdown and Picode search with icon =====================
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Linking,
  TextInput,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

const SendSms = () => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [customMessage, setCustomMessage] = useState("");
  const [prefixes, setPrefixes] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const [loading, setLoading] = useState(false);

  const templates = {
    template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
    On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
    WWW.signpostphonebook.in`,

    template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
    WWW.signpostphonebook.in`,
  };

  // Fetch prefixes on component mount
  useEffect(() => {
    axios
      .get("https://signpostphonebook.in/client_get_prefix.php")
      .then((response) => setPrefixes(response.data))
      .catch((error) => console.error("Error fetching prefixes:", error));
  }, []);

  const fetchBusinesses = () => {
    if (!pincodeInput || !selectedPrefix) {
      Alert.alert("Please enter a valid pincode and select a prefix.");
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://signpostphonebook.in/sms_client_details.php?pincode=${pincodeInput}&prefix=${selectedPrefix}`
      )
      .then((response) => setBusinesses(response.data))
      .catch((error) => console.error("Error fetching businesses:", error))
      .finally(() => setLoading(false));
  };

  const toggleSelectBusiness = (business) => {
    const isSelected = selectedBusinesses.some(
      (b) => b.mobileno === business.mobileno
    );
    if (isSelected) {
      setSelectedBusinesses((prev) =>
        prev.filter((b) => b.mobileno !== business.mobileno)
      );
    } else {
      setSelectedBusinesses((prev) => [...prev, business]);
    }
  };

  const sendBatchSMS = () => {
    if (selectedBusinesses.length === 0) {
      Alert.alert("Please select at least one business!");
      return;
    }

    let index = 0;

    const sendNextSMS = () => {
      if (index >= selectedBusinesses.length) {
        Alert.alert("All messages have been sent!");
        return;
      }

      const { prefix, businessname, mobileno } = selectedBusinesses[index];
      const personalizedMessage = customMessage.replace(
        "{name}",
        `${prefix} ${businessname}`
      );
      const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
        personalizedMessage
      )}`;

      Linking.openURL(smsUrl).catch(() =>
        Alert.alert("Error", `Could not open SMS application for ${mobileno}.`)
      );

      index++;
      setTimeout(sendNextSMS, 5000);
    };

    sendNextSMS();
  };

  return (
    <View style={styles.container}>
      <Text>Select Prefix</Text>
      <View style={styles.prefixContainer}>
        {prefixes.map((prefix, index) => (
          <TouchableOpacity
            key={prefix.name}
            onPress={() => setSelectedPrefix(prefix.name)}
          >
            <Ionicons
              name="person-circle"
              size={40}
              color={selectedPrefix === prefix.name ? "#008000" : "#007bff"}
              style={styles.icon}
            />
            <Text style={styles.prefixLabel}>{prefix.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.pincodeInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Pincode"
          maxLength={6}
          value={pincodeInput}
          onChangeText={setPincodeInput}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchBusinesses}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedTemplate(value);
          setCustomMessage(templates[value]);
        }}
        items={[
          { label: "Template 1", value: "template1" },
          { label: "Template 2", value: "template2" },
        ]}
        placeholder={{ label: "Select Template", value: null }}
      />

      <TextInput
        style={styles.textArea}
        value={customMessage}
        onChangeText={(text) => setCustomMessage(text)}
        multiline
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={businesses}
          keyExtractor={(item) => item.mobileno}
          renderItem={({ item }) => {
            const isSelected = selectedBusinesses.some(
              (b) => b.mobileno === item.mobileno
            );

            return (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Text>
                    {item.prefix} {item.businessname}
                  </Text>
                  <Text>{item.mobileno}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleSelectBusiness(item)}>
                  <Ionicons
                    name={isSelected ? "checkmark-circle" : "add-circle"}
                    size={30}
                    color={isSelected ? "#3b8132" : "#007bff"}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      {selectedBusinesses.length > 0 && (
        <Text style={styles.selectedMessage}>
          Selected Businesses: {selectedBusinesses.length}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={sendBatchSMS}>
        <Text style={styles.buttonText}>Send SMS to Selected</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  prefixContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  icon: { marginBottom: 5 },
  prefixLabel: { textAlign: "center", fontSize: 12, color: "#333" },
  pincodeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    padding: 15,
    marginLeft: 10,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  cardContent: { flex: 1 },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  selectedMessage: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

export default SendSms;
