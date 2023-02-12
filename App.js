/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Navigation from './src/navigation';

const App = () => {
 return (
   <SafeAreaView style={styles.root}>
     <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
     <Navigation />
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 root: {
   flex:1,
   backgroundColor:'white',
 }
});

export default App;