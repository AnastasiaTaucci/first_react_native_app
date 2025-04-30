import {StyleSheet, ScrollView, FlatList, TextInput, Button} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import spanishLinks from '../../data/spanish_links.json'
import { useState } from 'react';
import { useRouter } from 'expo-router';
import ResourceCard from '@/components/ResourceCard'

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(spanishLinks);
  const router = useRouter();

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
        scrollEnabled={false}
        data={filteredData}
        keyExtractor={(item) => item.title}
        renderItem={({item}) => (
          <ResourceCard
            title={item.title}
            group={item.group}
            description={item.description}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: item,
              })
            }
          />
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
});
