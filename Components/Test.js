import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ContactCard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Contact Container */}
      <View style={styles.contactContainer}>
        <Text style={styles.mobile}>+919586383366</Text>
        <View style={styles.buttonContainer}>
          {/* Dial Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Dialing...")}
          >
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

      {/* Modal for Business Card */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            {/* <View style={styles.leftSection}>
              <Ionicons name="paper-plane-outline" size={24} color="#00D9D5" />
              <Text style={styles.companyText}>Company</Text>
               QR Code Placeholder
              <View style={styles.qrCode}><Text>QR Code Here</Text></View>
            </View> */}
            <View style={styles.rightSection}>
              <Text style={styles.name}>YOUR NAME HERE</Text>
              <Text style={styles.designation}>Designation</Text>
              <Text style={styles.info}>
                <Ionicons name="call-outline" /> +919586383366
              </Text>
              <Text style={styles.info}>
                <Ionicons name="mail-outline" /> Company Mail Id
              </Text>
              <Text style={styles.info}>
                <Ionicons name="location-outline" /> Address Here
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contactContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  mobile: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00D9D5",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 180,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
  },
  leftSection: {
    backgroundColor: "#001D3D",
    width: "35%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  companyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  qrCode: {
    width: 60,
    height: 60,
    backgroundColor: "#00D9D5",
    borderRadius: 10,
  },
  rightSection: {
    paddingLeft: 15,
    justifyContent: "center",
    width: "65%",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  designation: {
    fontSize: 14,
    color: "#555",
  },
  info: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#00D9D5",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ContactCard;
