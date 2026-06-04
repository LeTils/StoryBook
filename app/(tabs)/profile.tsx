import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants';

const MOCK_STATS = [
  { value: '8', label: 'Journeys', icon: 'map-outline' as const },
  { value: '12', label: 'Countries', icon: 'globe-outline' as const },
  { value: '342', label: 'Memories', icon: 'images-outline' as const },
  { value: '4.8k', label: 'km', icon: 'navigate-outline' as const },
];

const MOCK_JOURNEYS = [
  {
    id: '1',
    title: 'Italy 2027',
    subtitle: 'Day 4 of 10 · Active',
    active: true,
    gradient: ['#B8621A', '#4A240A'] as const,
  },
  {
    id: '2',
    title: 'Japan 2026',
    subtitle: '14 days · 204 memories',
    active: false,
    gradient: ['#3B1B4A', '#1A0A26'] as const,
  },
  {
    id: '3',
    title: 'New York 2026',
    subtitle: '5 days · 88 memories',
    active: false,
    gradient: ['#1A2A3A', '#0A141E'] as const,
  },
];

const SETTINGS_ITEMS = ['Account privacy', 'Notifications', 'Printed books', 'Help & Support'];

export default function ProfileScreen() {
  const { session, signOut } = useAuth();
  const email = session?.user?.email ?? '';
  const username = session?.user?.user_metadata?.username ?? email.split('@')[0];

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleSignOut} style={styles.settingsButton}>
            <Ionicons name="log-out-outline" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Avatar section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarRing}>
            <LinearGradient
              colors={['#E7A77A', '#C4855A', '#0F1230']}
              style={styles.avatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.avatarText}>{username[0]?.toUpperCase()}</Text>
            </LinearGradient>
            <View style={styles.onlineDot} />
          </View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          {MOCK_STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
              {i < MOCK_STATS.length - 1 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* World map */}
        <TouchableOpacity style={styles.mapCard} activeOpacity={0.9}>
          <LinearGradient
            colors={['#0D2B4A', '#071E38', '#030F1E']}
            style={styles.mapGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Decorative coordinate grid lines */}
            <View style={[styles.gridLine, styles.gridLineH, { top: '30%' }]} />
            <View style={[styles.gridLine, styles.gridLineH, { top: '60%' }]} />
            <View style={[styles.gridLine, styles.gridLineV, { left: '25%' }]} />
            <View style={[styles.gridLine, styles.gridLineV, { left: '55%' }]} />
            <View style={[styles.gridLine, styles.gridLineV, { left: '80%' }]} />

            {/* Visited location dots */}
            {[
              { top: '28%', left: '42%', size: 8 },
              { top: '35%', left: '52%', size: 6 },
              { top: '32%', left: '23%', size: 10 },
              { top: '45%', left: '35%', size: 6 },
              { top: '55%', left: '62%', size: 7 },
              { top: '40%', left: '75%', size: 5 },
              { top: '22%', left: '60%', size: 6 },
            ].map((dot, i) => (
              <View
                key={i}
                style={[
                  styles.mapDot,
                  {
                    top: dot.top as any,
                    left: dot.left as any,
                    width: dot.size,
                    height: dot.size,
                    borderRadius: dot.size / 2,
                  },
                ]}
              />
            ))}

            <View style={styles.mapContent}>
              <View>
                <Text style={styles.mapTitle}>Your world map</Text>
                <Text style={styles.mapSubtitle}>12 countries · 4,820 km explored</Text>
              </View>
              <TouchableOpacity style={styles.mapButton} activeOpacity={0.8}>
                <Text style={styles.mapButtonText}>Explore</Text>
                <Ionicons name="arrow-forward" size={13} color={Colors.textInverse} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* My journeys */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My journeys</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.journeyList}>
            {MOCK_JOURNEYS.map((journey) => (
              <TouchableOpacity key={journey.id} style={styles.journeyCard} activeOpacity={0.88}>
                <LinearGradient
                  colors={journey.gradient}
                  style={styles.journeyCardStripe}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <View style={styles.journeyCardBody}>
                  <View style={styles.journeyCardMain}>
                    {journey.active && (
                      <View style={styles.activePill}>
                        <View style={styles.activePillDot} />
                        <Text style={styles.activePillText}>Active</Text>
                      </View>
                    )}
                    <Text style={styles.journeyTitle}>{journey.title}</Text>
                    <Text style={styles.journeySubtitle}>{journey.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            {SETTINGS_ITEMS.map((item, i) => (
              <TouchableOpacity
                key={item}
                style={[styles.settingRow, i < SETTINGS_ITEMS.length - 1 && styles.settingRowBorder]}
                activeOpacity={0.7}
              >
                <Text style={styles.settingText}>{item}</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingBottom: Spacing.xxxl,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  headerTitle: {
    ...Typography.title2,
    color: Colors.textPrimary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  avatarRing: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.success,
    borderWidth: 3,
    borderColor: Colors.background,
  },
  username: {
    ...Typography.title3,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  editButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  editButtonText: {
    ...Typography.subhead,
    color: Colors.textPrimary,
    fontWeight: '600',
  },

  // Stats
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    marginBottom: Spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },
  statLabel: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
    alignSelf: 'center',
  },

  // World map
  mapCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    height: 170,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,
  },
  mapGradient: {
    flex: 1,
    overflow: 'hidden',
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  gridLineH: {
    left: 0,
    right: 0,
    height: 1,
  },
  gridLineV: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  mapDot: {
    position: 'absolute',
    backgroundColor: Colors.accent,
    opacity: 0.7,
  },
  mapContent: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  mapTitle: {
    ...Typography.title3,
    color: Colors.textInverse,
    marginBottom: 4,
  },
  mapSubtitle: {
    ...Typography.footnote,
    color: 'rgba(255,255,255,0.45)',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  mapButtonText: {
    ...Typography.footnote,
    color: Colors.textInverse,
    fontWeight: '600',
  },

  // Sections
  section: {
    marginTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.title3,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  sectionLink: {
    ...Typography.subhead,
    color: Colors.accent,
    fontWeight: '600',
  },

  // Journey cards
  journeyList: {
    gap: Spacing.sm,
    marginTop: -Spacing.md,
  },
  journeyCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  journeyCardStripe: {
    height: 4,
  },
  journeyCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  journeyCardMain: {
    flex: 1,
    gap: 3,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  activePillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  activePillText: {
    ...Typography.overline,
    color: Colors.success,
    letterSpacing: 0.8,
  },
  journeyTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  journeySubtitle: {
    ...Typography.caption1,
    color: Colors.textSecondary,
  },

  // Settings
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: -Spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: Spacing.md,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
});
