All back up files are here !
================================================== Login page Back up =================================
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Button,
//   ActivityIndicator
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = () => {
//     if (!username || !password) {
//       Alert.alert('Validation Error', 'Please fill in both fields.');
//       return;
//     }

//     setLoading(true);
//     setTimeout(() => {
//       if (username === '9655698389' && password === 'phonebook') {
//         Alert.alert('Login Successful');
//         navigation.navigate('Home');
//       } else {
//         Alert.alert('Error', 'Username or Password does not match');
//       }
//       setLoading(false);
//     }, 1000); // Simulate network delay
//   };

//   const handleForgotPassword = () => {
//     Alert.alert('Forgot Password', 'Password recovery feature is coming soon!');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Signpost Phonebook Login</Text>

//       <View style={styles.inputContainer}>
//         <Icon name="person" size={24} color="#666" />
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           value={username}
//           onChangeText={setUsername}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="lock" size={24} color="#666" />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//       </View>

//       <TouchableOpacity
//         style={styles.loginButton}
//         onPress={handleLogin}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator size="small" color="#fff" />
//         ) : (
//           <Text style={styles.loginButtonText}>Login</Text>
//         )}
//       </TouchableOpacity>

//       {/* <TouchableOpacity
//         style={styles.signupButton}
//         onPress={() => navigation.navigate('Signup')}
//       >
//         <Text style={styles.signupText}>Sign Up</Text>
//       </TouchableOpacity> */}

//       <TouchableOpacity onPress={handleForgotPassword}>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 40,
//     color: '#FF00FF',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginBottom: 15,
//     width: '100%',
//   },
//   input: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 8,
//     width: '100%',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   forgotPassword: {
//     color: '#007bff',
//     marginTop: 10,
//   },
// });

// export default LoginScreen;

// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

// const Login = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (username === 'admin' && password === 'password123') {
//       Alert.alert('Login Successful');
//       navigation.navigate('Home');
//     } else {
//       Alert.alert('Login Failed', 'Redirecting to Signup');
//       navigation.navigate('Signup');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Signpost PhoneBook</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Login" onPress={handleLogin} />
//       <Text style={styles.forgotPassword} onPress={() => Alert.alert('Forgot Password')}>
//         Forgot Password?
//       </Text>
//       <Button
//         title="Signup"
//         onPress={() => navigation.navigate('Signup')}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   headerText:{
//     fontSize: 30,
//     fontWeight:'700',
//     color:'#FF00FF',
//     textAlign:'center',
//     marginBottom:5
//   },
//   input: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 8,
//   },
//   forgotPassword: {
//     color: 'blue',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
// });

// export default Login;

// =========================================== 2 set ============================================

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Button,
//   ActivityIndicator,
//   Image
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async() => {
//     if (password !== 'Signpost') {
//       Alert.alert('Invalid Password');
//       return;
//     }

//     try {
//       const response = await axios.post('https://signpostphonebook.in/client_login.php', {
//         mobileno,
//       });

//       if (response.data.valid) {
//         navigation.replace('Home');
//       } else {
//         Alert.alert('User not found', 'Please sign up.');
//         navigation.navigate('Signup');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to login. Try again later.');
//     }
//   };

//   const handleForgotPassword = () => {
//     Alert.alert('Forgot Password', 'Password recovery feature is coming soon!');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header Section: Logo and Signup Button */}
//       <View style={styles.headerContainer}>
//         <Image
//           source={{ uri: 'https://via.placeholder.com/100x50.png?text=Logo' }}
//           style={styles.logo}
//         />
//         <TouchableOpacity
//           style={styles.signupButton}
//           onPress={() => navigation.navigate('Signup')}
//         >
//           <Text style={styles.signupText}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.header}>Signpost Phonebook Login</Text>

//       {/* Username Input */}
//       <View style={styles.inputContainer}>
//         <Icon name="person" size={24} color="#666" />
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           value={username}
//           onChangeText={setUsername}
//         />
//       </View>

//       {/* Password Input */}
//       <View style={styles.inputContainer}>
//         <Icon name="lock" size={24} color="#666" />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//       </View>

//       {/* Login Button */}
//       <TouchableOpacity
//         style={styles.loginButton}
//         onPress={handleLogin}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator size="small" color="#fff" />
//         ) : (
//           <Text style={styles.loginButtonText}>Login</Text>
//         )}
//       </TouchableOpacity>

//       {/* Forgot Password */}
//       <TouchableOpacity onPress={handleForgotPassword}>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logo: {
//     width: 100,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   signupButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 8,
//   },
//   signupText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#FF00FF',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginBottom: 15,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   forgotPassword: {
//     color: '#007bff',
//     marginTop: 10,
//     textAlign: 'center',
//   },
// });

// export default LoginScreen;

// =========================================== 3 set ============================================

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Image
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const LoginScreen = ({ navigation }) => {
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const fixedPassword = 'phonebook'; // Fixed password defined by the developer

//   const handleLogin = async () => {
//     if (!phone) {
//       Alert.alert('Validation Error', 'Please enter your phone number.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('https://your-server-domain.com/login.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone }),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (data.success) {
//         // Validate password locally
//         if (fixedPassword === 'phonebook') {
//           Alert.alert('Login Successful');
//           navigation.navigate('Home');
//         } else {
//           Alert.alert('Error', 'Password mismatch');
//         }
//       } else {
//         Alert.alert('Error', data.message);
//       }
//     } catch (error) {
//       setLoading(false);
//       Alert.alert('Network Error', 'Failed to connect to the server.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header Section: Logo and Signup Button */}
//       <View style={styles.headerContainer}>
//         <Image
//           source={{ uri: 'https://via.placeholder.com/100x50.png?text=Logo' }}
//           style={styles.logo}
//         />
//         <TouchableOpacity
//           style={styles.signupButton}
//           onPress={() => navigation.navigate('Signup')}
//         >
//           <Text style={styles.signupText}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.header}>Signpost Phonebook Login</Text>

//       {/* Phone Number Input */}
//       <View style={styles.inputContainer}>
//         <Icon name="phone" size={24} color="#666" />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone Number"
//           keyboardType="phone-pad"
//           value={phone}
//           onChangeText={setPhone}
//         />
//       </View>

//       {/* Login Button */}
//       <TouchableOpacity
//         style={styles.loginButton}
//         onPress={handleLogin}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator size="small" color="#fff" />
//         ) : (
//           <Text style={styles.loginButtonText}>Login</Text>
//         )}
//       </TouchableOpacity>

//       {/* Forgot Password */}
//       <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Feature coming soon!')}>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logo: {
//     width: 100,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   signupButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 8,
//   },
//   signupText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#FF00FF',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginBottom: 15,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   forgotPassword: {
//     color: '#007bff',
//     marginTop: 10,
//     textAlign: 'center',
//   },
// });

// export default LoginScreen;

// =========================================== 4 set ============================================

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Image,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import axios from "axios";
// import logo from "../assets/icon.png";

// const LoginScreen = ({ navigation }) => {
//   const [mobileno, setMobileno] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!mobileno) {
//       Alert.alert("Error", "Please enter your mobile number.");
//       return;
//     }

//     if (password !== "Signpost") {
//       Alert.alert("Invalid Password", "Please enter the correct password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://signpostphonebook.in/client_login.php",
//         { mobileno }
//       );

//       setLoading(false);

//       if (response.data.valid) {
//         // Navigate to Home and pass the businessname
//         navigation.navigate("Home", {
//           businessname: response.data.businessname,
//         });
//       } else {
//         Alert.alert("User not found", "Please sign up.");
//         navigation.navigate("Signup");
//       }
//     } catch (error) {
//       setLoading(false);
//       Alert.alert("Error", "Unable to login. Please try again later.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Image source={logo} style={styles.logo} />
//         <TouchableOpacity
//           style={styles.signupButton}
//           onPress={() => navigation.navigate("Signup")}
//         >
//           <Text style={styles.signupText}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.header}>Signpost Phonebook Login</Text>

//       <View style={styles.inputContainer}>
//         <Icon name="phone" size={24} color="#666" />
//         <TextInput
//           style={styles.input}
//           placeholder="Mobile Number"
//           keyboardType="phone-pad"
//           maxLength={10}
//           value={mobileno}
//           onChangeText={setMobileno}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="lock" size={24} color="#666" />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//       </View>

//       <TouchableOpacity
//         style={styles.loginButton}
//         onPress={handleLogin}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator size="small" color="#fff" />
//         ) : (
//           <Text style={styles.loginButtonText}>Login</Text>
//         )}
//       </TouchableOpacity>
//       <View>
//         <TouchableOpacity
//           onPress={() => Alert.alert("Forgot Password", "Feature coming soon!")}
//         >
//           <Text style={styles.forgotPassword}>Forgot Password?</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   logo: {
//     width: 100,
//     height: 50,
//     resizeMode: "contain",
//   },
//   signupButton: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 8,
//   },
//   signupText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#FF00FF",
//     textAlign: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginBottom: 15,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   loginButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   forgotPassword: {
//     color: "#007bff",
//     marginTop: 10,
//     textAlign: "center",
//   },
// });

// export default LoginScreen;

============================================== Home page Backup ========================================
// ===== Updated Home page ========================
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
//   TextInput,
//   Modal,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { Ionicons } from "@expo/vector-icons";

// const HomePage = ({ route, navigation }) => {
//   const { businessname } = route.params;
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [firmName, setFirmName] = useState("");
//   const [productName, setProductName] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleMore = (customer) => {
//     setSelectedCustomer(customer);
//     setIsModalVisible(true);
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://signpostphonebook.in/client_fetch.php"
//       );
//       if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
//       const jsonResponse = await response.json();
//       if (Array.isArray(jsonResponse)) {
//         setData(jsonResponse.sort((a, b) => b.id - a.id));
//       } else {
//         Alert.alert("Error", "Unexpected response from server.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to load data: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchFirmData = async (name) => {
//     if (!name) return;
//     try {
//       const response = await fetch(
//         `https://signpostphonebook.in/client_fetch_byname.php?businessname=${name}`
//       );
//       if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
//       const jsonResponse = await response.json();
//       setData(Array.isArray(jsonResponse) ? jsonResponse : []);
//     } catch (error) {
//       Alert.alert("Error", "Failed to load firm data: " + error.message);
//     }
//   };

//   const fetchProductData = async (name) => {
//     if (!name) return;
//     try {
//       const response = await fetch(
//         `https://signpostphonebook.in/client_fetch_product.php?product=${name}`
//       );
//       if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
//       const jsonResponse = await response.json();
//       setData(Array.isArray(jsonResponse) ? jsonResponse : []);
//     } catch (error) {
//       Alert.alert("Error", "Failed to load product data: " + error.message);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (firmName) fetchFirmData(firmName);
//     else fetchData();
//   }, [firmName]);

//   useEffect(() => {
//     if (productName) fetchProductData(productName);
//     else fetchData();
//   }, [productName]);

//   const handleLogout = () => navigation.replace("Login");

//   const renderItem = ({ item }) => {
//     const maskedMobile = `${item.mobileno.slice(0, 5)}xxxx`;

//     return (
//       <View style={styles.card}>
//         <View style={styles.infoContainer}>
//           <Text style={styles.businessName}>{item.businessname}</Text>
//           <View style={styles.locationContainer}>
//             <Ionicons name="location-outline" size={16} color="#5d7dc0" />
//             <Text style={styles.locationText}>
//               {item.city}, {item.pincode}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.contactContainer}>
//           <Ionicons name="call-outline" size={24} color="#206ecf" />
//           <Text style={styles.mobile}>{maskedMobile}</Text>
//           <TouchableOpacity
//             style={styles.moreButton}
//             onPress={() => handleMore(item)}
//           >
//             <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
//             <Text style={styles.buttonText}>More</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
//         <Icon name="menu" size={24} color="black" />
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Icon name="logout" size={24} color="white" />
//       </TouchableOpacity>

//       <Text style={styles.welcome}>Welcome, {businessname}!</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Firm/Person"
//           value={firmName}
//           onChangeText={setFirmName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Product"
//           value={productName}
//           onChangeText={setProductName}
//         />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="royalblue" style={styles.loader} />
//       ) : (
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.list}
//         />
//       )}

//       <Modal visible={isModalVisible} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Customer Details</Text>
//             {selectedCustomer && (
//               <>
//                 <Text style={styles.modalText}>
//                   <Text style={styles.bold}>Name:</Text> {selectedCustomer.businessname}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   <Text style={styles.bold}>Address:</Text> {selectedCustomer.city}, {selectedCustomer.pincode}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   <Text style={styles.bold}>Product:</Text> {selectedCustomer.product}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   <Text style={styles.bold}>Mobile:</Text> {selectedCustomer.mobileno}
//                 </Text>
//               </>
//             )}
//             <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
//   card: {
//     flexDirection: "row",
//     padding: 16,
//     backgroundColor: "#fff",
//     margin: 10,
//     borderRadius: 10,
//   },
//   contactContainer: { flexDirection: "row", alignItems: "center" },
//   moreButton: {
//     flexDirection: "row",
//     backgroundColor: "#6c757d",
//     padding: 8,
//     borderRadius: 5,
//   },
//   modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
//   modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10 },
//   closeButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5 },
//   closeButtonText: { color: "#fff" },
// });

// export default HomePage;
// ================================== Drawer Home Page =====================
// import * as React from "react";
// import { Button, View } from "react-native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button
//         onPress={() => navigation.navigate("Notifications")}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function Home() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
===================================== Send SMS Backup ==========================================================
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Linking,
// } from "react-native";
// import axios from "axios";
// import RNPickerSelect from "react-native-picker-select";

// const SendSms = () => {
//   const [pincodes, setPincodes] = useState([]);
//   const [selectedPincode, setSelectedPincode] = useState("");
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusinesses, setSelectedBusinesses] = useState([]);

//   const messageBody = `Signpost Celfon Team, Wishes your Family A HAPPY & JOYOUS DEEPAVALI.
//       On this Joyful Occasion, we launch our SIGNPOST PHONE BOOK Mobile App, to help Micro Businesses to Promote their Business in their neighbour hood. Tap the link to access
//       WWW.signpostphonebook.in`;
//   useEffect(() => {
//     axios
//       .get("https://signpostphonebook.in/client_fetch_pincode.php")
//       .then((response) => setPincodes(response.data))
//       .catch((error) => console.error("Error fetching pincodes:", error));
//   }, []);

//   const fetchBusinesses = (pincode) => {
//     axios
//       .get(
//         `https://signpostphonebook.in/sms_client_details.php?pincode=${pincode}`
//       )
//       .then((response) => setBusinesses(response.data))
//       .catch((error) => console.error("Error fetching businesses:", error));
//   };

//   const toggleSelectBusiness = (business) => {
//     const isSelected = selectedBusinesses.some(
//       (b) => b.mobileno === business.mobileno
//     );
//     if (isSelected) {
//       setSelectedBusinesses((prev) =>
//         prev.filter((b) => b.mobileno !== business.mobileno)
//       );
//     } else {
//       setSelectedBusinesses((prev) => [...prev, business]);
//     }
//   };

//   const sendBatchSMS = () => {
//     if (selectedBusinesses.length === 0) {
//       Alert.alert("Please select at least one business!");
//       return;
//     }

//     let index = 0;

//     const sendNextSMS = () => {
//       if (index >= selectedBusinesses.length) {
//         Alert.alert("All messages have been sent!");
//         return;
//       }

//       const { prefix, businessname, mobileno } = selectedBusinesses[index];
//       const message = `Dear ${prefix} ${businessname}, Signpost Celfon Team, Wishes your Family A HAPPY & JOYOUS DEEPAVALI.
//       On this Joyful Occasion, we launch our SIGNPOST PHONE BOOK Mobile App, to help Micro Businesses to Promote their Business in their neighbour hood. Tap the link to access
//       WWW.signpostphonebook.in`;
//       const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(message)}`;

//       Linking.openURL(smsUrl).catch(() =>
//         Alert.alert("Error", `Could not open SMS application for ${mobileno}.`)
//       );

//       index++;
//       setTimeout(sendNextSMS, 5000); // Delay of 5 seconds between messages
//     };

//     sendNextSMS(); // Start the SMS sending process
//   };

//   return (
//     <View style={styles.container}>
//       <RNPickerSelect
//         onValueChange={(value) => {
//           setSelectedPincode(value);
//           fetchBusinesses(value);
//         }}
//         items={pincodes.map((pin) => ({
//           label: pin.pincode,
//           value: pin.pincode,
//         }))}
//         placeholder={{ label: "Select Pincode", value: null }}
//       />

//       <FlatList
//         data={businesses}
//         keyExtractor={(item) => item.mobileno}
//         renderItem={({ item }) => {
//           const isSelected = selectedBusinesses.some(
//             (b) => b.mobileno === item.mobileno
//           );

//           return (
//             <View style={styles.card}>
//               <View style={styles.cardContent}>
//                 <Text>
//                   {item.prefix} {item.businessname}
//                 </Text>
//                 <Text>{item.mobileno}</Text>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.toggleButton,
//                   isSelected ? styles.selectedButton : {},
//                 ]}
//                 onPress={() => toggleSelectBusiness(item)}
//               >
//                 <Text style={styles.buttonText}>
//                   {isSelected ? "Deselect" : "Select"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           );
//         }}
//       />

//       {selectedBusinesses.length > 0 && (
//         <Text style={styles.selectedMessage}>
//           Selected Businesses: {selectedBusinesses.length}
//         </Text>
//       )}

//       <TouchableOpacity style={styles.button} onPress={sendBatchSMS}>
//         <Text style={styles.buttonText}>Send SMS to Selected</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//     width: "100%",
//     marginVertical: 5,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//   },
//   cardContent: { flex: 1 },
//   toggleButton: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 8,
//   },
//   selectedButton: {
//     backgroundColor: "#0056b3",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   selectedMessage: {
//     marginTop: 10,
//     fontSize: 16,
//     textAlign: "center",
//     color: "#333",
//   },
// });

// export default SendSms;
// ================================ Code with template ===================

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Linking,
//   TextInput,
// } from "react-native";
// import axios from "axios";
// import RNPickerSelect from "react-native-picker-select";

// const SendSms = () => {
//   const [pincodes, setPincodes] = useState([]);
//   const [selectedPincode, setSelectedPincode] = useState("");
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusinesses, setSelectedBusinesses] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [customMessage, setCustomMessage] = useState("");

