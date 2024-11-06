// components/BookItem.js
import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const BookItem = ({ title, author, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.bookItem}>
      <Image source={require('../assets/images/default_book_cover.png')} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{title}</Text>
      <Text style={styles.authorText}>by {author}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 15,
    width: '45%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  bookImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
  authorText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default BookItem;

