


import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { MOCK_TRADES } from '../data/mockTrades';
import { TradeCard } from '../components/TradeCard';
import { FilterChip } from '../components/FilterChip';
import { colors, spacing, radius } from '../theme/colors';

const TYPE_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Purchases', value: 'purchase' },
  { label: 'Sales', value: 'sale' },
] as const;

const ROLE_OPTIONS = [
  { label: 'All roles', value: 'all' },
  { label: 'CEO', value: 'CEO' },
  { label: 'CFO', value: 'CFO' },
  { label: 'Director', value: 'Director' },
] as const;

const VALUE_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: '$100K+', value: 100000 },
  { label: '$500K+', value: 500000 },
  { label: '$1M+', value: 1000000 },
] as const;

export default function ScreenerScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'purchase' | 'sale'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'CEO' | 'CFO' | 'Director'>('all');
  const [valueFilter, setValueFilter] = useState<number>(0);

  const filteredTrades = useMemo(() => {
    return MOCK_TRADES.filter((trade) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          trade.ticker.toLowerCase().includes(q) ||
          trade.company.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      if (typeFilter !== 'all' && trade.type !== typeFilter) return false;
      if (roleFilter !== 'all' && trade.role !== roleFilter) return false;
      if (trade.value < valueFilter) return false;
      return true;
    });
  }, [searchQuery, typeFilter, roleFilter, valueFilter]);


  
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    typeFilter !== 'all' ||
    roleFilter !== 'all' ||
    valueFilter !== 0;

  const handleClearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setRoleFilter('all');
    setValueFilter(0);
  };

  const handleTradePress = (tradeId: string) => {
    router.push(`/details/${tradeId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search ticker or company"
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Transaction type</Text>
        <View style={styles.filterRow}>
          {TYPE_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              selected={typeFilter === opt.value}
              onPress={() => setTypeFilter(opt.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Insider role</Text>
        <View style={styles.filterRow}>
          {ROLE_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              selected={roleFilter === opt.value}
              onPress={() => setRoleFilter(opt.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Value threshold</Text>
        <View style={styles.filterRow}>
          {VALUE_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              selected={valueFilter === opt.value}
              onPress={() => setValueFilter(opt.value)}
            />
          ))}
        </View>
      </View>




      {/* Result count + Clear filters */}
      <View style={styles.resultRow}>
        <Text style={styles.resultCount}>
          {filteredTrades.length} result{filteredTrades.length !== 1 ? 's' : ''}
        </Text>
        {hasActiveFilters && (
          <Pressable onPress={handleClearFilters} accessibilityRole="button">
            <Text style={styles.clearFilters}>Clear filters</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredTrades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TradeCard trade={item} onPress={handleTradePress} />
        )}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              No fictional demo trades match those filters.
            </Text>
            <Pressable
              onPress={handleClearFilters}
              style={styles.clearButton}
              accessibilityRole="button"
            >
              <Text style={styles.clearButtonText}>Clear filters</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  searchWrapper: {
    marginBottom: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 15,
  },
  filterGroup: {
    marginBottom: spacing.sm,
  },
  filterLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  resultCount: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  clearFilters: {
    color: colors.analytics,
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: spacing.md,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  clearButton: {
    backgroundColor: colors.analytics,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.chip,
  },
  clearButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
});