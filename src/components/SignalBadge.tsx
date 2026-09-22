



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/colors';

interface Props {
  strength: 'High' | 'Medium' | 'Low';
}

export const SignalBadge: React.FC<Props> = ({ strength }) => {
  const color =
    strength === 'High'
      ? colors.purchase
      : strength === 'Medium'
      ? colors.analyticsAlt
      : colors.textSecondary;

  return (
    <View style={[styles.badge, { backgroundColor: color + '25' }]}>
      <Text style={[styles.text, { color }]}>{strength}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.badge,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});