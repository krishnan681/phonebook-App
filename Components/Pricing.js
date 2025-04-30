import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { AuthContext } from "./AuthContext";

const Pricing = () => {
  const [selectedPrice, setSelectedPrice] = useState(null);
 const { userData, setUserData } = useContext(AuthContext);
  const handleBuyNow = (price) => {
    setSelectedPrice(price);
  };

  //for opening upi app

  const handleUPIPayment = (amount) => {
    const payeeVPA = "naveenbsc.mca1518-1@okicici"; // Replace with your actual UPI ID
    const payeeName = "Signpost";
    const transactionNote = "Subscription Payment";
  
    // Construct UPI deep link
    const upiUrl = `upi://pay?pa=${payeeVPA}&pn=${encodeURIComponent(
      payeeName
    )}&tn=${encodeURIComponent(transactionNote)}&am=${amount}&cu=INR`;
  
    // Check if the device can open the UPI link
    Linking.canOpenURL(upiUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(upiUrl);
        } else {
          Alert.alert("Error", "No UPI app found. Please install a UPI app.");
        }
      })
      .catch((err) => Alert.alert("Error", "An error occurred: " + err.message));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
            <Text style={styles.brand}>
                Welcome {userData.businessname || userData.person}
            </Text>
            <Text style={styles.tagline}>
                Upgrade to get more out of your Subscriptions
            </Text>
        </View>

      {selectedPrice === null ? (
        <View style={styles.planContainer}>
          {/* Weekly Plan */}
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>1 Week Trial Pack</Text>
            <Text style={styles.planPrice}>₹20</Text>
            <Text style={styles.planFeature}>Duration: 7 Days</Text>
            <Text style={styles.planFeature}>Bulk Messages for 7 days</Text>
            <Text style={styles.planFeature}>Free Support</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuyNow(20)}
            >
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          {/* Monthly Plan */}
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>1 Month Pack</Text>
            <Text style={styles.planPrice}>₹200</Text>
            <Text style={styles.planFeature}>Referral Bonus: ₹50</Text>
            <Text style={styles.planFeature}>Free Support</Text>
            <Text style={styles.planFeature}>Sign-up Bonus: ₹20</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuyNow(200)}
            >
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          {/* Yearly Plan */}
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>1 Year Pack</Text>
            <Text style={styles.planPrice}>₹1000</Text>
            <Text style={styles.planFeature}>Unlimited messages</Text>
            <Text style={styles.planFeature}>24/7 Support</Text>
            <Text style={styles.planFeature}>Sign-up Bonus: ₹20</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuyNow(1000)}
            >
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentTitle}>Confirm Order and Pay</Text>
          <Text style={styles.paymentDescription}>
            Please make the payment to enjoy all the features and benefits.
          </Text>

          {/* User Details */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={userData.businessname || userData.person}
              onChangeText={(text) =>
                setUserData({ ...userData, businessname: text })
              }
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={userData.address}
              onChangeText={(text) =>
                setUserData({ ...userData, address: text })
              }
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputBoxHalf}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city"
                value={userData.city}
                onChangeText={(text) => setUserData({ ...userData, city: text })}
              />
            </View>

            <View style={styles.inputBoxHalf}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter pincode"
                keyboardType="numeric"
                value={userData.pincode}
                onChangeText={(text) =>
                  setUserData({ ...userData, pincode: text })
                }
              />
            </View>
          </View>

          {/* Payment Summary */}
          <View style={styles.paymentSummary}>
            <Text style={styles.paymentAmount}>You have to pay : ₹{selectedPrice}</Text>
            <Text style={styles.paymentNote}>
              Enjoy all features and perks after completing the payment.
            </Text>
          </View>

          {/* Payment Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setSelectedPrice(null)}
            >
              <Text style={styles.buttonText}>Previous Step</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => handleUPIPayment(selectedPrice)}
            >
              <Text style={styles.buttonText}>Pay ₹{selectedPrice}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
    header: {
    alignItems: "center",
    padding: 20,

  },
  tagline: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    
  },    
  planContainer: {
    alignItems: "center",
  },
  planCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  planPrice: {
    fontSize: 16,
    color: "#28a745",
    fontWeight: "bold",
    marginVertical: 5,
  },
  planFeature: {
    fontSize: 14,
    marginVertical: 2,
  },
  buyButton: {
    marginTop: 10,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  paymentContainer: {
    alignItems: "center",
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paymentDescription: {
    fontSize: 14,
    marginVertical: 10,
  },
  inputBox: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBoxHalf: {
    width: "48%",
  },
  paymentSummary: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  paymentAmount: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  paymentNote: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
  },
  payButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
  },
});

export default Pricing;
