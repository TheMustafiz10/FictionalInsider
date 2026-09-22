


import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ScreenerScreen from '../screens/ScreenerScreen';
import TradeDetailsScreen from '../screens/TradeDetailsScreen';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types/trade';

const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    Home: {
      screen: HomeScreen,
      options: { headerShown: false },
    },
    Screener: {
      screen: ScreenerScreen,
      options: {
        title: 'Latest Trades',
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
      },
    },
    TradeDetails: {
      screen: TradeDetailsScreen,
      options: {
        title: 'Trade Details',
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;