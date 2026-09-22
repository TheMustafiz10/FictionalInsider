


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';

const ACTIVITY_DATA = [3, 5, 2, 7, 4, 6, 8];

export const MockActivityChart: React.FC = () => {
  const maxValue = Math.max(...ACTIVITY_DATA);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mock 7-day activity</Text>
      <View style={styles.chartRow}>
        {ACTIVITY_DATA.map((value, index) => (
          <View key={index} style={styles.barWrapper}>
            <View
              style={[
                styles.bar,
                {
                  height: (value / maxValue) * 80,
                  backgroundColor: colors.analytics,
                },
              ]}
            />
          </View>
        ))}
      </View>
      <View style={styles.labelRow}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <Text key={day} style={styles.dayLabel}>{day}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  title: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: spacing.md,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 90,
  },
  barWrapper: {
    alignItems: 'center',
  },
  bar: {
    width: 28,
    borderRadius: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.xs,
  },
  dayLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    width: 28,
    textAlign: 'center',
  },
});