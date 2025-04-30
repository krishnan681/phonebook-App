import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const Profile = () => {
  const [taskCount, setTaskCount] = useState(0); // Task count (set to 0 instead of "")
  const [referralCount, setReferralCount] = useState(0);
  const { userData, setUserData } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState([]);
  const date = new Date().toISOString().split("T")[0];
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [membershipModalVisible, setMembershipModalVisible] = useState(false);

  // Open modals separately
  const openProfileModal = () => setProfileModalVisible(true);
  const openMembershipModal = () => setMembershipModalVisible(true);

  // Close modals separately
  const closeProfileModal = () => setProfileModalVisible(false);
  const closeMembershipModal = () => setMembershipModalVisible(false);

  // profile image function

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!userData?.id) return;

      try {
        const response = await axios.get(
          `https://signpostphonebook.in/image_upload_for_new_database.php?id=${userData.id}`
        );
        // console.log("Fetched Image Response:", response.data);

        if (response.data.success) {
          const imageUrl = response.data.imageUrl;
          const fullUrl = imageUrl.startsWith("http")
            ? imageUrl
            : `https://signpostphonebook.in/${imageUrl}`;
          setProfileImage(fullUrl + `?t=${new Date().getTime()}`); // Prevent caching
          setUserData((prevData) => ({ ...prevData, profileImage: fullUrl }));
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, [userData.id, setUserData]);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please allow access to the gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const selectedImage = result.assets[0].uri;
      console.log("Selected Image URI:", selectedImage);
      setProfileImage(selectedImage);
      uploadImage(selectedImage);
    }
  };

  const uploadImage = async (imageUri) => {
    const formData = new FormData();
    formData.append("profileImage", {
      uri: imageUri,
      name: "profile.jpg",
      type: "image/jpeg",
    });
    formData.append("id", userData?.id);
    formData.append(
      "name",
      userData?.businessname || userData?.person || "Unknown"
    );

    try {
      const response = await axios.post(
        "https://signpostphonebook.in/image_upload_for_new_database.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      //   console.log("Upload Response:", response.data);

      if (response.data.success) {
        const fullUrl = response.data.imageUrl.startsWith("http")
          ? response.data.imageUrl
          : `https://signpostphonebook.in/${response.data.imageUrl}`;

        setProfileImage(fullUrl + `?t=${new Date().getTime()}`); // Prevent caching
        setUserData((prevData) => ({ ...prevData, profileImage: fullUrl }));
      } else {
        console.error("Upload failed:", response.data.message);
        Alert.alert("Upload Failed", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Alert.alert(
        "Upload Error",
        "An error occurred while uploading the image."
      );
    }
  };

  const fetchUserData = async (userid, date, signal) => {
    try {
      if (!userid || !date) {
        throw new Error("Please provide a valid ID and Date.");
      }

      const response = await fetch(
        `https://signpostphonebook.in/data_entry_details.php?userid=${userid}&date=${date}`,
        { signal } // Attach the abort signal
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success" && data.data) {
        return data.data;
      } else if (
        data.status === "error" &&
        data.message === "No record found."
      ) {
        return { count: 0 }; // Ensure frontend handles missing data correctly
      } else {
        throw new Error(data.message || "Failed to fetch details.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching user data:", error.message);
      }
      return null;
    }
  };

  useEffect(() => {
    if (!userData?.id || !date) {
      setError("Invalid user data or date.");
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      setIsLoading(true);
      const data = await fetchUserData(userData.id, date, signal);
      setIsLoading(false);

      if (data) {
        setTaskCount(data.count || 0); // Ensure count is handled even if 0
        setError(null);
      } else {
        setError("No data found.");
        setTaskCount(0); // Reset count if no data is found
      }
    };

    getData();
    if (typeof fetchReferralCount === "function") {
      fetchReferralCount();
    }

    return () => controller.abort(); // Cancel fetch request on unmount
  }, [userData, date]);

  // Fetch referral count
  const fetchReferralCount = async () => {
    if (!userData?.mobileno) return;
    try {
      const response = await fetch(
        `https://signpostphonebook.in/try_referrals_count.php?mobile=${encodeURIComponent(
          userData.mobileno
        )}`
      );
      const data = await response.text();
      const match = data.match(/Total Referred: (\d+)/);
      if (match) setReferralCount(parseInt(match[1], 10));
    } catch (error) {
      setError("Failed to fetch referral count.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={{ color: "#fff", fontSize: 20, marginBottom: -15 }}>
          {userData.id || "N/A"}
          {"\n"}
        </Text>
        <Text style={styles.headerText}>
          Welcome {userData?.businessname || userData?.person || "NA"}
        </Text>
      </View>

      {/* Profile Image with Camera Icon */}
      <TouchableOpacity
        onPress={openProfileModal}
        style={styles.profileContainer}
      >
        <Image
          source={{
            uri:
              profileImage ||
              "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png",
          }}
          style={styles.profileImage}
        />

        {/* Camera Icon for Changing Profile Picture */}
        <TouchableOpacity
          onPress={handleImagePick}
          style={styles.cameraIconContainer}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
            }} // Camera icon
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Profile Modal */}
      {/* Profile Modal */}
      <Modal
        visible={profileModalVisible}
        animationType="fade"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={closeProfileModal}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeProfileModal}
              >
                <Text style={styles.ProfilecloseButtonText}>X</Text>
              </TouchableOpacity>

              {/* Profile Image Preview */}
              <Image
                source={{ uri: profileImage }}
                style={styles.fullImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ScrollView style={styles.ScrollViewcontainer}>
        {/* Description Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Description</Text>
          <Text style={styles.infoText}>{userData.description || "N/A"}</Text>
        </View>
        {/* Product Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Products</Text>
          <Text style={styles.infoText}>{userData.product || "N/A"}</Text>
        </View>

        {/* Address Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Address</Text>
          <Text style={styles.infoText}>
            {userData.address || "N/A"}, {userData.city || "N/A"},{" "}
            {userData.pincode || "N/A"}
          </Text>
        </View>

        {/* Mobile Section */}
        <View style={styles.infoContainer}>
          {/* <Text style={styles.infoTitle}>Mobile No</Text> */}
          {/* <Text style={styles.infoText}>Mobile No:{userData.mobileno || "N/A"}</Text> */}
          <Text style={styles.infoText}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Mobile No:</Text>{" "}
            {userData.mobileno || "N/A"}
          </Text>
        </View>

        {/* Email Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Email</Text>
          <Text style={styles.infoText}>{userData.email || "N/A"}</Text>
        </View>

        {/* Total Count Section */}

        <View style={styles.countContainer}>
          <View style={styles.countBox}>
            <Text style={styles.countTitle}>Total Count</Text>
            <Text style={styles.countValue}>{taskCount}</Text>
          </View>

          <View style={styles.countBox}>
            <Text style={styles.countTitle}>Referral Count</Text>
            <Text style={styles.countValue}>{referralCount}</Text>
          </View>
        </View>

        {/* styles.openModalButton */}

        {/* Membership Card Button */}
        <TouchableOpacity
          style={styles.openModalButton}
          onPress={openMembershipModal}
        >
          <Text style={styles.buttonText}>Membership Card</Text>
        </TouchableOpacity>

        {/* Membership Card Modal */}
        {/* Membership Card Modal */}
        <Modal
          visible={membershipModalVisible}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              {/* Header Section */}
              <View style={styles.heaader}>
                <Image
                  source={require("../assets/Logo_Phonebook.jpg")}
                  style={styles.logo}
                />
                <Text style={styles.heaaderText}>SIGNPOST PHONE BOOK</Text>

                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeMembershipModal}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>

              {/* Membership Card Content */}
              <Text style={styles.membershipText}>Membership Card</Text>
              <View style={styles.cardContent}>
                <Image
                  source={{ uri: profileImage }}
                  style={styles.memprofileImage}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>
                    {userData?.businessname || userData?.person}
                  </Text>
                  <Text style={styles.validText}>
                    Valid Until: Date Not Available
                  </Text>
                  <Text style={styles.addressText}>
                    Address: {userData?.address || "N/A"}
                  </Text>
                </View>
              </View>

              {/* Footer Section */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  This card is valid for 5 years from the date of issue.
                </Text>
                <Text style={styles.footerAddress}>
                  46, Sidco Industrial Estate, Coimbatore - 641021
                </Text>
              </View>
            </View>
          </View>
        </Modal>

        {/* Sub card with timing  */}

        {/* Subscription Card Section */}

        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionTitle}>Subscription Card</Text>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: profileImage }}
              style={styles.memprofileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {userData?.businessname || userData?.person}
              </Text>
              <Text style={styles.validText}>
                Subscription Type: {userData?.subscriptionType || "N/A"}
              </Text>
              <Text style={styles.validText}>
                Expiry Date: {userData?.subscriptionExpiry || "N/A"}
              </Text>
              <Text style={styles.addressText}>
                Address: {userData?.address || "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 150,
    backgroundColor: "#9933ff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  profileContainer: {
    alignItems: "center",
    marginTop: -40,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 160,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    tintColor: "#000",
  },
  modalContainer: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },

  //  ScrollViewcontainer

  ScrollViewcontainer: {
    flex: 1,
    padding: 10,
  },

