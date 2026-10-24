import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { InsightTopBar } from '../../components/navigation/InsightTopBar';
import { DateRangeFilter } from '../../components/analytics/DateRangeFilter';
import { InsightSegmentedTabs } from '../../components/analytics/InsightSegmentedTabs';
import { InsightBarChart } from '../../components/analytics/InsightBarChart';
import { PerformanceBannerCard } from '../../components/analytics/PerformanceBannerCard';
import { PlatformDonutCard } from '../../components/analytics/PlatformDonutCard';
import { COLORS, SPACING } from '../../constants/theme';
import { formatCurrency, getDashboardMetrics } from '../../utils/analytics';

export default function AnalyticsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { orders, products } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'messages' | 'review'>('messages');
  const [selectedDateRange, setSelectedDateRange] = useState('Jun 2026 - Nov 2026');

  const metrics = getDashboardMetrics(orders);

  const tabs = [
    { key: 'all', label: t('common.all') || 'All' },
    { key: 'messages', label: 'Messages' },
    { key: 'review', label: 'Review' },
  ];

  const handleExport = () => {
    Alert.alert(
      t('settings.exportTitle') || 'Export Data',
      t('settings.exportCompletedMessage') || 'Report has been queued for download.'
    );
  };

  const handleDateFilterPress = () => {
    Alert.alert(
      'Период отчетов',
      'Выберите диапазон дат для отображения аналитики:',
      [
        { text: 'Jun 2026 - Nov 2026', onPress: () => setSelectedDateRange('Jun 2026 - Nov 2026') },
        { text: 'Jan 2026 - May 2026', onPress: () => setSelectedDateRange('Jan 2026 - May 2026') },
        { text: t('common.cancel') || 'Cancel', style: 'cancel' },
      ]
    );
  };

  // 7 data points matching the mockup's heights
  const chartData = [
    { label: '01', value: 90 },
    { label: '02', value: 170 },
    { label: '03', value: 340 },
    { label: '04', value: 480 },
    { label: '05', value: 240 },
    { label: '06', value: 400 },
    { label: '07', value: 210 },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header: Insight + Export Pill */}
      <View style={styles.topBarWrapper}>
        <InsightTopBar
          title="Insight"
          exportTitle="Export"
          onExportPress={handleExport}
          showBack={false}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Range Selector Pill */}
        <DateRangeFilter
          dateLabel={selectedDateRange}
          onPress={handleDateFilterPress}
        />

        {/* Segmented Tabs: All | Messages | Review */}
        <InsightSegmentedTabs
          tabs={tabs}
          activeKey={activeTab}
          onSelectTab={(key) => setActiveTab(key as any)}
        />

        {/* Hero Number (4.488) + Custom Bar Chart with Tooltip (↑ 400) */}
        <InsightBarChart
          heroValue="4.488"
          heroSubtitle="messages sent through your business profile"
          data={chartData}
          highlightIndex={5}
          highlightTooltipText="↑ 400"
        />

        {/* Performance Emerald Banner Card */}
        <PerformanceBannerCard
          sectionTitle="Your chat performance"
          value="100%"
          subtitle="Message response speed"
          onHelpPress={() =>
            Alert.alert(
              'Chat Performance',
              'Показатель рассчитывается на основе скорости ответа клиентам в течение первых 15 минут.'
            )
          }
        />

        {/* Second Emerald Banner Card (as seen in the 3rd mockup screen) */}
        <PerformanceBannerCard
          sectionTitle="Message Delivery"
          value="4.848"
          subtitle="Messages that have been received"
          onHelpPress={() =>
            Alert.alert(
              'Delivery Status',
              'Общее количество доставленных и прочитанных сообщений.'
            )
          }
        />

        {/* Platform Donut Card with Circular Ring & Legend */}
        <PlatformDonutCard
          title="The platform the user is using"
          items={[
            {
              color: COLORS.primary,
              count: '480',
              percentage: 25,
              label: 'Using Business App',
            },
            {
              color: COLORS.accentYellow,
              count: '880',
              percentage: 50,
              label: 'Using Messenger App',
            },
            {
              color: '#CBD5E1',
              count: '610',
              percentage: 25,
              label: 'Another App Platform',
            },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBarWrapper: {
    paddingHorizontal: SPACING.base,
  },
  scrollContent: {
    paddingHorizontal: SPACING.base,
    paddingBottom: 110,
  },
});
