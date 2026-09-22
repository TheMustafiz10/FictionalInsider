



import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MOCK_TRADES } from '../../data/mockTrades';
import { SignalBadge } from '../../components/SignalBadge';
import { MockActivityChart } from '../../components/MockActivityChart';
import { colors, spacing, radius } from '../../theme/colors';
import {
  formatFullCurrency,
  formatDate,
  formatDateTime,
} from '../../utils/formatters';

export default function TradeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const trade = useMemo(() => MOCK_TRADES.find((t) => t.id === id), [id]);

  if (!trade) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Trade not found</Text>
      </View>
    );
  }

  const isPurchase = trade.type === 'purchase';

  const detailRows = [
    { label: 'Insider', value: `${trade.insider} • ${trade.role}` },
    {
      label: 'Transaction',
      value: `${isPurchase ? 'Purchase ↑' : 'Sale ↓'} • Code ${trade.transactionCode.toUpperCase()}`,
    },
    { label: 'Shares', value: `${trade.shares.toLocaleString()} shares` },
    {
      label: 'Price per share',
      value: `${formatFullCurrency(trade.pricePerShare)} (demo)`,
    },
    {
      label: 'Total value',
      value: `${formatFullCurrency(trade.value)} (demo)`,
    },
    { label: 'Transaction date', value: formatDate(trade.transactionDate) },
    { label: 'Filed date', value: formatDateTime(trade.filedAt) },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerSection}>
        <Text style={styles.company}>{trade.company}</Text>
        <Text style={styles.ticker}>
          {trade.ticker} • {trade.sector}
        </Text>
        <View style={styles.demoBadge}>
          <Text style={styles.demoText}>FICTIONAL DEMO DATA</Text>
        </View>
      </View>

      <View style={styles.signalCard}>
        <View style={styles.signalHeader}>
          <Text style={styles.signalTitle}>{trade.signal}</Text>
          <SignalBadge strength={trade.signalStrength} />
        </View>
        <Text style={styles.signalValue}>
          {formatFullCurrency(trade.value)} fictional demo insider{' '}
          {trade.type}
        </Text>
      </View>

      <View style={styles.detailGrid}>
        {detailRows.map((row, index) => (
          <View
            key={row.label}
            style={[
              styles.detailRow,
              index === detailRows.length - 1 && styles.detailRowLast,
            ]}
          >
            <Text style={styles.detailLabel}>{row.label}</Text>
            <Text style={styles.detailValue}>{row.value}</Text>
          </View>
        ))}
      </View>

      <MockActivityChart />

      <View style={styles.educationBox}>
        <Text style={styles.educationTitle}>Why this matters</Text>
        <Text style={styles.educationText}>
          A senior executive purchase can be a data point for further research
          because it shows a disclosed transaction by someone close to the
          company. It does not reveal the person's full financial situation or
          predict future performance.
        </Text>
      </View>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>
          This prototype uses mock data for demonstration only. Insider-trading
          filings are public disclosures and do not constitute investment
          advice. Past activity does not guarantee future stock performance.
        </Text>
      </View>
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
    paddingBottom: spacing.xl,
  },
  headerSection: {
    marginBottom: spacing.lg,
  },
  company: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  ticker: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  demoBadge: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  demoText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  signalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.purchase + '40',
    marginBottom: spacing.lg,
  },
  signalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  signalTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    marginRight: spacing.sm,
  },
  signalValue: {
    color: colors.purchase,
    fontSize: 15,
    fontWeight: '500',
  },
  detailGrid: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    flexShrink: 0,
  },
  detailValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },
  educationBox: {
    backgroundColor: colors.analytics + '15',
    borderRadius: radius.card,
    padding: spacing.md,
    marginTop: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.analytics,
  },
  educationTitle: {
    color: colors.analytics,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  educationText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  disclaimerBox: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.card,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  disclaimerText: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 17,
    fontStyle: 'italic',
  },
  errorText: {
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
});