//   const templates = {
//     template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
//     On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
//     WWW.signpostphonebook.in`,

//     template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
//     WWW.signpostphonebook.in`,
//   };

//   useEffect(() => {
//     axios
//       .get("https://signpostphonebook.in/client_fetch_pincode.php")
//       .then((response) => setPincodes(response.data))
//       .catch((error) => console.error("Error fetching pincodes:", error));
//   }, []);

//   const fetchBusinesses = (pincode) => {
//     axios
//       .get(
//         `https://signpostphonebook.in/sms_client_details.php?pincode=${pincode}`
//       )
//       .then((response) => setBusinesses(response.data))
//       .catch((error) => console.error("Error fetching businesses:", error));
//   };

//   const toggleSelectBusiness = (business) => {
//     const isSelected = selectedBusinesses.some(
//       (b) => b.mobileno === business.mobileno
//     );
//     if (isSelected) {
//       setSelectedBusinesses((prev) =>
//         prev.filter((b) => b.mobileno !== business.mobileno)
//       );
//     } else {
//       setSelectedBusinesses((prev) => [...prev, business]);
//     }
//   };

//   const sendBatchSMS = () => {
//     if (selectedBusinesses.length === 0) {
//       Alert.alert("Please select at least one business!");
//       return;
//     }

//     let index = 0;

