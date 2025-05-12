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

type Goal = 'study' | 'fitness' | 'sideHustle';
type Props = NativeStackScreenProps<RootStackParamList, 'GoalSelection'>;

export function GoalSelectionScreen({navigation}: Props): React.JSX.Element {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleNext = () => {
    if (selectedGoal) {
      navigation.navigate('ToneSelection', {goal: selectedGoal});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What's your main goal?</Text>
        <View style={styles.goalsContainer}>
          <TouchableOpacity
            style={[
              styles.goalOption,
              selectedGoal === 'study' && styles.selectedGoal,
            ]}
            onPress={() => handleGoalSelect('study')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.goalText,
                selectedGoal === 'study' && styles.selectedGoalText,
              ]}>
              Study
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.goalOption,
              selectedGoal === 'fitness' && styles.selectedGoal,
            ]}
            onPress={() => handleGoalSelect('fitness')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.goalText,
                selectedGoal === 'fitness' && styles.selectedGoalText,
              ]}>
              Fitness
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.goalOption,
              selectedGoal === 'sideHustle' && styles.selectedGoal,
            ]}
            onPress={() => handleGoalSelect('sideHustle')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.goalText,
                selectedGoal === 'sideHustle' && styles.selectedGoalText,
              ]}>
              Side Hustle
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !selectedGoal && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selectedGoal}
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
  goalsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  goalOption: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  selectedGoal: {
    backgroundColor: '#007AFF',
  },
  goalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  selectedGoalText: {
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