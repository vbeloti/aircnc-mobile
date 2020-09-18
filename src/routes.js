import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const { Navigator, Screen } = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={Login} />
        <Screen name="List" component={List} />
        <Screen name="Book" component={Book} />
      </Navigator>
    </NavigationContainer>
  );
};

// import Login from './pages/Login';
// import List from './pages/List';
// import Book from './pages/Book';

// import {
//   createStackNavigator,
//   createSwitchNavigator,
//   createAppContainer,
// } from 'react-navigation';

// const Routes = createAppContainer(
//   createSwitchNavigator({
//     Login,
//     List,
//     Book,
//   })
// );

export default Routes;
