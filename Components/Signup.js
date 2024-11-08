// =============================== updated signup page ======================================
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

const Signup = ({ navigation }) => {
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
    if (isRegistered) {
      Alert.alert("Error", "Mobile number is already registered.");
      return;
    }
    // Frontend validation for required fields
    if (
      !mybusinessname ||
      !mydoorno ||
      !mycity ||
      !mypincode ||
      !myprefix ||
      !mymobileno
    ) {
      Alert.alert("Validation Error", "Please enter all required fields.");
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
        navigation.navigate("Login");
        setBusinessname("");
        setCity("");
        setDoorno("");
        setEmail("");
        setLandLine("");
        setPincode("");
        setLcode("");
        setMobileno("");
        setPrefix("");
        setProduct("");
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
      <Text style={styles.headerText}>Signpost Phonebook</Text>
      <View style={styles.formContainer}>
        <ScrollView>
          <Text style={styles.label}>Mobile Number :</Text>
          <TextInput
            placeholder="Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
            value={mymobileno}
            onChangeText={(text) => setMobileno(text)}
            onEndEditing={() => checkMobileNumber(mymobileno)}
          />

          <Text style={styles.label}>Person / Business Name :</Text>
          <TextInput
            placeholder="Person/Business Name"
            style={styles.input}
            onChangeText={(text) => setBusinessname(text)}
            value={mybusinessname}
          />

          <View style={styles.prefixcontainer}>
            <Text style={styles.label}>Prefix:</Text>
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

          <Text style={styles.label}>Address :</Text>
          <TextInput
            placeholder="Address"
            style={[styles.input, { height: 80 }]}
            multiline
            onChangeText={(text) => setDoorno(text)}
            value={mydoorno}
          />

          <Text style={styles.label}>City :</Text>
          <TextInput
            placeholder="City"
            style={styles.input}
            onChangeText={(text) => setCity(text)}
            value={mycity}
          />

          <Text style={styles.label}>Pincode :</Text>
          <TextInput
            placeholder="Pincode"
            keyboardType="number-pad"
            maxLength={6}
            style={styles.input}
            onChangeText={(text) => setPincode(text)}
            value={mypincode}
          />

          <Text style={styles.label}>Product / Service :</Text>
          <TextInput
            placeholder="Product"
            style={styles.input}
            onChangeText={(text) => setProduct(text)}
            value={myproduct}
          />

          <Text style={styles.label}>Landline Number :</Text>
          <TextInput
            placeholder="Landline Number"
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(text) => setLandLine(text)}
            value={mylandLine}
          />

          <Text style={styles.label}>STD Code :</Text>
          <TextInput
            placeholder="STD Code"
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(text) => setLcode(text)}
            value={myLcode}
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
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already Have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Button
        title="Already Have an Account? Login"
        onPress={() => navigation.navigate("Login")}
      /> */}
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
    fontSize: 30,
    fontWeight: "500",
    color: "#6a0dad",
    marginTop: 60,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 400,
    padding: 20,
    marginTop: "5%",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "700",
    backgroundColor: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    marginVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  prefixcontainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
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
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#888",
  },
  loginLink: {
    color: "#6a0dad", // purple link color
    fontWeight: "bold",
  },
});

export default Signup;
