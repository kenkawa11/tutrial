import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import CoursePossibility from './screens/HomeScreen';
import ResultShow from './screens/ResultShow';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerMode: 'screen',
            headerTitleAlign: 'center'
          }}
        >
          <Stack.Screen name="CalcScreen"
            options={{
              title: "Calculation Condition",
              headerStyle: {
                backgroundColor: 'teal',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }}
            component={CoursePossibility} />
          <Stack.Screen name="ResultScreen"
            options={{
              title: "Result",
              headerStyle: {
                backgroundColor: 'teal',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }

            }}
            component={ResultShow} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}