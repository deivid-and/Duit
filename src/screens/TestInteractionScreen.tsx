import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'TestInteraction'>;

const getFriendlyMessage = (goal: string) => {
  switch (goal) {
    case 'study':
      return "Hey there! 📚 Just checking in on your study progress. Remember, every bit of focused work counts. How's it going?";
    case 'fitness':
      return "Hi! 💪 Time for a quick fitness check-in. Remember, you're building a stronger you with every workout. How are you feeling?";
    case 'sideHustle':
      return "Hello! 🚀 Checking in on your side hustle journey. Small steps lead to big achievements. What have you worked on today?";
    default:
      return "Hi there! 👋 How's your progress going?";
  }
};

const getAggressiveMessage = (goal: string) => {
  switch (goal) {
    case 'study':
      return "NO EXCUSES! 📚 Your future self is either thanking you or cursing you right now. Which one is it? Get studying!";
    case 'fitness':
      return "WAKE UP! 💪 Your body won't transform itself while you're making excuses. GET MOVING NOW!";
    case 'sideHustle':
      return "TIME IS MONEY! 🔥 While you're procrastinating, others are grinding. What's your excuse today?";
    default:
      return "NO MORE DELAYS! What have you accomplished today?";
  }
};

export function TestInteractionScreen({
  navigation,
  route,
}: Props): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const getMessage = () => {
    const {goal, tone} = route.params;
    return tone === 'friendly'
      ? getFriendlyMessage(goal)
      : getAggressiveMessage(goal);
  };

  useEffect(() => {
    // Simulate API delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before showing the message
      const messageTimer = setTimeout(() => {
        setShowMessage(true);
      }, 500);
      return () => clearTimeout(messageTimer);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleFinishSetup = () => {
    navigation.navigate('SetupComplete', {
      goal: route.params.goal,
      tone: route.params.tone,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Test Interaction</Text>
        <Text style={styles.description}>
          Here's how Duit will interact with you throughout the day:
        </Text>

        <View style={styles.messageContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <View style={styles.messageContent}>
              <Text style={styles.messageTitle}>AI Assistant</Text>
              {showMessage ? (
                <Text style={styles.message}>{getMessage()}</Text>
              ) : null}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.finishButton, !showMessage && styles.finishButtonDisabled]}
          onPress={handleFinishSetup}
          disabled={!showMessage}
          activeOpacity={0.8}>
          <Text style={styles.finishButtonText}>Finish Setup</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 32,
  },
  messageContainer: {
    width: '100%',
    minHeight: 160,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    justifyContent: 'center',
  },
  messageContent: {
    opacity: 1,
  },
  messageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  finishButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  finishButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 