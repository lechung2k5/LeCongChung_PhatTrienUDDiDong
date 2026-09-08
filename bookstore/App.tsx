import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import BookCard from './components/BookCard';
import CategoryChips from './components/CategoryChips';
import Header from './components/Header';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <View style={styles.contentContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <CategoryChips/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1, 
  },
  scrollContent: {
    paddingVertical: 12,
    alignItems: 'center', 
  },
});