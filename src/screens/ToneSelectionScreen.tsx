import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

type Tone = 'friendly' | 'aggressive';
type Props = NativeStackScreenProps<RootStackParamList, 'ToneSelection'>;

export function ToneSelectionScreen({navigation, route}: Props): React.JSX.Element {
  const [selectedTone, setSelectedTone] = useState<Tone | null>(null);

  const handleToneSelect = (tone: Tone) => {
    setSelectedTone(tone);
  };

  const handleNext = () => {
    if (selectedTone) {
      navigation.navigate('PermissionsIntro', {
        goal: route.params.goal,
        tone: selectedTone,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose your motivation style</Text>
        <View style={styles.tonesContainer}>
          <TouchableOpacity
            style={[
              styles.toneOption,
              selectedTone === 'friendly' && styles.selectedTone,
            ]}
            onPress={() => handleToneSelect('friendly')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.toneText,
                selectedTone === 'friendly' && styles.selectedToneText,
              ]}>
              Friendly
            </Text>
            <Text style={styles.toneDescription}>
              Gentle reminders and positive reinforcement
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toneOption,
              selectedTone === 'aggressive' && styles.selectedTone,
            ]}
            onPress={() => handleToneSelect('aggressive')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.toneText,
                selectedTone === 'aggressive' && styles.selectedToneText,
              ]}>
              Aggressive
            </Text>
            <Text style={styles.toneDescription}>
              Direct, no-nonsense motivation to push harder
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !selectedTone && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selectedTone}
          activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>Next</Text>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000000',
    textAlign: 'center',
  },
  tonesContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  toneOption: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  selectedTone: {
    backgroundColor: '#007AFF',
  },
  toneText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  toneDescription: {
    fontSize: 14,
    color: '#666666',
  },
  selectedToneText: {
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 