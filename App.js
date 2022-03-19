import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import CoursePossibility from './screens/HomeScreen';
import ResultShow from './screens/ResultShow';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdMobBanner } from 'expo-ads-admob';
import { View } from 'react-native';

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
              title: "目標以上のコースに入れる確率を計算",
              headerStyle: {
                backgroundColor: '#651FFF',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',

              }
            }}
            component={CoursePossibility} />
          <Stack.Screen name="ResultScreen"
            options={{
              title: "計算結果",
              headerStyle: {
                backgroundColor: '#651FFF',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }

            }}
            component={ResultShow} />
        </Stack.Navigator>
      </NavigationContainer>
        <AdMobBanner
          adUnitID={
             Platform.select({
                ios: "ca-app-pub-3940256099942544/2934735716", // iOS
                android: "ca-app-pub-3940256099942544/6300978111", // android 
              })
          }
          onDidFailToReceiveAdWithError={bannerError}
        />
    </PaperProvider>
  );
}

function bannerError() {
  alert("Ad Fail error");
}