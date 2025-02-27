import React, { useState,useContext } from "react";
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
import axios from "axios";
import { AuthContext } from "./AuthContext";

const MediaPartner = ({ navigation }) => {
  const { user, userData } = useContext(AuthContext); // Use userData for auth
  const [mybusinessname, setBusinessname] = useState("");
  const [myperson, setPerson] = useState("");
  const [myaddress, setAddress] = useState("");
  const [mycity, setCity] = useState("");
  const [mypincode, setPincode] = useState("");
  const [myproduct, setProduct] = useState("");
  const [mylandLine, setLandLine] = useState("");
  const [myLcode, setLcode] = useState("");
  const [myemail, setEmail] = useState("");
  const [myprefix, setPrefix] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [regName, setRegName] = useState("");
  const [regPrefix, setRegPrefix] = useState("");
  const [regBusinessName, setRegBusinessName] = useState("");
  const [regBusinessPrefix, setRegBusinessPrefix] = useState("");
  const [mymobileno, setMymobileno] = useState("");
  const [cityName, setCityName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const cmpanyPrefix = "M/s.";
  const mydescription = "Update Soon";
  const mypriority = "0";
  const mydiscount = "10";
  const [showPopup, setShowPopup] = useState(false);


  const resetForm = () => {
    setBusinessname("");
    setAddress("");
    setPerson("");
    setCity("");
    setPincode("");
    setProduct("");
    setLandLine("");
    setLcode("");
    setEmail("");
    setPrefix("");
    setMymobileno("");
    setIsRegistered(false);
  };

  // Help text visibility states
  const [helpText, setHelpText] = useState({
    mobile: false,
    person: false,
    prefix: false,
    business: false,
    address: false,
    city: false,
    pincode: false,
    product: false,
    landline: false,
    std: false,
    email: false,
  });

  // Reset all help texts
  const resetAllHelpTexts = () => {
    setHelpText({
      mobile: false,
      person: false,
      prefix: false,
      business: false,
      address: false,
      city: false,
      pincode: false,
      product: false,
      landline: false,
      std: false,
      email: false,
    });
  };

  // Set specific help text
  const setHelpTextVisible = (field) => {
    resetAllHelpTexts();
    setHelpText((prev) => ({ ...prev, [field]: true }));
  };

  // Check if the mobile number is registered
  const checkMobileNumber = async (mobile) => {
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_insert_data_for_new_database.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileno: mobile }),
        }
      );
      const result = await response.json();

      if (result.registered) {
        console.log(result.data);

        // Store values
        setRegBusinessName(result.businessname);
        setRegBusinessPrefix(result.prefix);
        setRegName(result.person);
        setRegPrefix(result.personprefix);
        setIsRegistered(true);

        // Construct Alert message
        let alertMessage = "";
        if (result.businessname) {
          alertMessage = `Mobile Number Already Registered\n\nIn the Name of: ${result.prefix} ${result.businessname}`;
        } else {
          alertMessage = `Mobile Number Already Registered\n\nIn the Name of: ${result.personprefix} ${result.person}`;
        }

        // Show Alert Box
        Alert.alert("Mobile Number Exists", alertMessage, [
          { text: "OK", onPress: () => setMymobileno("") },
        ]);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to verify mobile number.");
      console.error(error);
    }
  };

 

  const insertbusinessName = async () => {
    if (!userData) {
      console.log("Error: No authenticated user found.");
      return;
    }
  
    const dataName = {
      name: userData.businessname || userData.person,
      date: new Date().toISOString().split("T")[0],
      dataentry_name: mybusinessname || myperson,
       
    };
  
    try {
      const response = await axios.post(
        "https://signpostphonebook.in/signpostphonebookdataentry_get_names.php",
        dataName,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        console.log("Success", response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Unable to reach server", error);
    }
  };
  



  const insertRecord = async (e) => {
    e.preventDefault();
  
    if (!mymobileno) {
      alert("Please enter all required fields.");
      return;
    }
  
    if (isRegistered) {
      alert("Mobile number is already registered.");
      return;
    }
  
    const Data = {
      businessname: mybusinessname,
      prefix: cmpanyPrefix,
      person: myperson,
      personprefix: myprefix,
      address: myaddress,
      priority: mypriority,
      city: mycity,
      pincode: mypincode,
      mobileno: mymobileno,
      email: myemail,
      product: myproduct,
      landline: mylandLine,
      lcode: myLcode,
      discount: mydiscount,
      description: mydescription,
       
    };
  
    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_insert_data_for_new_database.php",
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
  
      if (jsonResponse.Message) {
        setShowPopup(true);
        await insertCount(userData?.id); // Pass user ID properly
        await insertbusinessName();
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      alert("Error saving data.");
      console.log(error);
    }
  };
  
  const insertCount = async (userid) => {
    if (!userid) {
      console.log("Error: No authenticated user ID found.");
      return;
    }
  
    const dataCount = new URLSearchParams({
      userid: userData.id,
      name: userData.businessname || userData.person,
      date: new Date().toISOString().split("T")[0],
      count: "1", // Ensure count is a string
    });
  
    try {
      const response = await fetch(
        "https://signpostphonebook.in/get_count_from_signpostphonebookdata.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: dataCount.toString(),
        }
      );
  
      const responseData = await response.json();
  
      if (responseData.success) {
        console.log(
          `Success: ${responseData.message}, New Count: ${responseData.newCount}`
        );
      } else {
        console.log(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.log(`Error: Unable to reach the server. ${error.message}`);
    }
  };

  
  //for business name input box 

  const handleBusinessName = (text) => {
    // Remove any character that is not a letter or space
    const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
    setBusinessname(filteredText);
  };
  

  //for person name input box

  const handlePersonName = (text) => {
    // Remove any character that is not a letter or space
    const filteredText = text.replace(/[^a-zA-Z\s]/g, "");
    setPerson(filteredText);
  };


  //for city name input box


  const handleCityName = (text) => {
    // Remove any character that is not a letter or space
    const filteredText = text.replace(/[^a-zA-Z\s]/g, "");
    setCity(filteredText);
  };



 // for mobile number




  const handleEndEditing = () => {
    // Regular expression to match a 10-digit number starting with 6, 7, 8, or 9
    const mobileNumberPattern = /^[6-9]\d{9}$/;

    if (!mobileNumberPattern.test(mymobileno)) {
      Alert.alert("Invalid Mobile Number", "Mobile number must be 10 digits.");
      setMymobileno(""); // Clear the input field
    } else {
      // Proceed with further actions, such as checking if the number is registered
      checkMobileNumber(mymobileno);
    }
  };

  const handleChange = (text) => {
    // Remove any non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, "");
    // Update state with cleaned text
    setMymobileno(cleaned);
    // Optionally, provide feedback if length exceeds 10
    if (cleaned.length > 10) {
      Alert.alert("Invalid Length", "Mobile number cannot exceed 10 digits.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Media Partner</Text>
      <View style={styles.formContainer}>
        <ScrollView>
          {/* Mobile Number */}
          <Text style={styles.label}>*Mobile Number :</Text>
          <TextInput
            placeholder="Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
            value={mymobileno}
            onChangeText={handleChange}
            onEndEditing={handleEndEditing}
            onFocus={() => setHelpTextVisible("mobile")}
          />
          {helpText.mobile && (
            <Text style={styles.helpText}>
              Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.
            </Text>
          )}

          {/* Person */}
          <Text style={styles.label}>*Person :</Text>
          <TextInput
            placeholder="Person"
            style={styles.input}
            value={myperson}
            onChangeText={handlePersonName}
            onFocus={() => setHelpTextVisible("person")}
          />
          {helpText.person && (
            <Text style={styles.helpText}>Enter the person's full name.</Text>
          )}

          {/* Prefix */}
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
              </View>
            </RadioButton.Group>
          </View>

          {/* Business Name */}
          <Text style={styles.label}>*Firm / Business Name :</Text>
          <TextInput
            placeholder="Name/Business Name"
            style={styles.input}
            value={mybusinessname}
            onChangeText={handleBusinessName}
            onFocus={() => setHelpTextVisible("businessName")}
          />

          {/* Address */}
          <Text style={styles.label}>*Address :</Text>
          <TextInput
            placeholder="Address"
            style={[styles.input, { height: 80 }]}
            multiline
            value={myaddress}
            onChangeText={(text) => setAddress(text)}
            onFocus={() => setHelpTextVisible("address")}
          />

          {/* City */}
          <Text style={styles.label}>*City :</Text>
          <TextInput
            placeholder="City"
            style={styles.input}
            value={mycity}
            onChangeText={handleCityName}
            onFocus={() => setHelpTextVisible("cityName")}
          />

          {/* Pincode */}
          <Text style={styles.label}>*Pincode :</Text>
          <TextInput
            placeholder="Pincode"
            keyboardType="number-pad"
            maxLength={6}
            style={styles.input}
            value={mypincode}
            onChangeText={(text) => setPincode(text)}
            onFocus={() => setHelpTextVisible("pincode")}
          />

          {/* Product / Service */}
          <Text style={styles.label}>*Product / Service :</Text>
          <TextInput
            placeholder="Product"
            style={styles.input}
            value={myproduct}
            onChangeText={(text) => setProduct(text)}
            onFocus={() => setHelpTextVisible("product")}
          />

          {/* Landline */}
          <Text style={styles.label}>Landline Number :</Text>
          <TextInput
            placeholder="Landline Number"
            keyboardType="number-pad"
            style={styles.input}
            value={mylandLine}
            onChangeText={(text) => setLandLine(text)}
            onFocus={() => setHelpTextVisible("landline")}
          />

          {/* STD Code */}
          <Text style={styles.label}>STD Code :</Text>
          <TextInput
            placeholder="STD Code"
            keyboardType="number-pad"
            style={styles.input}
            value={myLcode}
            onChangeText={(text) => setLcode(text)}
            onFocus={() => setHelpTextVisible("std")}
          />

          {/* Email */}
          <Text style={styles.label}>Email :</Text>
          <TextInput
            style={styles.input}
            placeholder="example@mail.com"
            keyboardType="email-address"
            value={myemail}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            onFocus={() => setHelpTextVisible("email")}
          />

          {/* Submit Button */}
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
