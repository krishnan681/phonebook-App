import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ArrowForwardIcon from "react-native-vector-icons/MaterialIcons";
import { Agenda } from "react-native-calendars";

export default function TotalCount() {
  const [teamData, setTeamData] = useState([]);
  const [agendaEvents, setAgendaEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch team data from the backend
  const fetchTeamData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://signpostphonebook.in/try_totalcount.php");
      const data = await response.json();
      setTeamData(data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch agenda data for a specific member
  const fetchAgendaData = async (memberId) => {
    try {
      const response = await fetch(`https://signpostphonebook.in/fetch_events.php?id=${memberId}`);
      if (!response.ok) throw new Error("Failed to fetch calendar data.");
      const data = await response.json();

      // Convert data into Agenda's format
      const agendaData = {};
      data.forEach((entry) => {
        if (!agendaData[entry.date]) {
          agendaData[entry.date] = [];
        }
        agendaData[entry.date].push({
          name: `Count: ${entry.count}`,
          description: `Details for ${entry.date}`,
        });
      });
      setAgendaEvents(agendaData);
    } catch (error) {
      console.error("Error fetching agenda data:", error);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const openCalendarModal = (member) => {
    setSelectedMember(member);
    fetchAgendaData(member.id);
    setIsModalOpen(true);
  };

  const closeCalendarModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    setAgendaEvents({});
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team</Text>

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, { flex: 1 }]}>ID</Text>
        <Text style={[styles.headerCell, { flex: 3 }]}>Name</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Total Count</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Actions</Text>
      </View>

      <FlatList
        data={teamData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 1 }]}>{item.id}</Text>
            <Text style={[styles.cell, { flex: 3 }]}>{item.name || "No Name"}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.total_count || "N/A"}</Text>
            <TouchableOpacity onPress={() => openCalendarModal(item)}>
              <ArrowForwardIcon name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Agenda Modal */}
      <Modal visible={isModalOpen} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedMember?.name}'s Entries</Text>
            <Agenda
              items={agendaEvents}
              renderItem={(item, firstItemInDay) => (
                <View style={styles.agendaItem}>
                  <Text style={styles.agendaItemText}>{item.name}</Text>
                </View>
              )}
              renderEmptyData={() => (
                <View style={styles.emptyAgenda}>
                  <Text>No events for this day.</Text>
                </View>
              )}
              theme={{
                selectedDayBackgroundColor: "blue",
                todayTextColor: "red",
                dotColor: "blue",
                agendaTodayColor: "red",
              }}
            />
            <TouchableOpacity onPress={closeCalendarModal} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f4f4f4", // Light gray for the background
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333", // Darker gray for the title
      marginBottom: 16,
      textAlign: "center",
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 8,
      backgroundColor: "#007BFF", // Blue background for the header row
      borderRadius: 6,
      marginBottom: 8,
    },
    headerCell: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff", // White text
      textAlign: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 8,
      backgroundColor: "#fff", // White background for rows
      borderRadius: 6,
      marginBottom: 6,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    cell: {
      fontSize: 14,
      color: "#333", // Dark gray for text
      textAlign: "center",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)", // Transparent black for the overlay
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "90%",
      height: "80%",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 16,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#007BFF", // Match the header color
      marginBottom: 16,
      textAlign: "center",
    },
    button: {
      marginTop: 16,
      paddingVertical: 12,
      backgroundColor: "#007BFF",
      borderRadius: 6,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    agendaItem: {
      backgroundColor: "#f9f9f9",
      padding: 12,
      marginVertical: 6,
      borderRadius: 6,
      borderLeftWidth: 4,
      borderLeftColor: "#007BFF", // Accent border
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    agendaItemText: {
      fontSize: 16,
      color: "#333",
    },
    emptyAgenda: {
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      marginTop: 16,
    },
    emptyAgendaText: {
      fontSize: 16,
      color: "gray",
    },
  });
  