import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const Datas = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    businessname: '',
    city: '',
    product: '',
  });

  const fetchData = async () => {
    try {
      const response = await fetch('https://signpostphonebook.in/client_fetch_for_new_database.php');
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();

      if (Array.isArray(result)) {
        setData(result); // Always update the main data
        if (!searchQuery.trim()) {
          setFilteredData(result); // Only update filtered data if no search query is active
        }
      } else {
        throw new Error('Invalid data structure received');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data.');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredData(data); // Reset to all data if search query is empty
    } else {
      const filtered = data.filter((entry) =>
        entry.businessname.toLowerCase().includes(query.toLowerCase()) ||
        entry.city.toLowerCase().includes(query.toLowerCase()) ||
        entry.product.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const openModal = (item) => {
    if (item) {
      setSelectedItem(item);
    } else {
      setNewItem({
        businessname: '',
        city: '',
        product: '',
      });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleSave = async () => {
    if (selectedItem) {
      // Update the existing entry
      try {
        const response = await fetch('https://signpostphonebook.in/update_row_for_new_database.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedItem),
        });

        if (response.ok) {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === selectedItem.id ? selectedItem : item
            )
          );
          setFilteredData((prevData) =>
            prevData.map((item) =>
              item.id === selectedItem.id ? selectedItem : item
            )
          );
          Alert.alert('Success', 'Item updated successfully');
        } else {
          Alert.alert('Error', 'Failed to update item');
        }
      } catch (err) {
        console.error('Error updating item:', err);
        Alert.alert('Error', 'Failed to update item');
      }
    } else {
      // Add a new entry
      try {
        const response = await fetch('https://signpostphonebook.in/create_row.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });

        if (response.ok) {
          fetchData(); // Refresh the data
          Alert.alert('Success', 'Item added successfully');
        } else {
          Alert.alert('Error', 'Failed to add item');
        }
      } catch (err) {
        console.error('Error adding item:', err);
        Alert.alert('Error', 'Failed to add item');
      }
    }
    closeModal();
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Do you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDelete(id),
        },
      ]
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('https://signpostphonebook.in/delete_row_for_new_database.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
        Alert.alert('Success', 'Item deleted successfully');
      } else {
        Alert.alert('Error', 'Failed to delete item');
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Section */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by business name, city, or product..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Button title="Refresh Data" onPress={fetchData} style={styles.refreshButton} />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No data found for your search.' : 'No data available.'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.entryItem}>
            <View style={styles.entryText}>
              <Text>ID: {item.id}</Text>
              <Text>Business Name: {item.businessname}</Text>
              <Text>Prefix: {item.prefix}</Text>
              <Text>Mobile Number: {item.mobileno}</Text>
              <Text>Address: {item.doorno}</Text>
              <Text>City: {item.city}</Text>
              <Text>Pincode: {item.pincode}</Text>
              <Text>E-mail: {item.email}</Text>
              <Text>Product: {item.product}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => openModal(item)}
              >
                <Icon name="pencil" size={20} color="#888" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => confirmDelete(item.id)}
              >
                <Icon name="trash" size={20} color="#f00" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Entry</Text>
            {(selectedItem || newItem) && (
              <>
              <TextInput
                style={styles.input}
                placeholder="Business Name"
                value={selectedItem ? selectedItem.businessname : newItem.businessname}
                onChangeText={(text) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, businessname: text })
                    : setNewItem({ ...newItem, businessname: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Prefix"
                value={selectedItem ? selectedItem.prefix : newItem.prefix}
                onChangeText={(text) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, prefix: text })
                    : setNewItem({ ...newItem, prefix: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={selectedItem ? selectedItem.mobileno : newItem.mobileno}
                onChangeText={(text) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, mobileno: text })
                    : setNewItem({ ...newItem, mobileno: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Door No"
                value={selectedItem ? selectedItem.doorno : newItem.doorno}
                onChangeText={(text) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, doorno: text })
                    : setNewItem({ ...newItem, doorno: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={selectedItem ? selectedItem.city : newItem.city}
                onChangeText={(text) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, city: text })
                    : setNewItem({ ...newItem, city: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Pincode"
                value={selectedItem ? selectedItem.pincode : newItem.pincode}
                onChangeText={(text) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, pincode: text })
                    : setNewItem({ ...newItem, pincode: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={selectedItem ? selectedItem.email : newItem.email}
                onChangeText={(text) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, email: text })
                    : setNewItem({ ...newItem, email: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Product"
                value={selectedItem ? selectedItem.product : newItem.product}
                onChangeText={(text) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, product: text })
                    : setNewItem({ ...newItem, product: text })
                }
              />
            </>
            
            )}
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={closeModal} color="red" />
              <Button title="Save" onPress={handleSave} />
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  refreshButton: {
    marginBottom: 20,
  },
  entryItem: {
    flexDirection: 'row', // Arrange content horizontally
    alignItems: 'center',
    justifyContent: 'space-between', // Push content to the edges
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  entryText: {
    flex: 1, // Take up remaining space
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10, // Add spacing between icons
  },
  iconButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5', // Light background for the button
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Datas;