//     const sendNextSMS = () => {
//       if (index >= selectedBusinesses.length) {
//         Alert.alert("All messages have been sent!");
//         return;
//       }

//       const { prefix, businessname, mobileno } = selectedBusinesses[index];
//       const personalizedMessage = customMessage.replace(
//         "{name}",
//         `${prefix} ${businessname}`
//       );
//       const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
//         personalizedMessage
//       )}`;

//       Linking.openURL(smsUrl).catch(() =>
//         Alert.alert("Error", `Could not open SMS application for ${mobileno}.`)
//       );

//       index++;
//       setTimeout(sendNextSMS, 5000); // Delay of 5 seconds between messages
//     };

//     sendNextSMS();
//   };

//   return (
//     <View style={styles.container}>
//       <RNPickerSelect
//         onValueChange={(value) => {
//           setSelectedPincode(value);
//           fetchBusinesses(value);
//         }}
//         items={pincodes.map((pin) => ({
//           label: pin.pincode,
//           value: pin.pincode,
//         }))}
//         placeholder={{ label: "Select Pincode", value: null }}
//       />

//       <RNPickerSelect
//         onValueChange={(value) => {
//           setSelectedTemplate(value);
//           setCustomMessage(templates[value]);
//         }}
//         items={[
//           { label: "Template 1", value: "template1" },
//           { label: "Template 2", value: "template2" },
//         ]}
//         placeholder={{ label: "Select Template", value: null }}
//       />

//       <TextInput
//         style={styles.textArea}
//         value={customMessage}
//         onChangeText={(text) => setCustomMessage(text)}
//         multiline
//       />

