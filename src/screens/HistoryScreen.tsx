import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

type HistoryEntry = {
  id: string;
  date: string;
  apps: Array<{
    name: string;
    timeUsed: number;
    timeLimit: number;
    result: 'EARLY_QUIT' | 'EXTENDED' | 'BROKE_LIMIT' | 'WITHIN_LIMIT';
  }>;
  points: number;
  isPerfectDay: boolean;
  milestones: string[];
  streakCount: number;
};

const mockHistory: HistoryEntry[] = [
  {
    id: '1',
    date: '2024-03-20',
    apps: [
      {
        name: 'Instagram',
        timeUsed: 25,
        timeLimit: 30,
        result: 'EARLY_QUIT',
      },
      {
        name: 'TikTok',
        timeUsed: 45,
        timeLimit: 30,
        result: 'BROKE_LIMIT',
      },
    ],
    points: 150,
    isPerfectDay: false,
    milestones: ['First Instagram victory!'],
    streakCount: 0,
  },
  {
    id: '2',
    date: '2024-03-21',
    apps: [
      {
        name: 'Instagram',
        timeUsed: 20,
        timeLimit: 30,
        result: 'EARLY_QUIT',
      },
      {
        name: 'TikTok',
        timeUsed: 25,
        timeLimit: 30,
        result: 'WITHIN_LIMIT',
      },
    ],
    points: 300,
    isPerfectDay: true,
    milestones: ['First perfect day! 🎉'],
    streakCount: 1,
  },
];

export function HistoryScreen(): React.JSX.Element {
  const [history] = useState<HistoryEntry[]>(mockHistory);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const getResultEmoji = (result: string) => {
    switch (result) {
      case 'EARLY_QUIT':
        return '🌟';
      case 'WITHIN_LIMIT':
        return '✅';
      case 'EXTENDED':
        return '⚠️';
      case 'BROKE_LIMIT':
        return '❌';
      default:
        return '➖';
    }
  };

  const getPointsColor = (points: number) => {
    if (points >= 300) return '#4CAF50';
    if (points >= 200) return '#2196F3';
    if (points >= 100) return '#FFC107';
    return '#F44336';
  };

  const chartData = {
    labels: history.map(entry => entry.date.split('-')[2]),
    datasets: [{
      data: history.map(entry => entry.points),
    }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Your Journey</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{history[history.length - 1]?.streakCount || 0}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {history.filter(day => day.isPerfectDay).length}
              </Text>
              <Text style={styles.statLabel}>Perfect Days</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {history.reduce((sum, day) => sum + day.points, 0)}
              </Text>
              <Text style={styles.statLabel}>Total Points</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 32}
            height={180}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.timeline}>
          <Text style={styles.sectionTitle}>Daily Timeline</Text>
          {history.map((entry) => (
            <Animated.View
              key={entry.id}
              style={[styles.dayCard, { opacity: fadeAnim }]}>
              <View style={styles.dayHeader}>
                <Text style={styles.date}>{entry.date}</Text>
                <View style={styles.pointsContainer}>
                  <Text
                    style={[
                      styles.points,
                      { color: getPointsColor(entry.points) },
                    ]}>
                    {entry.points} pts
                  </Text>
                  {entry.isPerfectDay && (
                    <View style={styles.perfectDay}>
                      <Text style={styles.perfectDayText}>Perfect Day! 🏆</Text>
                    </View>
                  )}
                </View>
              </View>

              {entry.apps.map((app, index) => (
                <View key={index} style={styles.appEntry}>
                  <View style={styles.appInfo}>
                    <Text style={styles.appName}>{app.name}</Text>
                    <Text style={styles.timeInfo}>
                      {app.timeUsed}min / {app.timeLimit}min{' '}
                      {getResultEmoji(app.result)}
                    </Text>
                  </View>
                  <View style={styles.resultBar}>
                    <View
                      style={[
                        styles.resultFill,
                        {
                          width: `${(app.timeUsed / app.timeLimit) * 100}%`,
                          backgroundColor:
                            app.timeUsed <= app.timeLimit
                              ? '#4CAF50'
                              : '#F44336',
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}

              {entry.milestones.length > 0 && (
                <View style={styles.milestones}>
                  {entry.milestones.map((milestone, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.milestone}
                      activeOpacity={0.8}>
                      <Text style={styles.milestoneText}>{milestone}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </Animated.View>
          ))}
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
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  chartContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  timeline: {
    padding: 16,
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  perfectDay: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  perfectDayText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  appEntry: {
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
  timeInfo: {
    fontSize: 14,
    color: '#666666',
  },
  resultBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  resultFill: {
    height: '100%',
    borderRadius: 2,
  },
  milestones: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  milestone: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  milestoneText: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: '500',
  },
});
