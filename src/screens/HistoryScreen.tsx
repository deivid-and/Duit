import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';

const mockHistory = [
  { id: '1', time: '08:30', action: 'Blocked Instagram' },
  { id: '2', time: '10:15', action: 'Dismissed reminder' },
  { id: '3', time: '12:00', action: 'Opened Duit from Shortcut' },
];

export function HistoryScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={mockHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.action}>{item.action}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  entry: { marginBottom: 12 },
  time: { fontSize: 14, color: '#888' },
  action: { fontSize: 16 },
});
