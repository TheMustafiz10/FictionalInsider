

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MOCK_TRADES } from '../data/mockTrades';
import { TradeCard } from '../components/TradeCard';
import { FilterChip } from '../components/FilterChip';
import { colors, spacing } from '../theme/colors';
import { RootStackParamList } from '../types/trade';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ScreenerRoute = RouteProp<RootStackParamList, 'Screener'>;
type ScreenerNav = NativeStackNavigationProp<RootStackParamList, 'Screener'>;

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
  const navigation = useNavigation<ScreenerNav>();
  const route = useRoute<ScreenerRoute>();
  const inputRef = useRef<TextInput>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'purchase' | 'sale'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'CEO' | 'CFO' | 'Director'>('all');
  const [valueFilter, setValueFilter] = useState<number>(0);

  useEffect(() => {
    if (route.params?.autoFocusSearch) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [route.params]);

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

  const handleTradePress = (tradeId: string) => {
    navigation.navigate('TradeDetails', { tradeId });
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Search ticker or company"
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        accessibilityLabel="Search ticker or company"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
      >
        {TYPE_OPTIONS.map((opt) => (
          <FilterChip
            key={opt.value}
            label={opt.label}
            selected={typeFilter === opt.value}
            onPress={() => setTypeFilter(opt.value)}
          />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
      >
        {ROLE_OPTIONS.map((opt) => (
          <FilterChip
            key={opt.value}
            label={opt.label}
            selected={roleFilter === opt.value}
            onPress={() => setRoleFilter(opt.value)}
          />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
      >
        {VALUE_OPTIONS.map((opt) => (
          <FilterChip
            key={opt.value}
            label={opt.label}
            selected={valueFilter === opt.value}
            onPress={() => setValueFilter(opt.value)}
          />
        ))}
      </ScrollView>

      <Text style={styles.resultCount}>
        {filteredTrades.length} result{filteredTrades.length !== 1 ? 's' : ''}
      </Text>

      <FlatList
        data={filteredTrades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TradeCard trade={item} onPress={handleTradePress} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No matching trades</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
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
    padding: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 15,
    marginBottom: spacing.md,
  },
  filterRow: {
    marginBottom: spacing.sm,
    flexGrow: 0,
  },
  resultCount: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});