//       <FlatList
//         data={businesses}
//         keyExtractor={(item) => item.mobileno}
//         renderItem={({ item }) => {
//           const isSelected = selectedBusinesses.some(
//             (b) => b.mobileno === item.mobileno
//           );

//           return (
//             <View style={styles.card}>
//               <View style={styles.cardContent}>
//                 <Text>
//                   {item.prefix} {item.businessname}
//                 </Text>
//                 <Text>{item.mobileno}</Text>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.toggleButton,
//                   isSelected ? styles.selectedButton : {},
//                 ]}
//                 onPress={() => toggleSelectBusiness(item)}
//               >
//                 <Text style={styles.buttonText}>
//                   {isSelected ? "Selected" : "Select"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           );
//         }}
//       />

//       {selectedBusinesses.length > 0 && (
//         <Text style={styles.selectedMessage}>
//           Selected Businesses: {selectedBusinesses.length}
//         </Text>
//       )}

//       <TouchableOpacity style={styles.button} onPress={sendBatchSMS}>
//         <Text style={styles.buttonText}>Send SMS to Selected</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   textArea: {
//     height: 100,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginTop: 10,
//     padding: 10,
//   },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//     width: "100%",
//     marginVertical: 5,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//   },
//   cardContent: { flex: 1 },
//   toggleButton: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 8,
//   },
//   selectedButton: {
//     backgroundColor: "#3b8132",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   selectedMessage: {
//     marginTop: 10,
//     fontSize: 16,
//     textAlign: "center",
//     color: "#333",
//   },
// });

// export default SendSms;

// // =================================== code with Input box =====================
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Linking,
//   TextInput,
// } from "react-native";
// import axios from "axios";

// const SendSms = () => {
//   const [pincodes, setPincodes] = useState([]);
//   const [filteredPincodes, setFilteredPincodes] = useState([]);
//   const [selectedPincode, setSelectedPincode] = useState("");
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusinesses, setSelectedBusinesses] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [customMessage, setCustomMessage] = useState("");

//   const templates = {
//     template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
//     On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
//     WWW.signpostphonebook.in`,

//     template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
//     WWW.signpostphonebook.in`,
//   };

//   useEffect(() => {
//     axios
//       .get("https://signpostphonebook.in/client_fetch_pincode.php")
//       .then((response) => {
//         setPincodes(response.data);
//         setFilteredPincodes(response.data); // Initialize filtered list
//       })
//       .catch((error) => console.error("Error fetching pincodes:", error));
//   }, []);

//   const fetchBusinesses = (pincode) => {
//     axios
//       .get(
//         `https://signpostphonebook.in/sms_client_details.php?pincode=${pincode}`
//       )
//       .then((response) => setBusinesses(response.data))
//       .catch((error) => console.error("Error fetching businesses:", error));
//   };

//   const handlePincodeSearch = (text) => {
//     setSelectedPincode(text);
//     const filtered = pincodes.filter((pin) => pin.pincode.includes(text));
//     setFilteredPincodes(filtered);
//   };

//   const toggleSelectBusiness = (business) => {
//     const isSelected = selectedBusinesses.some(
//       (b) => b.mobileno === business.mobileno
//     );
//     if (isSelected) {
//       setSelectedBusinesses((prev) =>
//         prev.filter((b) => b.mobileno !== business.mobileno)
//       );
//     } else {
//       setSelectedBusinesses((prev) => [...prev, business]);
//     }
//   };

//   const sendBatchSMS = () => {
//     if (selectedBusinesses.length === 0) {
//       Alert.alert("Please select at least one business!");
//       return;
//     }

//     let index = 0;

//     const sendNextSMS = () => {
//       if (index >= selectedBusinesses.length) {
//         Alert.alert("All messages have been sent!");
//         return;
//       }

//       const { prefix, businessname, mobileno } = selectedBusinesses[index];
//       const personalizedMessage = customMessage.replace(
//         "{name}",
//         `${prefix} ${businessname}`
//       );
//       const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
//         personalizedMessage
//       )}`;

//       Linking.openURL(smsUrl).catch(() =>
//         Alert.alert("Error", `Could not open SMS application for ${mobileno}.`)
//       );

//       index++;
//       setTimeout(sendNextSMS, 5000); // Delay of 5 seconds between messages
//     };

//     sendNextSMS();
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.textInput}
//         placeholder="Search Pincode"
//         value={selectedPincode}
//         onChangeText={handlePincodeSearch}
//       />

//       <FlatList
//         data={filteredPincodes}
//         keyExtractor={(item) => item.pincode}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.pincodeItem}
//             onPress={() => {
//               setSelectedPincode(item.pincode);
//               fetchBusinesses(item.pincode);
//             }}
//           >
//             <Text>{item.pincode}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <TextInput
//         style={styles.textArea}
//         value={customMessage}
//         onChangeText={(text) => setCustomMessage(text)}
//         multiline
//       />

//       <FlatList
//         data={businesses}
//         keyExtractor={(item) => item.mobileno}
//         renderItem={({ item }) => {
//           const isSelected = selectedBusinesses.some(
//             (b) => b.mobileno === item.mobileno
//           );

//           return (
//             <View style={styles.card}>
//               <View style={styles.cardContent}>
//                 <Text>
//                   {item.prefix} {item.businessname}
//                 </Text>
//                 <Text>{item.mobileno}</Text>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.toggleButton,
//                   isSelected ? styles.selectedButton : {},
//                 ]}
//                 onPress={() => toggleSelectBusiness(item)}
//               >
//                 <Text style={styles.buttonText}>
//                   {isSelected ? "Selected" : "Select"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           );
//         }}
//       />

//       {selectedBusinesses.length > 0 && (
//         <Text style={styles.selectedMessage}>
//           Selected Businesses: {selectedBusinesses.length}
//         </Text>
//       )}

//       <TouchableOpacity style={styles.button} onPress={sendBatchSMS}>
//         <Text style={styles.buttonText}>Send SMS to Selected</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   textInput: {
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   textArea: {
//     height: 100,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginTop: 10,
//     padding: 10,
//   },
//   pincodeItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//     width: "100%",
//     marginVertical: 5,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//   },
//   cardContent: { flex: 1 },
//   toggleButton: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 8,
//   },
//   selectedButton: {
//     backgroundColor: "#3b8132",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   selectedMessage: {
//     marginTop: 10,
//     fontSize: 16,
//     textAlign: "center",
//     color: "#333",
//   },
// });

// export default SendSms;
// =============================== send sms with input box ===================================
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Linking,
//   TextInput,
// } from "react-native";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons"; // Icon for search button (requires expo/vector-icons)
// import RNPickerSelect from "react-native-picker-select";

// const SendSms = () => {
//   const [pincodeInput, setPincodeInput] = useState(""); // Input for pincode
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusinesses, setSelectedBusinesses] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [customMessage, setCustomMessage] = useState("");

//   const templates = {
//     template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
//     On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
//     WWW.signpostphonebook.in`,

//     template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
//     WWW.signpostphonebook.in`,
//   };

//   const fetchBusinesses = () => {
//     if (!pincodeInput) {
//       Alert.alert("Please enter a valid pincode.");
//       return;
//     }

