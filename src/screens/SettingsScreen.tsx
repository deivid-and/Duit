import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

type AppLimit = {
  appName: string;
  timeLimit: number;
};

const DEFAULT_APP_LIMITS: AppLimit[] = [
  { appName: 'Instagram', timeLimit: 30 },
  { appName: 'TikTok', timeLimit: 30 },
  { appName: 'YouTube', timeLimit: 45 },
  { appName: 'Twitter', timeLimit: 20 },
];

export function SettingsScreen({ navigation }: Props): React.JSX.Element {
  const [goal] = useState<string>('study');
  const [aiTone, setAiTone] = useState<string>('friendly');
  const [streakWarning, setStreakWarning] = useState<boolean>(true);
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [reminderTime, setReminderTime] = useState<string>('20:00');
  const [appLimits, setAppLimits] = useState<AppLimit[]>(DEFAULT_APP_LIMITS);

  const handleGoalUpdate = () => {
    navigation.navigate('GoalSelection');
  };

  const handleToneUpdate = () => {
    Alert.alert(
      'AI Tone',
      'Choose your preferred AI tone',
      [
        { text: 'Friendly', onPress: () => setAiTone('friendly') },
        { text: 'Aggressive', onPress: () => setAiTone('aggressive') },
      ],
    );
  };

  const handleBackup = async () => {
    try {
      await AsyncStorage.multiGet([
        '@duit_settings',
        '@duit_history',
        '@duit_streaks',
      ]);
      // Here you would implement actual backup logic
      Alert.alert('Success', 'Data backed up successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to backup data');
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure? This will delete all your progress and cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'All progress has been reset');
            } catch (error) {
              Alert.alert('Error', 'Failed to reset progress');
            }
          },
        },
      ],
    );
  };

  const renderSettingItem = (
    title: string,
    value: string | boolean | undefined,
    onPress: ((value?: string) => void) | (() => void),
    type: 'toggle' | 'button' | 'input' = 'button',
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => onPress()}
      activeOpacity={0.7}>
      <Text style={styles.settingTitle}>{title}</Text>
      {type === 'toggle' ? (
        <Switch
          value={value as boolean}
          onValueChange={() => onPress()}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#2196F3' : '#f4f3f4'}
        />
      ) : type === 'input' ? (
        <TextInput
          style={styles.input}
          value={value as string}
          onChangeText={(text) => onPress(text)}
          placeholder="Enter value"
        />
      ) : (
        <View style={styles.settingValue}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goals & Preferences</Text>
          {renderSettingItem('Update Goal', goal, handleGoalUpdate)}
          {renderSettingItem('AI Tone', aiTone, handleToneUpdate)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Limits</Text>
          {appLimits.map((app, index) => (
            <View key={app.appName} style={styles.appLimit}>
              <Text style={styles.appName}>{app.appName}</Text>
              <TextInput
                style={styles.timeInput}
                value={app.timeLimit.toString()}
                onChangeText={(value) => {
                  const newLimits = [...appLimits];
                  newLimits[index].timeLimit = parseInt(value) || 0;
                  setAppLimits(newLimits);
                }}
                keyboardType="number-pad"
                maxLength={3}
              />
              <Text style={styles.timeUnit}>min</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          {renderSettingItem(
            'Daily Reminder',
            reminderEnabled,
            () => setReminderEnabled(!reminderEnabled),
            'toggle',
          )}
          {reminderEnabled &&
            renderSettingItem(
              'Reminder Time',
              reminderTime,
              (time) => setReminderTime(time as string),
              'input',
            )}
          {renderSettingItem(
            'Streak Warning',
            streakWarning,
            () => setStreakWarning(!streakWarning),
            'toggle',
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleBackup}>
            <Text style={styles.actionButtonText}>Backup Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.destructiveButton]}
            onPress={handleReset}>
            <Text style={[styles.actionButtonText, styles.destructiveText]}>
              Reset Progress
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  settingTitle: {
    fontSize: 16,
    color: '#000000',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: '#666666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 8,
    width: 100,
    textAlign: 'right',
  },
  appLimit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  appName: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 8,
    width: 60,
    marginRight: 8,
    textAlign: 'center',
  },
  timeUnit: {
    fontSize: 16,
    color: '#666666',
    width: 40,
  },
  actionButton: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  destructiveButton: {
    backgroundColor: '#FEE2E2',
  },
  destructiveText: {
    color: '#DC2626',
  },
});
