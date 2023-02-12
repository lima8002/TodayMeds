import React from 'react';

// screen animation components
import 'react-native-gesture-handler';
import 'react-native-screens';

// navigation components
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';

const Stack = createStackNavigator();

function IsLoggedOnApp() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Splash"} >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
    );
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <IsLoggedOnApp />
        </NavigationContainer>
    )
}

export default Navigation;