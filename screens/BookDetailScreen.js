import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, get, child, update, set } from 'firebase/database';

const BookDetailScreen = ({ route }) => {
  const bookId = route.params?.bookId;
  const userId = 'user1';  // Hardcoded user ID 'user1' for the example
  const [book, setBook] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true); 

  const MAX_BORROW_LIMIT = 3; 

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `books/${bookId}`));
        if (snapshot.exists()) {
          const bookData = snapshot.val();
          setBook(bookData);
        } else {
          setBook(null); 
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false); 
      }
    };

    const fetchUserBooks = async () => {
      try {
        const userRef = ref(database, `users/${userId}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userBooksData = Object.keys(snapshot.val().borrowedBooks || {});
          setUserBooks(userBooksData);
        } else {
          // If user does not exist, create them with an empty borrowedBooks object
          await set(userRef, { borrowedBooks: {} });
          setUserBooks([]);
        }
      } catch (error) {
        console.error('Error fetching user books:', error);
      }
    };

    fetchBookDetails();
    fetchUserBooks();
  }, [bookId]);

  const handleBorrow = async () => {
    if (userBooks.length >= MAX_BORROW_LIMIT) {
      Alert.alert("Borrowing Limit Exceeded", "You can't borrow more than 3 books at a time.");
      return;
    }

    if (userBooks.includes(bookId)) {
      Alert.alert("Already Borrowed", "You have already borrowed this book.");
      return;
    }

    const updatedBooks = [...userBooks, bookId]; 
    try {
      await update(ref(database, `users/${userId}`), {
        borrowedBooks: updatedBooks.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
      });

      const updatedAvailableCopies = book.availableCopies - 1;
      await update(ref(database, `books/${bookId}`), {
        availableCopies: updatedAvailableCopies
      });

      Alert.alert("Success", "You have successfully borrowed the book.");
      setUserBooks(updatedBooks);
    } catch (error) {
      console.error('Error borrowing book:', error);
      Alert.alert("Error", "There was an error borrowing the book. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : book ? (
          <>
            <Text style={styles.bookTitle}>{book.name}</Text>
            <Text style={styles.authorText}>Author: {book.author}</Text>
            <Text style={styles.ratingText}>Rating: {book.rating}</Text>
            <Text style={styles.summaryText}>Summary: {book.summary}</Text>
            <TouchableOpacity style={styles.button} onPress={handleBorrow}>
              <Text style={styles.buttonText}>Borrow Book</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.loadingText}>No book found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 10,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2980b9',
    paddingBottom: 5,
  },
  authorText: {
    fontSize: 20,
    color: '#34495e',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 18,
    color: '#e67e22',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'justify',
    paddingHorizontal: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BookDetailScreen;
