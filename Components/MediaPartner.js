import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Tesseract from "tesseract.js";

const MediaPartner = () => {
  const [mybusinessname, setBusinessname] = useState("");
  const [mydoorno, setDoorno] = useState("");
  const [mycity, setCity] = useState("");
  const [mypincode, setPincode] = useState("");
  const [myproduct, setProduct] = useState("");
  const [mylandLine, setLandLine] = useState("");
  const [myLcode, setLcode] = useState("");
  const [myemail, setEmail] = useState("");
  const [mymobileno, setMobileno] = useState("");

  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      performOCR(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      performOCR(result.uri);
    }
  };

  // Convert image to base64 using expo-file-system
  const convertToBase64 = async (uri) => {
    if (!uri) {
      throw new Error("Invalid URI for image.");
    }

    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      throw error;
    }
  };

  // Perform OCR using Tesseract.js
  const performOCR = async (imageUri) => {
    try {
      const base64Image = await convertToBase64(imageUri); // Convert image to base64

      const { data: { text } } = await Tesseract.recognize(
        base64Image,
        "eng", // Language code
        {
          logger: (info) => console.log(info), // Optional logger
        }
      );

      console.log("OCR Result:", text);
      autoFillFormFields(text); // Call function to auto-fill form fields
    } catch (error) {
      console.error("OCR Error:", error);
      Alert.alert("Error", "Unable to process the image. Please try again.");
    }
  };

  // Auto-fill form fields with OCR text
  const autoFillFormFields = (ocrText) => {
    const mobileNumberMatch = ocrText.match(/\d{10}/); // Match 10-digit mobile numbers
    const nameMatch = ocrText.match(/[A-Za-z\s]+/); // Match words for name/business name

    if (mobileNumberMatch) setMobileno(mobileNumberMatch[0]);
    if (nameMatch) setBusinessname(nameMatch[0].trim());
  };

  // Submit form data
  const insertRecord = () => {
    if (
      !mymobileno ||
      !mybusinessname ||
      !mydoorno ||
      !mycity ||
      !mypincode ||
      !myproduct ||
      !myemail
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const formData = {
      mobile: mymobileno,
      businessName: mybusinessname,
      address: mydoorno,
      city: mycity,
      pincode: mypincode,
      product: myproduct,
      email: myemail,
    };

    console.log("Submitting the following data:", formData);

    // Submit form data via API (mocked for now)
    Alert.alert("Success", "Form submitted successfully!");
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
          />

          <Text style={styles.label}>*Name / Business Name :</Text>
          <TextInput
            placeholder="Name/Business Name"
            style={styles.input}
            value={mybusinessname}
            onChangeText={(text) => setBusinessname(text)}
          />

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

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
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
 