//     axios
//       .get(
//         `https://signpostphonebook.in/sms_client_details.php?pincode=${pincodeInput}`
//       )
//       .then((response) => setBusinesses(response.data))
//       .catch((error) => console.error("Error fetching businesses:", error));
//   };

//   const toggleSelectBusiness = (business) => {
//     const isSelected = selectedBusinesses.some(
//       (b) => b.mobileno === business.mobileno
//     );
//     if (isSelected) {
//       setSelectedBusinesses((prev) =>
//         prev.filter((b) => b.mobileno !== business.mobileno)
//       );
//     } else {
//       setSelectedBusinesses((prev) => [...prev, business]);
//     }
//   };

//   const sendBatchSMS = () => {
//     if (selectedBusinesses.length === 0) {
//       Alert.alert("Please select at least one business!");
//       return;
//     }

//     let index = 0;

//     const sendNextSMS = () => {
//       if (index >= selectedBusinesses.length) {
//         Alert.alert("All messages have been sent!");
//         return;
//       }

//       const { prefix, businessname, mobileno } = selectedBusinesses[index];
//       const personalizedMessage = customMessage.replace(
//         "{name}",
//         `${prefix} ${businessname}`
//       );
//       const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
//         personalizedMessage
//       )}`;

//       Linking.openURL(smsUrl).catch(() =>
//         Alert.alert("Error", `Could not open SMS application for ${mobileno}.`)
//       );

//       index++;
//       setTimeout(sendNextSMS, 5000); // Delay of 5 seconds between messages
//     };

//     sendNextSMS();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.pincodeInputContainer}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Enter Pincode"
//           maxLength={6}
//           value={pincodeInput}
//           onChangeText={setPincodeInput}
//           keyboardType="numeric"
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={fetchBusinesses}>
//           <Ionicons name="search" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <RNPickerSelect
//         onValueChange={(value) => {
//           setSelectedTemplate(value);
//           setCustomMessage(templates[value]);
//         }}
//         items={[
//           { label: "Template 1", value: "template1" },
//           { label: "Template 2", value: "template2" },
//         ]}
//         placeholder={{ label: "Select Template", value: null }}
//       />

//       <TextInput
//         style={styles.textArea}
//         value={customMessage}
//         onChangeText={(text) => setCustomMessage(text)}
//         multiline
//       />

//       <FlatList
//         data={businesses}
//         keyExtractor={(item) => item.mobileno}
//         renderItem={({ item }) => {
//           const isSelected = selectedBusinesses.some(
//             (b) => b.mobileno === item.mobileno
//           );

//           return (
//             <View style={styles.card}>
//               <View style={styles.cardContent}>
//                 <Text>
//                   {item.prefix} {item.businessname}
//                 </Text>
//                 <Text>{item.mobileno}</Text>
//               </View>
//               <TouchableOpacity onPress={() => toggleSelectBusiness(item)}>
//                 <Ionicons
//                   name={isSelected ? "checkmark-circle" : "add-circle"}
//                   size={30}
//                   color={isSelected ? "#3b8132" : "#007bff"}
//                 />
//               </TouchableOpacity>
//             </View>
//           );
//         }}
//       />

//       {selectedBusinesses.length > 0 && (
//         <Text style={styles.selectedMessage}>
//           Selected Businesses: {selectedBusinesses.length}
//         </Text>
//       )}

//       <TouchableOpacity style={styles.button} onPress={sendBatchSMS}>
//         <Text style={styles.buttonText}>Send SMS to Selected</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   pincodeInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   textInput: {
//     flex: 1,
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   searchButton: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     marginLeft: 10,
//     borderRadius: 8,
//   },
//   textArea: {
//     height: 100,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginTop: 10,
//     padding: 10,
//   },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//     width: "100%",
//     marginVertical: 5,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//   },
//   cardContent: { flex: 1 },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   selectedMessage: {
//     marginTop: 10,
//     fontSize: 16,
//     textAlign: "center",
//     color: "#333",
//   },
// });

// export default SendSms;
// ===========================use icons instead of Buttons =================================
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Linking,
//   TextInput,
// } from "react-native";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons"; // Icons from Ionicons
// import RNPickerSelect from "react-native-picker-select";

// const SendSms = () => {
//   const [pincodeInput, setPincodeInput] = useState(""); // Input for pincode
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusinesses, setSelectedBusinesses] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [customMessage, setCustomMessage] = useState("");

//   const templates = {
//     template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
//     On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
//     WWW.signpostphonebook.in`,

//     template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
//     WWW.signpostphonebook.in`,
//   };

//   const fetchBusinesses = () => {
//     if (!pincodeInput) {
//       Alert.alert("Please enter a valid pincode.");
//       return;
//     }

//     axios
//       .get(
//         `https://signpostphonebook.in/sms_client_details.php?pincode=${pincodeInput}`
//       )
//       .then((response) => setBusinesses(response.data))
//       .catch((error) => console.error("Error fetching businesses:", error));
//   };

//   const toggleSelectBusiness = (business) => {
//     const isSelected = selectedBusinesses.some(
//       (b) => b.mobileno === business.mobileno
//     );
//     if (isSelected) {
//       setSelectedBusinesses((prev) =>
//         prev.filter((b) => b.mobileno !== business.mobileno)
//       );
//     } else {
//       setSelectedBusinesses((prev) => [...prev, business]);
//     }
//   };

//   const sendBatchSMS = () => {
//     if (selectedBusinesses.length === 0) {
//       Alert.alert("Please select at least one business!");
//       return;
//     }

//     let index = 0;

//     const sendNextSMS = () => {
//       if (index >= selectedBusinesses.length) {
//         Alert.alert("All messages have been sent!");
//         return;
//       }

//       const { prefix, businessname, mobileno } = selectedBusinesses[index];
//       const personalizedMessage = customMessage.replace(
//         "{name}",
//         `${prefix} ${businessname}`
//       );
//       const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
//         personalizedMessage
//       )}`;

//       Linking.openURL(smsUrl).catch(() =>
//         Alert.alert("Error", `Could not open SMS application for ${mobileno}.`)
//       );

//       index++;
//       setTimeout(sendNextSMS, 5000); // Delay of 5 seconds between messages
//     };

//     sendNextSMS();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.pincodeInputContainer}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Enter Pincode"
//           maxLength={6}
//           value={pincodeInput}
//           onChangeText={setPincodeInput}
//           keyboardType="numeric"
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={fetchBusinesses}>
//           <Ionicons name="search" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <RNPickerSelect
//         onValueChange={(value) => {
//           setSelectedTemplate(value);
//           setCustomMessage(templates[value]);
//         }}
//         items={[
//           { label: "Template 1", value: "template1" },
//           { label: "Template 2", value: "template2" },
//         ]}
//         placeholder={{ label: "Select Template", value: null }}
//       />

//       <TextInput
//         style={styles.textArea}
//         value={customMessage}
//         onChangeText={(text) => setCustomMessage(text)}
//         multiline
//       />

//       <FlatList
//         data={businesses}
//         keyExtractor={(item) => item.mobileno}
//         renderItem={({ item }) => {
//           const isSelected = selectedBusinesses.some(
//             (b) => b.mobileno === item.mobileno
//           );

