





import React, { useRef } from 'react';
import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
import { InsiderTrade } from '../types/trade';
import { SignalBadge } from './SignalBadge';
import { colors, spacing, radius } from '../theme/colors';
import { formatCurrency, formatDateTime } from '../utils/formatters';

interface Props {
  trade: InsiderTrade;
  onPress: (tradeId: string) => void;
}

export const TradeCard: React.FC<Props> = ({ trade, onPress }) => {
  const pressableRef = useRef<any>(null);

  const isPurchase = trade.type === 'purchase';
  const typeColor = isPurchase ? colors.purchase : colors.sale;
  const arrow = isPurchase ? '↑' : '↓';

  const handlePress = () => {
    if (Platform.OS === 'web' && pressableRef.current) {
      pressableRef.current.blur?.();
    }
    onPress(trade.id);
  };

  return (
    <Pressable
      ref={pressableRef}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={handlePress}
      accessibilityLabel={`${trade.company} ${trade.type} ${trade.signalStrength} signal`}
    >



      {/* Row 1: Ticker + Company*/}
      <View style={styles.topRow}>
        <View style={styles.leftColumn}>
          <Text style={styles.ticker}>{trade.ticker}</Text>
          <Text style={styles.company} numberOfLines={1}>
            {trade.company}
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: typeColor + '20' }]}>
          <Text style={[styles.badgeText, { color: typeColor }]}>
            {arrow} {isPurchase ? 'Purchase' : 'Sale'}
          </Text>
        </View>
      </View>




      {/* Row 2: Value, Insider/role */}
      <View style={styles.bottomRow}>
        <Text style={styles.value}>{formatCurrency(trade.value)}</Text>
        <Text style={styles.insider} numberOfLines={1}>
          {trade.insider} • {trade.role}
        </Text>
      </View>



      {/* Row 3: Filing time, Signal strength */}
      <View style={styles.metaRow}>
        <Text style={styles.time}>{formatDateTime(trade.filedAt)}</Text>
        <SignalBadge strength={trade.signalStrength} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.85 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  leftColumn: { flex: 1, marginRight: spacing.sm },
  ticker: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  company: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.badge,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  insider: {
    color: colors.textSecondary,
    fontSize: 12,
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    color: colors.textSecondary,
    fontSize: 11,
    flex: 1,
  },
});