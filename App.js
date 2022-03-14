import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import CoursePossibility from './screens/HomeScreen';
//import AppNavigator from './navigation/AppNavigator'


export default function App() {
  return (
    <PaperProvider>
      <CoursePossibility/>
    </PaperProvider>

  );
}