//           return (
//             <View style={styles.card}>
//               <View style={styles.cardContent}>
//                 <Text>
//                   {item.prefix} {item.businessname}
//                 </Text>
//                 <Text>{item.mobileno}</Text>
//               </View>
//               <TouchableOpacity onPress={() => toggleSelectBusiness(item)}>
//                 <Ionicons
//                   name={isSelected ? "checkmark-circle" : "add-circle"}
//                   size={30}
//                   color={isSelected ? "#3b8132" : "#007bff"}
//                 />
//               </TouchableOpacity>
//             </View>
//           );
//         }}
//       />

//       {selectedBusinesses.length > 0 && (
//         <Text style={styles.selectedMessage}>
//           Selected Businesses: {selectedBusinesses.length}
//         </Text>
//       )}

//       <TouchableOpacity style={styles.button} onPress={sendBatchSMS}>
//         <Text style={styles.buttonText}>Send SMS to Selected</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   pincodeInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   textInput: {
//     flex: 1,
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   searchButton: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     marginLeft: 10,
//     borderRadius: 8,
//   },
//   textArea: {
//     height: 100,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginTop: 10,
//     padding: 10,
//   },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//     width: "100%",
//     marginVertical: 5,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//   },
//   cardContent: { flex: 1 },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   selectedMessage: {
//     marginTop: 10,
//     fontSize: 16,
//     textAlign: "center",
//     color: "#333",
//   },
// });
// export default SendSms;
// ============================ With prefix ===========================
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Linking,
//   TextInput,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons";
// import RNPickerSelect from "react-native-picker-select";

// const SendSms = () => {
//   const [pincodeInput, setPincodeInput] = useState("");
//   const [businesses, setBusinesses] = useState([]);
//   const [prefixes, setPrefixes] = useState([]); // Store prefix list from API
//   const [selectedPrefix, setSelectedPrefix] = useState(null); // Selected prefix
//   const [selectedBusinesses, setSelectedBusinesses] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [customMessage, setCustomMessage] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state for API calls

//   const templates = {
//     template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
//     On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
//     WWW.signpostphonebook.in`,

//     template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
//     WWW.signpostphonebook.in`,
//   };

//   // Fetch prefixes from API on component mount
//   useEffect(() => {
//     axios
//       .get("https://signpostphonebook.in/client_get_prefix.php")
//       .then((response) => {
//         console.log("API Response:", response.data); // Inspect the response here
//         if (Array.isArray(response.data)) {
//           setPrefixes(response.data);
//         } else {
//           console.error("Unexpected response format:", response.data);
//         }
//       })
//       .catch((error) => console.error("Error fetching prefixes:", error));
//   }, []);

//   const fetchBusinesses = () => {
//     if (!pincodeInput || !selectedPrefix) {
//       Alert.alert("Please enter a valid pincode and select a prefix.");
//       return;
//     }

//     setLoading(true);
//     axios
//       .get(
//         `https://signpostphonebook.in/sms_client_details.php?pincode=${pincodeInput}&prefix=${selectedPrefix}`
//       )
//       .then((response) => setBusinesses(response.data))
//       .catch((error) => console.error("Error fetching businesses:", error))
//       .finally(() => setLoading(false));
//   };

//   const toggleSelectBusiness = (business) => {
//     const isSelected = selectedBusinesses.some(
//       (b) => b.mobileno === business.mobileno
//     );
//     if (isSelected) {
//       setSelectedBusinesses((prev) =>
//         prev.filter((b) => b.mobileno !== business.mobileno)
//       );
//     } else {
//       setSelectedBusinesses((prev) => [...prev, business]);
//     }
//   };

//   const sendBatchSMS = () => {
//     if (selectedBusinesses.length === 0) {
//       Alert.alert("Please select at least one business!");
//       return;
//     }

//     let index = 0;

//     const sendNextSMS = () => {
//       if (index >= selectedBusinesses.length) {
//         Alert.alert("All messages have been sent!");
//         return;
//       }

//       const { prefix, businessname, mobileno } = selectedBusinesses[index];
//       const personalizedMessage = customMessage.replace(
//         "{name}",
//         `${prefix} ${businessname}`
//       );
//       const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
//         personalizedMessage
//       )}`;

//       Linking.openURL(smsUrl).catch(() =>
//         Alert.alert("Error", `Could not open SMS application for ${mobileno}.`)
//       );

//       index++;
//       setTimeout(sendNextSMS, 5000); // Delay of 5 seconds between messages
//     };

//     sendNextSMS();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Enter Pincode"
//           maxLength={6}
//           value={pincodeInput}
//           onChangeText={setPincodeInput}
//           keyboardType="numeric"
//         />
//         <RNPickerSelect
//           onValueChange={(value) => setSelectedPrefix(value)}
//           items={
//             prefixes.length > 0
//               ? prefixes.map((prefix) => ({
//                   label: prefix.name,
//                   value: prefix.code,
//                 }))
//               : []
//           }
//           placeholder={{ label: "Select Prefix", value: null }}
//           style={pickerSelectStyles}
//         />

//         <TouchableOpacity style={styles.searchButton} onPress={fetchBusinesses}>
//           <Ionicons name="search" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <RNPickerSelect
//         onValueChange={(value) => {
//           setSelectedTemplate(value);
//           setCustomMessage(templates[value]);
//         }}
//         items={[
//           { label: "Template 1", value: "template1" },
//           { label: "Template 2", value: "template2" },
//         ]}
//         placeholder={{ label: "Select Template", value: null }}
//         style={pickerSelectStyles}
//       />

//       <TextInput
//         style={styles.textArea}
//         value={customMessage}
//         onChangeText={(text) => setCustomMessage(text)}
//         multiline
//       />

//       {loading ? (
//         <ActivityIndicator size="large" color="#007bff" />
//       ) : (
//         <FlatList
//           data={businesses}
//           keyExtractor={(item) => item.mobileno}
//           renderItem={({ item }) => {
//             const isSelected = selectedBusinesses.some(
//               (b) => b.mobileno === item.mobileno
//             );

//             return (
//               <View style={styles.card}>
//                 <View style={styles.cardContent}>
//                   <Text>
//                     {item.prefix} {item.businessname}
//                   </Text>
//                   <Text>{item.mobileno}</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => toggleSelectBusiness(item)}>
//                   <Ionicons
//                     name={isSelected ? "checkmark-circle" : "add-circle"}
//                     size={30}
//                     color={isSelected ? "#3b8132" : "#007bff"}
//                   />
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         />
//       )}

//       {selectedBusinesses.length > 0 && (
//         <Text style={styles.selectedMessage}>
//           Selected Businesses: {selectedBusinesses.length}
//         </Text>
//       )}

//       <TouchableOpacity style={styles.button} onPress={sendBatchSMS}>
//         <Text style={styles.buttonText}>Send SMS to Selected</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   textInput: {
//     flex: 1,
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   searchButton: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     marginLeft: 10,
//     borderRadius: 8,
//   },
//   textArea: {
//     height: 100,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginTop: 10,
//     padding: 10,
//   },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//     marginVertical: 5,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//   },
//   cardContent: { flex: 1 },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   selectedMessage: { marginTop: 10, fontSize: 16, textAlign: "center" },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: { color: "black", padding: 10 },
//   inputAndroid: { color: "black" },
// });

