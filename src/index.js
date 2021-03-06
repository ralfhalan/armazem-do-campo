import React from 'react';
import {YellowBox, StatusBar, SafeAreaView} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {theme} from './global/styles/theme';
import Router from './router';

YellowBox.ignoreWarnings();

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.pallete.primary,
    },
  };
  return (
    <SafeAreaView>
      <StatusBar hidden={true} animated />
      <Router />
    </SafeAreaView>
  );
}
