import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, get, child, update } from 'firebase/database';
import { useFocusEffect } from '@react-navigation/native';

const BorrowedScreen = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Define fetchBorrowedBooks as a standalone function
  const fetchBorrowedBooks = async () => {
    const userId = 'user1'; // Replace with actual user ID logic
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/borrowedBooks`));
      if (snapshot.exists()) {
        const bookIds = Object.keys(snapshot.val());
        const books = await Promise.all(
          bookIds.map(async (id) => {
            const bookSnapshot = await get(child(ref(database), `books/${id}`));
            return { id, ...bookSnapshot.val() };
          })
        );
        setBorrowedBooks(books);
      } else {
        setBorrowedBooks([]); // Clear list if no borrowed books
      }
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
    }
  };

  // Re-fetch borrowed books each time the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchBorrowedBooks();
    }, [])
  );

  const handleReturnBook = async (bookId) => {
    const userId = 'user1';
    try {
      await update(ref(database, `users/${userId}/borrowedBooks`), {
        [bookId]: null,
      });
      Alert.alert("Success", "Book returned successfully.");
      setBorrowedBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error returning book:', error);
      Alert.alert("Error", "There was an error returning the book. Please try again.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Borrowed Books</Text>
      <FlatList
        data={borrowedBooks}
        numColumns={1}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookName}>{item.name}</Text>
            <Button title="Return Book" onPress={() => handleReturnBook(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookName: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default BorrowedScreen;
