import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthContext";


const HomePage = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const businessname = route?.params?.businessname || "Guest";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firmName, setFirmName] = useState("");
  const [productName, setProductName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showLocation, setShowLocation] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://signpostphonebook.in/client_fetch.php");

      if (!response.ok) 
      {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
     
      console.log("Fetched Data:", jsonResponse);

      if (Array.isArray(jsonResponse)) {
      
        const sortedData = jsonResponse.sort((a, b) => b.id - a.id);
      
        setData(sortedData);
      }else
      
      {
        Alert.alert("Error", "Unexpected response from server.");
      }

    }
    catch (error)
    {
      console.error("Fetch Error:", error);
    
      Alert.alert("Error", "Failed to load data: " + error.message);
    
    }finally
    
    {
      setLoading(false);
    }
  
  };


  const fetchFirmData = async (name) => {
    if (!name)
    {
      return;
    }
    
    try
    {
      const response = await fetch(`https://signpostphonebook.in/client_fetch_byname.php?businessname=${name}`);

      if (!response.ok)
      {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      
      if (Array.isArray(jsonResponse)) {
      
        setData(jsonResponse);
      
      }else
      
      {
        Alert.alert("Error", "Unexpected response from server.");
      }
    
    }catch (error)
    {
      console.error("Fetch Error:", error);
    
      Alert.alert("Error", "Failed to load firm data: " + error.message);
    }
  
  };

  const fetchProductData = async (name) => {
    if (!name) {
      return;
    }

    try
    {
      const response = await fetch(`https://signpostphonebook.in/try_product.php?product=${name}`);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      
      if (Array.isArray(jsonResponse)) {
      
        setData(jsonResponse);
      
      }else
      
      {
        Alert.alert("Error", "Unexpected response from server.");
      }
    
    } catch(error)
    
    {
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
    
      if (user === "") {
    
        Alert.alert("Login Required");
    
        navigation.navigate("Login");
    
      } else
      
      { if (selectedItem === item.id)
        
        {
        
          setSelectedItem(""); // Collapse the card if it's already open
        
        } else
        
        {
          setSelectedItem(item.id); // Set the selected card to fetch details
        
          setModalVisible(true);
        }
      }
    };

    const closeModal = () => {
      setModalVisible(false);
    };
    
    const maskedMobile = `${item.mobileno.slice(0, 5)}xxxxx`;
    
    const dialedNumber = item.mobileno;

    const OpenDialpad = () => {
      
      if (user === "") {
      
        Alert.alert("Login Required");
      
        navigation.navigate("Login");
      }else
      
      {
        let phoneUrl = `tel:${dialedNumber}`;
        
        Linking.canOpenURL(phoneUrl)
        
        .then((supported) => {
        
          if (supported)
            
            {
              Linking.openURL(phoneUrl);
            }else
            
            {
              Alert.alert("Error", "Dial pad is not supported on this device.");
            }
          
          })
          
          .catch((err) => console.error("An error occurred", err));
      
        }
    
      };
    
      return (
        
        <View style={styles.card}>
        
          <View style={styles.infoContainer}>
        
            <Text style={styles.businessName}>{item.businessname}</Text>
            {/* naveen bro sonadhu  */}

            {/* {firmName && (<Text style={styles.firmName}>{item.doorno}</Text>)} */}

            {productName && (<Text style={styles.productName}>{item.product}</Text>)}

            {/* // Show the location only if productName is not entered */}
            {!productName && (
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={16} color="#000" />
                <Text style={styles.locationText}>
                  {item.city}, {item.pincode}
                </Text>
              </View>
            )}

        
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
                    
                    <Ionicons name="ellipsis-horizontal-outline" size={20} color="#fff" />
                    
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
             <ScrollView contentContainerStyle={styles.modalContent}>
               <View style={styles.modalContainer}>
                 <View style={styles.Modelcard}>
                   <View style={styles.rightSection}>
                     {/* Main Content */}
                     <Text style={styles.Modelname}>{item.businessname}</Text>
                     <Text style={styles.Modeldesignation}>{item.product}</Text>
                     <Text style={styles.Modelinfo}>
                       <Ionicons name="call-outline" size={16}   style={styles.iconSpacing} /> 
                       {`${item.mobileno.slice(0, 5)}xxxxx`}
                     </Text>
                     <Text style={styles.Modelinfo}>
                       <Ionicons name="location-outline" size={16} style={styles.iconSpacing} />    
                       {item.doorno}, {item.city}, {item.pincode}
                     </Text>
           
                     {/* Buttons Section */}
                     <View style={styles.buttonContainer}>
                     <TouchableOpacity style={styles.callbutton} onPress={OpenDialpad}>
                         <Ionicons name="call" size={20} color="white" />
                         <Text style={styles.buttonText}>Call</Text>
                       </TouchableOpacity>
                       
           
                       <TouchableOpacity
                         style={styles.smsButton}
                         onPress={() => Linking.openURL(`sms:${item.mobileno}`)}
                       >
                         <Ionicons name="chatbubble-ellipses" size={20} color="white" />
                         <Text style={styles.buttonText}> SMS</Text>
                       </TouchableOpacity>

                       <TouchableOpacity
                         style={styles.whatsappButton}
                         onPress={() => Linking.openURL(`https://wa.me/${item.mobileno}`)}
                       >
                         <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
                         <Text style={styles.buttonText}> WhatsApp</Text>
                       </TouchableOpacity>
           
                       <TouchableOpacity
                         style={styles.emailButton}
                         onPress={() => Linking.openURL(`mailto:${item.email}`)}
                       >
                         <Ionicons name="mail-sharp" size={20} color="white" />
                         <Text style={styles.buttonText}> Email</Text>
                       </TouchableOpacity>
           
                      
                     </View>
           
                     {/* Text Section */}
                     <View style={styles.text}>
                       <Text style={styles.title}>See how Your Ad looks like</Text>
                     </View>
           
                     {/* New Card Inside Modal-1 */}
                     <View style={styles.innerCard}>
                       <View style={styles.row}>
                         <Text style={styles.businessName}>{item.businessname}</Text>
                         <Text style={styles.mobile}>{maskedMobile}</Text>
                       </View>
                       <Text style={styles.productName}>{item.product}</Text>
                       <Text style={styles.firmName}>{item.doorno}</Text>
                     </View>

                     {/* colored card-2  */}
                     <View style={styles.innerCard2}>
                       <View style={styles.row}>
                         <Text style={styles.businessName}>{item.businessname}</Text>
                         <Text style={styles.mobile}>{maskedMobile}</Text>
                       </View>
                       <Text style={styles.productName}>{item.product}</Text>
                       <Text style={styles.firmName}>{item.doorno}</Text>
                     </View>
                     {/* colored card-3 */}

                     <View style={styles.innerCard2}>
                       <View style={styles.row}>
                         <Text style={styles.businessName}>{item.businessname}</Text>
                         <Text style={styles.mobile}>{maskedMobile}</Text>
                       </View>
                       <Text style={styles.productName}>{item.product}</Text>
                       <Text style={styles.firmName}>{item.doorno}</Text>
                       <Text style={styles.firmName}>Email : {item.email}</Text>

                     </View>

                     {/* colored card-4  */}
                     <View style={[styles.innerCard4, styles.ovenBorder]}>
  <Text style={styles.borderText}>Logo</Text> 
  
  <View style={styles.row}>
    <Text style={styles.businessName}>{item.businessname}</Text>
    <Text style={styles.mobile}>{maskedMobile}</Text>
  </View>
  <Text style={styles.productName}>{item.product}</Text>
  <Text style={styles.firmName}>{item.doorno}</Text>
  <Text style={styles.firmName}>Email : {item.email}</Text>
</View>

                   </View>
                 </View>
           
                 {/* Close Button */}
                 <TouchableOpacity style={styles.ModelcloseButton} onPress={closeModal}>
                   <Text style={styles.ModelcloseButtonText}>X</Text>
                 </TouchableOpacity>
               </View>
             </ScrollView>
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
      
        <View style={styles.inputContainer}>
          
          <View style={styles.inputWrapper}>
            
            <Icon name="search" size={24} color="#6a0dad" style={styles.icon} />
              
            <TextInput
            style={styles.input}
            placeholder="Firm/Person"
            value={firmName}
            onFocus={() => setShowLocation(true)}
            onChangeText={(text) => {
              setFirmName(text);
              setProductName("");
            }}
          />
        
          </View>
        
          <View style={styles.inputWrapper}>
          
            <Icon name="search" size={24} color="#6a0dad" style={styles.icon} />
          
            <TextInput
            style={styles.input}
            placeholder="Product"
            value={productName}
            onFocus={() => setShowLocation(false)}
            onChangeText={(text) => {
              setProductName(text);
              setFirmName("");
            }}
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
    iconSpacing:{
      marginRight:15,
    },
    text:{
      top:80,
    },
    title:{
      fontSize: 18, 
      fontWeight: '600',
    },
    innerCard: {
      borderWidth: 2,
      borderColor: 'black',
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 15,
      marginVertical: 10,
      elevation: 3,
      width:370,
      top:100,
    },
    innerCard2:{
      borderWidth: 2,
      borderColor: '#Ff00ff',
      backgroundColor: "pink",
      borderRadius: 8,
      padding: 15,
      marginVertical: 10,
      elevation: 3,
      width:370,
      top:100,
    },
    innerCard4:{
      borderWidth: 2,
      borderColor: '#Ff00ff',
      backgroundColor: "pink",
      borderRadius: 8,
      padding: 15,
      marginVertical: 10,
      elevation: 3,
      width:370,
      top:100,
    },
    productName: {
      fontWeight: '600',
      fontSize: 16,
    },
    
    
    
    borderText: {
      position: 'relative',
      top: '50%', 
      left: '50%', 
      transform: [
        { translateX: -50 }, 
        { translateY: -85 },  
      ],
      margin: 10,
      padding: 10,
      borderRadius: 50,
      borderWidth: 2,
      width:60,
      textAlign: 'center', 
      display: 'flex',  
      justifyContent: 'center',  
      alignItems: 'center', 
      backgroundColor: 'white',  
      paddingHorizontal: 5,  
      fontSize: 15,  
      color: 'black',  
    },

    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between', // Evenly spaces items in the row
      alignItems: 'center',
      marginTop: 20,
    },
    
    callbutton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      width: '25%', // Take half the row space
      marginRight: 10, // Add space between rows
    },
    
    smsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      // width: '48%', // Take half the row space
      marginRight: 10, // Add space between rows
    },
    
    whatsappButton: {
      top:50,
      left:-189,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      marginRight: 10, // Add space between rows

      // width: '48%', // Take half the row space
    },
    
    emailButton: {
      top:50,
      left:-185,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginRight: 10, // Add space between rows
      // width: '48%', // Take half the row space
    },
    
    buttonText: {
      marginLeft: 8,
      fontSize: 14,
      color: '#000',
    },
    
    
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

  // ------modal------------------
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  Modelcard: {
    top:80,
    width: 420,
    height: 1150,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
  },
  rightSection: {
    flex: 1,
    top:-50,
    paddingLeft: 15,
    justifyContent: "center",
    width: "65%",
  },
  Modelname: {
    fontSize: 20,
    top:-40,
    fontWeight: "bold",
  },
  Modeldesignation: {
    fontSize: 18,
    top:-20,
    color: "#555",
  },
  Modelinfo: {
    flexDirection: 'row', 
    alignItems: 'center',
    fontSize: 17,
    top:-10,
    color: "#333",
    marginTop: 5,
  },
  ModelcloseButton: {
    top:-1055,
    left:180,
    marginTop: 15,
    padding: 10,
    backgroundColor: "#00D9D5",
    borderRadius: 5,
  },
  ModelcloseButtonText: {
    padding: 5,
    color: "#fff",
    fontWeight: "bold",
  }
  // addtolist:{
  //   left:90,
  //   flexDirection: "row",
  //   top:-168,
  //   marginTop: 15,
  //   padding: 10,
  //   // backgroundColor: "black",
  //   borderRadius: 5,
  // },
  // addtolistText:{
  //   top:-3,
  //   left:0,
  //   padding:5,
  //   color:"black",
  //   fontWeight: "bold",
  //   fontSize: 20,


  // }

});

export default HomePage;


