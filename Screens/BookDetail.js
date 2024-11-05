// screens/BookDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../firebaseConfig';

const BookDetail = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [borrowedCount, setBorrowedCount] = useState(0); // Add state for borrowed books

  useEffect(() => {
    const unsubscribe = db.collection('books').doc(bookId).onSnapshot(doc => {
      setBook({ id: doc.id, ...doc.data() });
    });

    return () => unsubscribe();
  }, [bookId]);

  const handleBorrow = () => {
    if (borrowedCount < 3) {
      // Logic to borrow the book
      setBorrowedCount(borrowedCount + 1);
    } else {
      alert("You cannot borrow more than three books at a time.");
    }
  };

  if (!book) return null;

  return (
    <View>
      <Text>{book.name}</Text>
      <Text>{book.author}</Text>
      <Text>{book.rating}</Text>
      <Text>{book.summary}</Text>
      <Button title="Borrow" onPress={handleBorrow} />
    </View>
  );
};

export default BookDetail;
