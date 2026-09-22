



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme/colors';

interface Props {
  label: string;
  value: string;
  accent?: string;
}

export const SummaryCard: React.FC<Props> = ({ label, value, accent = colors.analytics }) => (
  <View style={styles.card}>
    <View style={[styles.accentBar, { backgroundColor: accent }]} />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1,
  },
  accentBar: {
    width: 4,
    height: 24,
    borderRadius: 2,
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
});