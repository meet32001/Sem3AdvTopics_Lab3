// screens/BooksList.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';

const BooksList = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('books').onSnapshot(snapshot => {
      setBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      data={books}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}>
          <Text>{item.name} by {item.author}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default BooksList;