// export default SendSms;

// ============================================= with dropdown and Picode search =====================
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Linking,
//   TextInput,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons";
// import RNPickerSelect from "react-native-picker-select";

// const SendSms = () => {
//   const [pincodeInput, setPincodeInput] = useState("");
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusinesses, setSelectedBusinesses] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [customMessage, setCustomMessage] = useState("");
//   const [prefixes, setPrefixes] = useState([]);
//   const [selectedPrefix, setSelectedPrefix] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const templates = {
//     template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
//     On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
//     WWW.signpostphonebook.in`,

//     template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
//     WWW.signpostphonebook.in`,
//   };

//   // Fetch prefixes on component mount
//   useEffect(() => {
//     axios
//       .get("https://signpostphonebook.in/client_get_prefix.php")
//       .then((response) => setPrefixes(response.data))
//       .catch((error) => console.error("Error fetching prefixes:", error));
//   }, []);

//   const fetchBusinesses = () => {
//     if (!pincodeInput || !selectedPrefix) {
//       Alert.alert("Please enter a valid pincode and select a prefix.");
//       return;
//     }

//     setLoading(true);
//     axios
//       .get(
//         `https://signpostphonebook.in/sms_client_details.php?pincode=${pincodeInput}&prefix=${selectedPrefix}`
//       )
//       .then((response) => setBusinesses(response.data))
//       .catch((error) => console.error("Error fetching businesses:", error))
//       .finally(() => setLoading(false));
//   };

//   const toggleSelectBusiness = (business) => {
//     const isSelected = selectedBusinesses.some(
//       (b) => b.mobileno === business.mobileno
//     );
//     if (isSelected) {
//       setSelectedBusinesses((prev) =>
//         prev.filter((b) => b.mobileno !== business.mobileno)
//       );
//     } else {
//       setSelectedBusinesses((prev) => [...prev, business]);
//     }
//   };

//   const sendBatchSMS = () => {
//     if (selectedBusinesses.length === 0) {
//       Alert.alert("Please select at least one business!");
//       return;
//     }

//     let index = 0;

//     const sendNextSMS = () => {
//       if (index >= selectedBusinesses.length) {
//         Alert.alert("All messages have been sent!");
//         return;
//       }

//       const { prefix, businessname, mobileno } = selectedBusinesses[index];
//       const personalizedMessage = customMessage.replace(
//         "{name}",
//         `${prefix} ${businessname}`
//       );
//       const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
//         personalizedMessage
//       )}`;

//       Linking.openURL(smsUrl).catch(() =>
//         Alert.alert("Error", `Could not open SMS application for ${mobileno}.`)
//       );

//       index++;
//       setTimeout(sendNextSMS, 5000);
//     };

//     sendNextSMS();
//   };

//   return (
//     <View style={styles.container}>
//       <RNPickerSelect
//         onValueChange={(value) => setSelectedPrefix(value)}
//         items={prefixes.map((prefix) => ({
//           label: prefix.name,
//           value: prefix.name,
//         }))}
//         placeholder={{ label: "Select Prefix", value: null }}
//       />

//       <View style={styles.pincodeInputContainer}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Enter Pincode"
//           maxLength={6}
//           value={pincodeInput}
//           onChangeText={setPincodeInput}
//           keyboardType="numeric"
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={fetchBusinesses}>
//           <Ionicons name="search" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <RNPickerSelect
//         onValueChange={(value) => {
//           setSelectedTemplate(value);
//           setCustomMessage(templates[value]);
//         }}
//         items={[
//           { label: "Template 1", value: "template1" },
//           { label: "Template 2", value: "template2" },
//         ]}
//         placeholder={{ label: "Select Template", value: null }}
//       />

//       <TextInput
//         style={styles.textArea}
//         value={customMessage}
//         onChangeText={(text) => setCustomMessage(text)}
//         multiline
//       />

//       {loading ? (
//         <ActivityIndicator size="large" color="#007bff" />
//       ) : (
//         <FlatList
//           data={businesses}
//           keyExtractor={(item) => item.mobileno}
//           renderItem={({ item }) => {
//             const isSelected = selectedBusinesses.some(
//               (b) => b.mobileno === item.mobileno
//             );

//             return (
//               <View style={styles.card}>
//                 <View style={styles.cardContent}>
//                   <Text>
//                     {item.prefix} {item.businessname}
//                   </Text>
//                   <Text>{item.mobileno}</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => toggleSelectBusiness(item)}>
//                   <Ionicons
//                     name={isSelected ? "checkmark-circle" : "add-circle"}
//                     size={30}
//                     color={isSelected ? "#3b8132" : "#007bff"}
//                   />
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         />
//       )}

//       {selectedBusinesses.length > 0 && (
//         <Text style={styles.selectedMessage}>
//           Selected Businesses: {selectedBusinesses.length}
//         </Text>
//       )}

//       <TouchableOpacity style={styles.button} onPress={sendBatchSMS}>
//         <Text style={styles.buttonText}>Send SMS to Selected</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   pincodeInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   textInput: {
//     flex: 1,
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   searchButton: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     marginLeft: 10,
//     borderRadius: 8,
//   },
//   textArea: {
//     height: 100,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginTop: 10,
//     padding: 10,
//   },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//     width: "100%",
//     marginVertical: 5,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//   },
//   cardContent: { flex: 1 },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   selectedMessage: {
//     marginTop: 10,
//     fontSize: 16,
//     textAlign: "center",
//     color: "#333",
//   },
// });

// export default SendSms;

====================================================== Signup Backup =================================
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Button,
// } from "react-native";
// import RNPickerSelect from "react-native-picker-select";

// import axios from "axios";

// const Signup = ({ navigation }) => {
//   const [mybusinessname, setBusinessname] = useState("");
//   const [mydoorno, setDoorno] = useState("");
//   const [mycity, setCity] = useState("");
//   const [mypincode, setPincode] = useState("");
//   const [myproduct, setProduct] = useState("");
//   const [mylandLine, setLandLine] = useState("");
//   const [myLcode, setLcode] = useState("");
//   const [myemail, setEmail] = useState("");
//   const [myprefix, setPrefix] = useState("");
//   const [mymobileno, setMobileno] = useState("");

//   const insertRecord = async () => {
//     const Data = {
//       businessname: mybusinessname, // Ensure field name matches backend expectations
//       doorno: mydoorno,
//       city: mycity,
//       pincode: mypincode,
//       prefix: myprefix,
//       mobileno: mymobileno,
//       email: myemail,
//       product: myproduct,
//       landline: mylandLine,
//       lcode: myLcode,
//     };

//     console.log("Sending Data:", Data); // Debugging: Ensure correct data structure

//     try {
//       const response = await fetch(
//         "https://signpostphonebook.in/client_insert.php",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(Data),
//         }
//       );

//       const contentType = response.headers.get("content-type");
//       if (contentType && contentType.includes("application/json")) {
//         const jsonResponse = await response.json();
//         console.log("Server Response:", jsonResponse);

