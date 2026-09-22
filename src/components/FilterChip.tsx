

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme/colors';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const FilterChip: React.FC<Props> = ({ label, selected, onPress }) => (
  <Pressable
    style={[styles.chip, selected ? styles.chipSelected : styles.chipUnselected]}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{ selected }}
  >
    <Text style={[styles.text, selected ? styles.textSelected : styles.textUnselected]}>
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.chip,
    borderWidth: 1,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  chipUnselected: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.analytics,
    borderColor: colors.analytics,
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
  },
  textUnselected: {
    color: colors.textPrimary,
  },
  textSelected: {
    color: colors.background,
    fontWeight: '600',
  },
});