//Despription, Product, Address, Mobile, Email, Total Count, Referral Count

  infoContainer: {
    backgroundColor: "#fff",
    margin: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },

  countContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginTop: 10,
  },
  countBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
    marginHorizontal: 5,
  },
  countTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  countValue: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  openModalButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // /membership cars styles

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  heaader: {
    backgroundColor: "#ff4081",
    width: "100%",
    flexDirection: "row", // Arrange items in a row
    alignItems: "center", // Align items vertically
    justifyContent: "center", // Align items horizontally
    padding: 15,
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  heaaderText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    bottom: 25,

    marginLeft: 10,
    marginBottom: -50,
  },
  membershipText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  memprofileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  validText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    marginTop: 5,
  },
  addressText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
    flexWrap: "wrap",
  },
  footer: {
    backgroundColor: "#ff4081",
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "white",
  },
  footerAddress: {
    fontSize: 12,
    color: "white",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
    backgroundColor: "white",
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  ProfilecloseButton: {
    position: "absolute",
    right: "10",
  },

  ProfilecloseButtonText: {
    color: "white",
    backgroundColor: "black",
    width: 35,
    height: 35,
    fontSize: 26,
    paddingLeft: 10,
    // left: 150,
    // marginVertical: 15,
    borderRadius: 25,
    fontWeight: "bold",
  },

  // Subscription Card Styles

  subscriptionCard: {
    backgroundColor: "#fff",
    height: "auto",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 15,
    marginBottom:130,
  },

  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  memprofileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  
  userInfo: {
    flex: 1,
  },
  
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  
  validText: {
    fontSize: 14,
    color: "gray",
  },
  
  addressText: {
    fontSize: 14,
    color: "gray",
  },
});

export default Profile;
