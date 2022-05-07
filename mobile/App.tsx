import React from 'react';
import 'react-native-gesture-handler'

import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { theme } from './src/theme';
import Widget from './src/components/widget';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{
      backgroundColor: theme.colors.background,
      flex: 1,
    }}>
      <Widget />
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />
    </View>
  );
};
