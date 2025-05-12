import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {RootStackParamList} from '../../App';
import {load} from '../utils/storage';
import Svg, { Circle, Path } from 'react-native-svg';

type Props = BottomTabScreenProps<RootStackParamList, 'Main'>;

// Storage keys
const STORAGE_KEYS = {
  GOAL: '@duit_goal',
  TONE: '@duit_tone',
  BLOCKED_COUNT: '@duit_blocked_count',
} as const;

const MOTIVATIONAL_QUOTES = [
  "Small progress is still progress!",
  "You're building better habits, one day at a time",
  "Stay focused on your goals, future you will thank you",
  "Every time you resist, you grow stronger",
];

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const radius = 40;
  const strokeWidth = 10;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progressStroke = (circumference * (100 - percentage)) / 100;

  return (
    <Svg width={center * 2} height={center * 2}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#E0E0E0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#2196F3"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={progressStroke}
        fill="none"
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <Text
        x={center}
        y={center}
        textAnchor="middle"
        fontSize="16"
        fill="#000000"
        dy=".3em">
        {`${Math.round(percentage)}%`}
      </Text>
    </Svg>
  );
};

export function MainScreen({route, navigation}: Props): React.JSX.Element {
  const [goal, setGoal] = useState<string | null>(null);
  const [tone, setTone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blockedCount, setBlockedCount] = useState(0);
  const [dailyProgress, setDailyProgress] = useState(65); // Mock progress
  const [pointsEarned, setPointsEarned] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [quote] = useState(
    MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
  );

  const appLimits = [
    { name: 'Instagram', used: 25, limit: 60 },
    { name: 'TikTok', used: 15, limit: 30 },
    { name: 'YouTube', used: 45, limit: 90 },
  ];

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
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [route?.params, fadeAnim]);

  const handleOpenBlockedApp = () => {
    // Implementation for opening blocked app with delay
    Alert.alert(
      'Start Focus Timer',
      'The app will open after a 60-second mindfulness pause. Use this time to reflect on your goals.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Timer', onPress: () => {} },
      ]
    );
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
      <ScrollView style={styles.scrollView}>
        {/* Goal & Progress Section */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <View style={styles.goalHeader}>
            <View>
              <Text style={styles.goalLabel}>Current Goal</Text>
              <Text style={styles.goalText}>{goal}</Text>
              <Text style={styles.toneText}>
                Style: <Text style={styles.highlightText}>{tone}</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('GoalSelection')}
              activeOpacity={0.8}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Progress Circle & Points */}
        <Animated.View 
          style={[styles.section, styles.progressSection, { opacity: fadeAnim }]}>
          <View style={styles.progressContainer}>
            <CircularProgress percentage={dailyProgress} />
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsLabel}>Today's Points</Text>
              <Text style={styles.pointsValue}>{pointsEarned}</Text>
              {pointsEarned > 0 && (
                <Text style={styles.pointsBonus}>+50 for early quit!</Text>
              )}
            </View>
          </View>
          <Text style={styles.progressText}>
            {dailyProgress}% toward a Perfect Day
          </Text>
        </Animated.View>

        {/* App Limits Overview */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Today's App Usage</Text>
          {appLimits.map((app, index) => (
            <View key={app.name} style={styles.appLimit}>
              <View style={styles.appInfo}>
                <Text style={styles.appName}>{app.name}</Text>
                <Text style={styles.appTime}>
                  {app.used}m / {app.limit}m
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(app.used / app.limit) * 100}%`,
                      backgroundColor:
                        app.used / app.limit > 0.9
                          ? '#F44336'
                          : app.used / app.limit > 0.7
                          ? '#FFC107'
                          : '#4CAF50',
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Next Check-in */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Next Check-in</Text>
          <View style={styles.checkInCard}>
            <Text style={styles.checkInTime}>6:15 PM</Text>
            <Text style={styles.checkInDesc}>
              AI will help you review your progress
            </Text>
          </View>
        </Animated.View>

        {/* Quick Access */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.blockButton}
            onPress={handleOpenBlockedApp}
            activeOpacity={0.8}>
            <Text style={styles.blockButtonText}>
              Open Blocked App with Delay
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Motivational Quote */}
        <Animated.View style={[styles.section, styles.quoteSection, { opacity: fadeAnim }]}>
          <Text style={styles.quoteText}>{quote}</Text>
        </Animated.View>

        {/* Streak Status */}
        <Animated.View style={[styles.section, styles.streakSection, { opacity: fadeAnim }]}>
          <View style={styles.streakInfo}>
            <Text style={styles.streakTitle}>Current Streak</Text>
            <Text style={styles.streakCount}>5 days 🔥</Text>
            <Text style={styles.streakBonus}>+100 bonus points at 7 days!</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  goalLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  goalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  toneText: {
    fontSize: 14,
    color: '#666666',
  },
  highlightText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#F5F7FA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  progressSection: {
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  pointsBonus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  progressText: {
    fontSize: 16,
    color: '#666666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  appLimit: {
    marginBottom: 12,
  },
  appInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  appName: {
    fontSize: 14,
    color: '#333333',
  },
  appTime: {
    fontSize: 14,
    color: '#666666',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  checkInCard: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
  },
  checkInTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 4,
  },
  checkInDesc: {
    fontSize: 14,
    color: '#1976D2',
  },
  blockButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  blockButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  quoteSection: {
    backgroundColor: '#FFF8E1',
  },
  quoteText: {
    fontSize: 16,
    color: '#F57C00',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  streakSection: {
    marginBottom: 16,
  },
  streakInfo: {
    alignItems: 'center',
  },
  streakTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  streakCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 4,
  },
  streakBonus: {
    fontSize: 12,
    color: '#4CAF50',
  },
});
