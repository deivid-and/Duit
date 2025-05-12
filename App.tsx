/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { load } from './src/utils/storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from './src/screens/WelcomeScreen';
import {GoalSelectionScreen} from './src/screens/GoalSelectionScreen';
import {ToneSelectionScreen} from './src/screens/ToneSelectionScreen';
import {PermissionsIntroScreen} from './src/screens/PermissionsIntroScreen';
import {TestInteractionScreen} from './src/screens/TestInteractionScreen';
import {SetupCompleteScreen} from './src/screens/SetupCompleteScreen';
import {MainScreen} from './src/screens/MainScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';

export type RootStackParamList = {
  Welcome: undefined;
  GoalSelection: undefined;
  History: undefined;
  ToneSelection: {
    goal: 'study' | 'fitness' | 'sideHustle';
  };
  PermissionsIntro: {
    goal: 'study' | 'fitness' | 'sideHustle';
    tone: 'friendly' | 'aggressive';
  };
  TestInteraction: {
    goal: 'study' | 'fitness' | 'sideHustle';
    tone: 'friendly' | 'aggressive';
  };
  SetupComplete: {
    goal: 'study' | 'fitness' | 'sideHustle';
    tone: 'friendly' | 'aggressive';
  };
  Main: {
    goal: 'study' | 'fitness' | 'sideHustle';
    tone: 'friendly' | 'aggressive';
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const data = await load('userSettings');
      if (data?.setupComplete) {
        setInitialRoute('Main');
      } else {
        setInitialRoute('Welcome');
      }
    };
    checkUser();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute as keyof RootStackParamList}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
        <Stack.Screen name="ToneSelection" component={ToneSelectionScreen} />
        <Stack.Screen name="PermissionsIntro" component={PermissionsIntroScreen} />
        <Stack.Screen name="TestInteraction" component={TestInteractionScreen} />
        <Stack.Screen name="SetupComplete" component={SetupCompleteScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
