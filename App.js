import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import CoursePossibility from './screens/HomeScreen';
import ResultShow from './screens/ResultShow';
import AppNavigator from './navigation/AppNavigator'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name="計算画面" component={CoursePossibility} />
          <Stack.Screen name="結果" component={ResultShow}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}