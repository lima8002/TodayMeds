import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Platform
} from 'react-native';

const SplashScreen = ({ navigation }) => {
  // state const for animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      // inside here will check on firebase if the user is logged or not 
      // if the user is logged, the poroceed to homescreen passing userid as params
      // if not, signin screen 

      navigation.replace('SignIn');

    } , 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/logo.png')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});