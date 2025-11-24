import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

interface Props {
  route: any;
  navigation: any;
}

export default function OutputPage({ route, navigation }: Props) {
  const { resumeText, questions, userId } = route.params;

  // ----------------------------------------------------------------
  // Save to History (send data to Python backend → SQLite)
  // ----------------------------------------------------------------
  const saveToHistory = async () => {
    try {
      const response = await fetch("http://YOUR_BACKEND_IP:5000/save-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          resume: resumeText,
          questions: questions,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        Alert.alert("Saved!", "Your data was added to history.");
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Cannot connect to backend.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Extracted Resume Text</Text>
      <Text style={styles.box}>{resumeText}</Text>

      <Text style={styles.heading}>Generated Questions</Text>
      {questions.map((q: string, index: number) => (
        <Text key={index} style={styles.question}>
          {index + 1}. {q}
        </Text>
      ))}

      <TouchableOpacity style={styles.button} onPress={saveToHistory}>
        <Text style={styles.buttonText}>Save to History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  box: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    lineHeight: 20,
  },
  question: {
    fontSize: 16,
    marginVertical: 6,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
