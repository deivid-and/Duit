import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import { save } from '../utils/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'SetupComplete'>;

export function SetupCompleteScreen({
  navigation,
  route,
}: Props): React.JSX.Element {
  const getMessage = () => {
    const {tone} = route.params;
    return tone === 'friendly'
      ? "You're all set! Let's start building better habits together. 🌟"
      : "SETUP COMPLETE! Time to crush those bad habits. NO EXCUSES! 💪";
  };

  const handleStart = async () => {
    await save('userSettings', {
      goal: route.params.goal,
      tone: route.params.tone,
      setupComplete: true,
    });
  
    navigation.navigate('Main', {
      goal: route.params.goal,
      tone: route.params.tone,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkmarkContainer}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={styles.title}>Setup Complete!</Text>

        <Text style={styles.message}>{getMessage()}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Duit will now help you stay focused by delaying access to distracting
            apps. We'll check in with you throughout the day to keep you
            accountable.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
          activeOpacity={0.8}>
          <Text style={styles.startButtonText}>Start Using Duit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 32,
  },
  infoContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 