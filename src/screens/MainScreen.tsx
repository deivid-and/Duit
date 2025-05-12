import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import { load } from '../utils/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

// Storage keys
const STORAGE_KEYS = {
  GOAL: '@duit_goal',
  TONE: '@duit_tone',
  BLOCKED_COUNT: '@duit_blocked_count',
} as const;

export function MainScreen({ route, navigation }: Props): React.JSX.Element {
  const [goal, setGoal] = useState<string | null>(null);
  const [tone, setTone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blockedCount, setBlockedCount] = useState(0);
  
  useEffect(() => {
    const init = async () => {
      if (route?.params) {
        setGoal(route.params.goal);
        setTone(route.params.tone);
      } else {
        const data = await load('userSettings');
        if (data) {
          setGoal(data.goal);
          setTone(data.tone);
        }
      }
  
      try {
        const count = await AsyncStorage.getItem(STORAGE_KEYS.BLOCKED_COUNT);
        setBlockedCount(count ? parseInt(count, 10) : 0);
      } catch (error) {
        console.error('Error loading blocked count:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    init();
  }, []);
  
  
    // Load blocked count from storage
    const loadBlockedCount = async () => {
      try {
        const count = await AsyncStorage.getItem(STORAGE_KEYS.BLOCKED_COUNT);
        setBlockedCount(count ? parseInt(count, 10) : 0);
      } catch (error) {
        console.error('Error loading blocked count:', error);
      } finally {
        setIsLoading(false);
      }
    };

  const handleEditSetup = () => {
    navigation.navigate('GoalSelection');
  };

  const handleSimulateBlock = async () => {
    const newCount = blockedCount + 1;
    setBlockedCount(newCount);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BLOCKED_COUNT, newCount.toString());
    } catch (error) {
      console.error('Error saving blocked count:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Premium Upsell Placeholder */}
      <View style={styles.premiumBanner}>
        <Text style={styles.premiumText}>Try Premium</Text>
      </View>

      <View style={styles.content}>
        {/* User Settings Summary */}
        <View style={styles.settingsSummary}>
          <Text style={styles.goalText}>
            Goal: <Text style={styles.highlightText}>{goal}</Text>
          </Text>
          <Text style={styles.toneText}>
            Style: <Text style={styles.highlightText}>{tone}</Text>
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditSetup}
            activeOpacity={0.8}>
            <Text style={styles.editButtonText}>Edit Setup</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>App Opens Blocked Today</Text>
          <Text style={styles.statsNumber}>{blockedCount}</Text>
          <TouchableOpacity
            style={styles.simulateButton}
            onPress={handleSimulateBlock}
            activeOpacity={0.8}>
            <Text style={styles.simulateButtonText}>Simulate Block Event</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Graph Placeholder */}
        <View style={styles.graphCard}>
          <Text style={styles.graphTitle}>Daily Progress</Text>
          <View style={styles.graphPlaceholder}>
            <Text style={styles.placeholderText}>Graph Coming Soon</Text>
          </View>
        </View>

        {/* Ad Placeholder */}
        <View style={styles.adPlaceholder}>
          <Text style={styles.placeholderText}>Ad Space</Text>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={[styles.tabText, styles.activeTab]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Settings</Text>
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  premiumBanner: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    alignItems: 'center',
  },
  premiumText: {
    fontSize: 14,
    color: '#666666',
  },
  settingsSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  goalText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  toneText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  highlightText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  statsCard: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  simulateButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  simulateButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  graphCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  graphPlaceholder: {
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adPlaceholder: {
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 14,
    color: '#666666',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: 20,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTab: {
    color: '#007AFF',
    fontWeight: '600',
  },
}); 