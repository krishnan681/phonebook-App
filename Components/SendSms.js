import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const SendSms = () => {
  const { user, userData } = useContext(AuthContext);
  // const [userData, setUserData] = useState("");
  const [pincodeInput, setPincodeInput] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [clrBtn, setClrBtn] = useState(false);
  const [datas, setData] = useState([]);
  const [showresults, setShowresults] = useState(false);
  const [noRecord, setNoRecord] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const maxLength = 290;
  const batchSize = 10;
  const selectedNumbers = selectedBusinesses.slice(0, batchSize).map((client) => client.mobileno);
  const [customMessage, setCustomMessage] = useState(
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me. (Sent Thro Signpost PHONE BOOK)"
  );

  const [prefix, setPrefix] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedBusinesses([]);
    } else {
      setSelectedBusinesses([...datas]); // Use the reference directly
    }
    setSelectAll(!selectAll);
  };
  
  

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch_for_new_database.php"
      );
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse.sort((a, b) => b.id - a.id));
      } else {
        Alert.alert("Unexpected response from server.");
      }
    } catch (error) {
      Alert.alert("Failed to load data: " + error.message);
    }
  };

  useEffect(() => {
    if (!pincodeInput && !prefix) {
      fetchData(); // Fetch all data only if no filters are applied
    }
  }, [pincodeInput, prefix]);
  

  const fetchBusinesses = () => {
    if (!pincodeInput || !prefix) {
      Alert.alert("Please enter a valid pincode and select a prefix.");
      return;
    }
  
    setLoading(true);
    axios
      .get(
        `https://signpostphonebook.in/get_details_based_on_prefix_pincode.php?pincode=${pincodeInput}&prefix=${prefix}`
      )
      .then((response) => {
        if (response.data?.[0] === "No records found.") {
          setNoRecord(true);
          setClrBtn(true);
          setData([]);
          setShowresults(false);
        } else {
          setData(response.data); // Keep only filtered data
          setClrBtn(true);
          setShowresults(true);
        }
      })
      .catch((error) => console.error("Error fetching businesses:", error))
      .finally(() => setLoading(false));
  };
  

  const handleCheckboxChange = useCallback((item) => {
    setSelectedBusinesses((prevSelected) => {
      const isSelected = prevSelected.some((i) => i.id === item.id);
      return isSelected
        ? prevSelected.filter((i) => i.id !== item.id) // Remove if selected
        : [...prevSelected, item]; // Add if not selected
    });
  }, []);
  

  const clearItems = () => {
    setPincodeInput("");
    setPrefix("");
    setSelectedPrefix(null);
    setData([]); // Clear data instead of reloading all records
    setSelectAll(false);
    setSelectedBusinesses([]);
    setClrBtn(false);
    setShowresults(false);
    setNoRecord(false);
  };
  
  

  const sendBatchSMS = () => {
    if (selectedBusinesses.length === 0) {
      Alert.alert("No clients selected!");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];

    const postData = {
      user_name: userData.bussinessname || userData.person || "Unknown",
      date: currentDate,
      pincode: pincodeInput.trim(),
      product: "",
      promotion_from: "Nearby Promotion",
      selected_count: selectedBusinesses.length,
    };

    axios
      .post(
        "https://signpostphonebook.in/promotion_app/promotion_appliaction.php",
        postData
      )
      .then((response) => {
        console.log(response.data.Message);
      })
      .catch((error) => console.error("Error sending data:", error));

    const selectedNumbers = selectedBusinesses.map((client) => client.mobileno);
    const recipients = selectedNumbers.join(",");
    const smsUri = `sms:${recipients}?body=${encodeURIComponent(
      customMessage
    )}`;

    // Open SMS app
    Linking.openURL(smsUri).then(() => {
      // Clear all after sending
      setPincodeInput("");
      setPrefix("");
      setSelectedPrefix(null);
      setSelectedBusinesses([]);
      setSelectAll(false);
      setCustomMessage(
        "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me. (Sent Thro Signpost PHONE BOOK)"
      );
      setClrBtn(false);
      setShowresults(false);
      setNoRecord(false);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>NEARBY PROMOTION</Text>
      <Text style={styles.instructions}>
        Send Text messages to Mobile Users in desired Pincode Area.{"\n"}
        1. Edit/Create message. Max: 290 characters.{"\n"}
        2. Select type of Recipient (Males/Females/Business).{"\n"}
        3. Type Pincode.{"\n"}
        4. Send in batches of 10.
      </Text>

      <Text style={styles.label}>Edit / Create Message:</Text>
      <TextInput
        style={styles.textInput}
        multiline
        value={customMessage}
        onChangeText={setCustomMessage}
        maxLength={maxLength}
      />
      <Text>
        {maxLength - customMessage.length} / {maxLength}
      </Text>

      <Text style={styles.label}>Select Recipients Type:</Text>
      <View style={styles.recipientContainer}>
        {["Mr.", "Ms.", "M/s."].map((item) => (
          <TouchableOpacity key={item} onPress={() => setPrefix(item)}>
            <Text style={styles.radioText}>
              {prefix === item ? "🔘" : "⚪"} {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Select All Recipients:</Text>
      <TouchableOpacity onPress={handleSelectAllChange}>
        <Text style={styles.radioText}>
          {selectAll ? "🔘" : "⚪"} Select All
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={sendBatchSMS} style={styles.sendButton}>
        <Text style={styles.buttonText}>Send SMS</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Enter Pincode:</Text>
      <TextInput
        style={styles.pincodeInput}
        keyboardType="numeric"
        maxLength={6}
        value={pincodeInput}
        onChangeText={setPincodeInput}
      />

      <TouchableOpacity
        onPress={clrBtn ? clearItems : fetchBusinesses}
        style={styles.searchButton}
      >
        <Text style={styles.buttonText}>{clrBtn ? "Clear" : "Search"}</Text>
      </TouchableOpacity>

      {showresults && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            <Text style={styles.boldText}>Results Displayed:</Text>{" "}
            {datas.length}
          </Text>
          <Text style={styles.resultText}>
            <Text style={styles.boldText}>Selected:</Text>{" "}
            {selectedBusinesses.length}
          </Text>
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="blue" />}

      {showresults && datas?.length > 0 && (
        <ScrollView style={styles.resultList} nestedScrollEnabled={true}>
          {datas.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleCheckboxChange(item)}
              style={[
                styles.resultItem,
                selectedBusinesses.includes(item) && styles.selectedItem,
              ]}
            >
              <Text
                style={[
                  styles.resultItemText,
                  selectedBusinesses.includes(item) && styles.selectedItemText,
                ]}
              >
                {selectedBusinesses.includes(item) ? "✔" : "○"}{" "}
                {item.businessname || item.person} -{" "}
                {item.mobileno.slice(0, -5)}xxxxx
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity onPress={sendBatchSMS} style={styles.sendButton}>
        <Text style={styles.buttonText}>Send SMS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6a0dad",
    textAlign: "center",
  },
  instructions: {
    marginTop: 10,
    lineHeight: 30,
    fontSize: 16,
    textAlign: "justify",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 25,
  },
  recipientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginTop: 10,
  },
  radioText:{
    fontSize: 16
  },
  sendButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  searchButton:
  { backgroundColor: "blue",
    padding: 10,
    borderRadius: 5
  },
  buttonText:
  { color: "white",
    textAlign: "center"
  },
  pincodeInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginTop: 10,
  },
  resultText:
  { fontSize: 16,
    color: "#333"
  },
  boldText:{
    fontWeight: "bold"
  },
  resultList:{
    maxHeight: 300
  },
  resultItem: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selectedItem:{
    backgroundColor: "#4CAF50"
  },
  resultItemText:
  { fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  selectedItemText:{
    color: "#fff"
  },

});

export default SendSms;
