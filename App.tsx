/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from './src/screens/WelcomeScreen';
import {GoalSelectionScreen} from './src/screens/GoalSelectionScreen';
import {ToneSelectionScreen} from './src/screens/ToneSelectionScreen';
import {PermissionsIntroScreen} from './src/screens/PermissionsIntroScreen';
import {TestInteractionScreen} from './src/screens/TestInteractionScreen';
import {SetupCompleteScreen} from './src/screens/SetupCompleteScreen';
import {MainScreen} from './src/screens/MainScreen';

export type RootStackParamList = {
  Welcome: undefined;
  GoalSelection: undefined;
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
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
