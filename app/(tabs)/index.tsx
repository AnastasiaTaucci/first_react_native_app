import {StyleSheet, ScrollView, FlatList, TextInput, Button, Linking, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import spanishLinks from '../../data/spanish_links.json'
import { useState } from 'react';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(spanishLinks);

  function handleSearch() {
    const results = spanishLinks.filter(item => 
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.group.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(results);
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedText 
        lightColor="#4903fc"
        darkColor="#a597ff"
        type='title'
        style={styles.homeTitle}>Spanish Learning Hub</ThemedText>

      <TextInput
        style={styles.input}
        placeholder='Search resources...'
        value = {searchText}
        onChangeText={setSearchText}
      />

      <Button
        title='Search'
        onPress={handleSearch}
      />

      <FlatList 
        style={styles.list}
        data={filteredData}
        keyExtractor={(item) => item.title}
        renderItem={({item}) => (
          <ThemedView style={styles.stepContainer}>
            <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.itemGroup}>{item.group}</ThemedText>
            <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
            <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
              <ThemedText style={styles.itemLink}>Open Link</ThemedText>
            </TouchableOpacity> 
          </ThemedView>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
    marginBottom: 10,
    backgroundColor: "f0f0f0"
  },
  homeTitle: {
    fontSize: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  list: {
    marginTop: 10,
    marginBottom: 13
  },
  stepContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0362fc',
    marginBottom: 8
  },
  itemGroup: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
    paddingLeft: 6
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
    color: 'darkblue',
    paddingLeft: 6
  },
  itemLink: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
    fontSize: 14,
    paddingLeft: 20
  }
});
