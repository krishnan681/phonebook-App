import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { RadioButton } from "react-native-paper";

const MediaPartner = ({ navigation }) => {
  const [mybusinessname, setBusinessname] = useState("");
  const [mydoorno, setDoorno] = useState("");
  const [mycity, setCity] = useState("");
  const [mypincode, setPincode] = useState("");
  const [myproduct, setProduct] = useState("");
  const [mylandLine, setLandLine] = useState("");
  const [myLcode, setLcode] = useState("");
  const [myemail, setEmail] = useState("");
  const [myprefix, setPrefix] = useState("");
  const [mymobileno, setMobileno] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const resetForm = () => {
    setBusinessname("");
    setDoorno("");
    setCity("");
    setPincode("");
    setProduct("");
    setLandLine("");
    setLcode("");
    setEmail("");
    setPrefix("");
    setMobileno("");
    setIsRegistered(false);
  };

  // Check if the mobile number is registered
  const checkMobileNumber = async (mobile) => {
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_insert.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileno: mobile }),
        }
      );
      const result = await response.json();
      console.log("Check Mobile Response:", result);

      if (result.registered) {
        setIsRegistered(true);
        Alert.alert(
          "Mobile Number Exists",
          "This mobile number is already registered."
        );
        setMobileno("");
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error("Error checking mobile:", error);
      Alert.alert("Error", "Unable to verify mobile number.");
    }
  };

  // Insert new record if the mobile number is not registered
  const insertRecord = async () => {
    //validation mobilnumber
    if (!mymobileno.trim() && !mybusinessname.trim()) {
      Alert.alert("Validation Error", "Enter Details on Required field.");
      return;
    }
    if (isRegistered) {
      Alert.alert("Error", "Mobile number is already registered.");
      return;
    }

    const Data = {
      businessname: mybusinessname,
      doorno: mydoorno,
      city: mycity,
      pincode: mypincode,
      prefix: myprefix,
      mobileno: mymobileno,
      email: myemail,
      product: myproduct,
      landline: mylandLine,
      lcode: myLcode,
    };

    console.log("Sending Data:", Data);

    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_insert.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );

      const jsonResponse = await response.json();
      console.log("Server Response:", jsonResponse);

      if (jsonResponse.Message) {
        Alert.alert("Success", jsonResponse.Message);
        resetForm();
      } else {
        Alert.alert("Error", "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Media Partner</Text>
      <View style={styles.formContainer}>
        <ScrollView>
          <Text style={styles.label}>*Mobile Number :</Text>
          <TextInput
            placeholder="Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
            value={mymobileno}
            onChangeText={(text) => setMobileno(text)}
            onEndEditing={() => checkMobileNumber(mymobileno)}
          />

          <Text style={styles.label}>*Name / Business Name :</Text>
          <TextInput
            placeholder="Name/Business Name"
            style={styles.input}
            value={mybusinessname}
            onChangeText={(text) => setBusinessname(text)}
          />

          <View style={styles.prefixcontainer}>
            <Text style={styles.label}>*Prefix:</Text>
            <RadioButton.Group
              onValueChange={(value) => setPrefix(value)}
              value={myprefix}
            >
              <View style={styles.radioContainer}>
                <View style={styles.radioOption}>
                  <RadioButton value="Mr." />
                  <Text>Mr.</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton value="Ms." />
                  <Text>Ms.</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton value="M/s." />
                  <Text>M/s.(for Firms)</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <Text style={styles.label}>*Address :</Text>
          <TextInput
            placeholder="Address"
            style={[styles.input, { height: 80 }]}
            multiline
            value={mydoorno}
            onChangeText={(text) => setDoorno(text)}
          />

          <Text style={styles.label}>*City :</Text>
          <TextInput
            placeholder="City"
            style={styles.input}
            value={mycity}
            onChangeText={(text) => setCity(text)}
          />

          <Text style={styles.label}>*Pincode :</Text>
          <TextInput
            placeholder="Pincode"
            keyboardType="number-pad"
            maxLength={6}
            style={styles.input}
            value={mypincode}
            onChangeText={(text) => setPincode(text)}
          />

          <Text style={styles.label}>*Product / Service :</Text>
          <TextInput
            placeholder="Product"
            style={styles.input}
            value={myproduct}
            onChangeText={(text) => setProduct(text)}
          />

          <Text style={styles.label}>Landline Number :</Text>
          <TextInput
            placeholder="Landline Number"
            keyboardType="number-pad"
            style={styles.input}
            value={mylandLine}
            onChangeText={(text) => setLandLine(text)}
          />

          <Text style={styles.label}>STD Code :</Text>
          <TextInput
            placeholder="STD Code"
            keyboardType="number-pad"
            style={styles.input}
            value={myLcode}
            onChangeText={(text) => setLcode(text)}
          />

          <Text style={styles.label}>Email :</Text>
          <TextInput
            style={styles.input}
            placeholder="example@mail.com"
            keyboardType="email-address"
            value={myemail}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={insertRecord}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inputAndroid: {
    borderWidth: 3,
    borderColor: "#000000",
  },
  headerText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "500",
    color: "#6a0dad",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 300,
    padding: 20,
  },
  prefixcontainer: {
    padding: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    marginVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  button: {
    backgroundColor: "#6a0dad",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MediaPartner;