//         if (jsonResponse.Message) {
//           alert(jsonResponse.Message);
//         } else {
//           alert("Unexpected response from server.");
//         }
//       } else {
//         const textResponse = await response.text();
//         alert(textResponse);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       alert("Error: " + error.message);
//     }

//     navigation.navigate("Login");
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Signpost Phonebook</Text>
//       <View style={styles.formContainer}>
//         <ScrollView>
//           <Text style={styles.label}>Mobile Number : </Text>
//           <TextInput
//             placeholder="Mobile Number"
//             keyboardType="number-pad"
//             maxLength={10}
//             style={styles.input}
//             onChangeText={(text) => setMobileno(text)}
//           />

//           <Text style={styles.label}>Name / Business Name : </Text>
//           <TextInput
//             placeholder="Name/Business Name"
//             style={styles.input}
//             onChangeText={(text) => setBusinessname(text)}
//           />
//           <Text style={styles.label}>Prefix : </Text>
//           <RNPickerSelect
//             onValueChange={(value) => setPrefix(value)}
//             items={[
//               { label: "Mr.", value: "Mr." },
//               { label: "Ms.", value: "Ms." },
//               { label: "M/s.", value: "M/s." },
//             ]}
//             placeholder={{ label: "Select Prefix", value: "" }}
//             style={styles.inputAndroid}
//           />

//           <Text style={styles.label}>Address : </Text>
//           <TextInput
//             placeholder="Address"
//             style={[styles.input, { height: 80 }]}
//             multiline
//             onChangeText={(text) => setDoorno(text)}
//           />

//           <Text style={styles.label}>City : </Text>
//           <TextInput
//             placeholder="City"
//             style={styles.input}
//             onChangeText={(text) => setCity(text)}
//           />

//           <Text style={styles.label}>Pincode : </Text>
//           <TextInput
//             placeholder="pincode"
//             keyboardType="number-pad"
//             maxLength={6}
//             style={styles.input}
//             onChangeText={(text) => setPincode(text)}
//           />

//           <Text style={styles.label}>Product / Service : </Text>
//           <TextInput
//             placeholder="Product"
//             style={styles.input}
//             onChangeText={(text) => setProduct(text)}
//           />

//           <Text style={styles.label}>Landline Number : </Text>
//           <TextInput
//             placeholder="Landline Number"
//             keyboardType="number-pad"
//             style={styles.input}
//             onChangeText={(text) => setLandLine(text)}
//           />

//           <Text style={styles.label}>STD Code : </Text>
//           <TextInput
//             placeholder="STD Code"
//             keyboardType="number-pad"
//             style={styles.input}
//             onChangeText={(text) => setLcode(text)}
//           />

//           <Text style={styles.label}>Email : </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="example@mail.com"
//             keyboardType="email-address"
//             value={myemail}
//             onChangeText={(text) => setEmail(text)}
//             autoCapitalize="none"
//           />

//           <TouchableOpacity style={styles.button} onPress={insertRecord}>
//             <Text style={styles.buttonText}>Submit</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//       <Button
//         title="Already Have an Account? Login"
//         onpress={() => {
//           navigation.navigate("Login");
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "royalblue",
//   },
//   inputAndroid: {
//     borderWidth: 3,
//     borderColor: "#000000",
//   },
//   headerText: {
//     textAlign: "center",
//     fontSize: 50,
//     fontWeight: "500",
//     color: "#ffffff",
//   },
//   formContainer: {
//     flex: 1,
//     backgroundColor: "#D3D3D3",
//     borderTopLeftRadius: 300,
//     padding: 20,
//     marginTop: "10%",
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "700",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#000000",
//     borderRadius: 5,
//     marginVertical: 8,
//     paddingHorizontal: 10,
//     height: 50,
//   },
//   button: {
//     backgroundColor: "royalblue",
//     borderRadius: 5,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputAndroid: {
//     borderColor: "#blue",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginVertical: 8,
//     height: 50,
//     justifyContent: "center",
//   },
// });

// export default Signup;


===================================== Drawer Content BackUp Code ============================================================
// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import Icon from "react-native-vector-icons/Ionicons";

// export default function CustomDrawerContent(props) {
//   const { businessname } = props.initialParams; // Access businessname

//   const handleLogout = () => {
//     props.navigation.navigate("Login");
//   };
//   return (
//     <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
//       <View style={styles.header}>
//         <Image
//           source={{ uri: "https://via.placeholder.com/40" }}
//           style={styles.logo}
//         />
//         <Text style={styles.brand}>{businessname}!</Text>
//       </View>

//       <View style={styles.menu}>
//         <DrawerItem
//           label="Home"
//           icon={() => <Icon name="home-outline" size={20} color="#fff" />}
//           onPress={() => props.navigation.navigate("Home")}
//           labelStyle={styles.label}
//         />
//         <DrawerItem
//           label="MediaPartner"
//           icon={() => <Icon name="book-outline" size={20} color="#f5365c" />}
//           onPress={() => props.navigation.navigate("MediaPartner")}
//           labelStyle={styles.label}
//         />
//         {/* <DrawerItem
//           label="Components"
//           icon={() => <Icon name="construct-outline" size={20} color="#11cdef" />}
//           onPress={() => alert('Components')}
//           labelStyle={styles.label}
//         /> */}
//         <DrawerItem
//           label="SendSMS"
//           icon={() => (
//             <Icon name="document-text-outline" size={20} color="#5e72e4" />
//           )}
//           onPress={() => props.navigation.navigate("SendSms")}
//           labelStyle={styles.label}
//         />
//         <DrawerItem
//           label="Profile"
//           icon={() => <Icon name="person-outline" size={20} color="#f5365c" />}
//           onPress={() => props.navigation.navigate("Profile")}
//           labelStyle={styles.label}
//         />
//         <DrawerItem
//           label="Account"
//           icon={() => (
//             <Icon name="settings-outline" size={20} color="#11cdef" />
//           )}
//           onPress={() => alert("Account")}
//           labelStyle={styles.label}
//         />
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.footerTitle}>Documentation</Text>
//         <DrawerItem
//           label="Getting started"
//           icon={() => <Icon name="rocket-outline" size={20} color="#fff" />}
//           onPress={() => alert("Getting Started")}
//           labelStyle={styles.footerLabel}
//         />
//         <DrawerItem
//           label="Logout"
//           icon={() => <Icon name="log-out-outline" size={20} color="#f5365c" />}
//           onPress={handleLogout}
//           labelStyle={styles.footerLabel}
//         />
//       </View>
//     </DrawerContentScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#5e72e4",
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   brand: {
//     marginLeft: 10,
//     fontSize: 20,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   menu: {
//     flex: 1,
//     backgroundColor: "#32325d",
//     paddingVertical: 10,
//   },
//   label: {
//     color: "#fff",
//     marginLeft: -20,
//   },
//   footer: {
//     borderTopWidth: 1,
//     borderTopColor: "#fff",
//     paddingVertical: 10,
//     backgroundColor: "#32325d",
//   },
//   footerTitle: {
//     color: "#8898aa",
//     marginLeft: 20,
//     marginVertical: 5,
//   },
//   footerLabel: {
//     color: "#fff",
//     marginLeft: -20,
//   },
// });