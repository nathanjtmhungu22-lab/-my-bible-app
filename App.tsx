import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BibleScreen from './screens/BibleScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Fraunces-Regular': require('./assets/fonts/Fraunces-Regular.ttf'),
        'Fraunces-Bold': require('./assets/fonts/Fraunces-Bold.ttf'),
        'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
        'JetBrainsMono-Regular': require('./assets/fonts/JetBrainsMono-Regular.ttf')
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#0B0D16'}}>
        <ActivityIndicator size="large" color="#C9A24B" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Bible" component={BibleScreen} options={{ tabBarLabel: 'Bible' }} />
        <Tab.Screen name="Chats" component={() => <Text style={{flex:1}}>Chats placeholder</Text>} />
        <Tab.Screen name="Saved" component={() => <Text style={{flex:1}}>Saved placeholder</Text>} />
        <Tab.Screen name="Profile" component={() => <Text style={{flex:1}}>Profile placeholder</Text>} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
