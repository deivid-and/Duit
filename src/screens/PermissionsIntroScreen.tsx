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

type Props = NativeStackScreenProps<RootStackParamList, 'PermissionsIntro'>;

export function PermissionsIntroScreen({
  navigation,
  route,
}: Props): React.JSX.Element {
  const handleContinue = () => {
    navigation.navigate('TestInteraction', {
      goal: route.params.goal,
      tone: route.params.tone,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.icon} />
        </View>
        
        <Text style={styles.title}>Enable Shortcuts</Text>
        
        <Text style={styles.description}>
          Duit uses Apple Shortcuts to help you stay on track. We'll create
          personalized reminders and notifications based on your preferences.
        </Text>
        
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Automated check-ins at your preferred times
          </Text>
          <Text style={styles.bulletPoint}>
            • Custom notifications with your chosen tone
          </Text>
          <Text style={styles.bulletPoint}>
            • Progress tracking through the day
          </Text>
        </View>

        <Text style={styles.note}>
          You can always adjust these settings later in the app.
        </Text>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>Continue</Text>
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 10,
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
  bulletPoints: {
    alignSelf: 'stretch',
    marginBottom: 32,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginBottom: 12,
  },
  note: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 40,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 