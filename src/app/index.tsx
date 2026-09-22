





import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { MOCK_TRADES } from '../data/mockTrades';
import { SummaryCard } from '../components/SummaryCard';
import { TradeCard } from '../components/TradeCard';
import { colors, spacing } from '../theme/colors';
import { formatCurrency } from '../utils/formatters';

export default function HomeScreen() {
  const summaries = useMemo(() => {
    const totalTransactions = MOCK_TRADES.length;
    const purchaseValue = MOCK_TRADES.filter((t) => t.type === 'purchase').reduce(
      (sum, t) => sum + t.value,
      0
    );
    const saleValue = MOCK_TRADES.filter((t) => t.type === 'sale').reduce(
      (sum, t) => sum + t.value,
      0
    );
    return { totalTransactions, purchaseValue, saleValue };
  }, []);

  const topSignals = ['Large CEO Purchase', 'Cluster Buy', 'Executive Sale'];
  const latestTrades = MOCK_TRADES.slice(0, 4);

  const handleTradePress = (tradeId: string) => {
    router.push(`/details/${tradeId}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Market Pulse</Text>
        <View style={styles.demoBadge}>
          <Text style={styles.demoText}>Fictional demo data</Text>
        </View>
      </View>

      <Pressable
        style={styles.searchBar}
        onPress={() => router.push('/screener')}
        accessibilityLabel="Search ticker or company"
      >
        <Text style={styles.searchText}>Search ticker or company</Text>
      </Pressable>

      <View style={styles.summaryRow}>
        <SummaryCard
          label="Transactions"
          value={`${summaries.totalTransactions} today`}
          accent={colors.analytics}
        />
        <View style={styles.gap} />
        <SummaryCard
          label="Purchase value"
          value={formatCurrency(summaries.purchaseValue)}
          accent={colors.purchase}
        />
        <View style={styles.gap} />
        <SummaryCard
          label="Sale value"
          value={formatCurrency(summaries.saleValue)}
          accent={colors.sale}
        />
      </View>

      <Text style={styles.sectionTitle}>Top Signals Today</Text>
      <View style={styles.signalRow}>
        {topSignals.map((signal) => (
          <View key={signal} style={styles.signalChip}>
            <Text style={styles.signalText}>{signal}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest Activity</Text>
        <Pressable onPress={() => router.push('/screener')}>
          <Text style={styles.viewAll}>View all →</Text>
        </Pressable>
      </View>

      {latestTrades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} onPress={handleTradePress} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingTop: 60,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
  },
  demoBadge: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  demoText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  searchBar: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  searchText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  gap: { width: spacing.sm },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  signalRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  signalChip: {
    backgroundColor: colors.analytics + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  signalText: {
    color: colors.analytics,
    fontSize: 13,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  viewAll: {
    color: colors.analytics,
    fontSize: 14,
  },
});