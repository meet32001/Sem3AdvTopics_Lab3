import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, get, child } from 'firebase/database';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'books'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const booksList = Object.keys(data).map(key => ({
            id: key,
            title: data[key].name,
            author: data[key].author,
          }));
          setBooks(booksList);
        } else {
          console.log('No books found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() => navigation.navigate('Book Detail', { bookId: item.id })}
            >
              <Image source={require('../assets/images/default_book_cover.png.webp')} style={styles.bookImage} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.authorText}>by {item.author}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'center', // Center vertically
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1, // Allows the container to take the full height
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  listContainer: {
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items in the vertical direction
  },
  bookItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    width: '100%', // Adjust to fit your design needs
    aspectRatio: 1, // Maintain square aspect ratio
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  bookImage: {
    width: '80%', // Adjust width to fit within the square
    height: '80%', // Keep the height proportional
    borderRadius: 8,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
  },
  authorText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default HomeScreen;
