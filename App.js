// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Borrowed from './Screens/Borrowed';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BooksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BooksList" component={BooksList} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={BooksStack} />
        <Tab.Screen name="Borrowed" component={Borrowed} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
