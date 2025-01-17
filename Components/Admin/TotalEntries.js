import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const TotalEntries = () => {
  const [totalEntries, setTotalEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTotalEntries = async () => {
    try {
      const response = await fetch(
        'https://signpostphonebook.in/fetch_total_count.php'
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (Array.isArray(data)) {
        setTotalEntries(data);
        setError(null); // Clear previous errors
      } else {
        throw new Error('Invalid data structure received');
      }
    } catch (err) {
      console.error('Error fetching total entries:', err);
      setError('Failed to load total entries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalEntries();
    const interval = setInterval(fetchTotalEntries, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={totalEntries}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.entryItem}>
            <Text>ID: {item.id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Count: {item.count}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  entryItem: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default TotalEntries;
