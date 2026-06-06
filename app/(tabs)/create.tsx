import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants';

// ─── Dimensions ───────────────────────────────────────────────────────────────

const { width: SCREEN_W } = Dimensions.get('window');
const H_GUTTER = Spacing.lg;
const CARD_W    = SCREEN_W - H_GUTTER * 2;
const SEC_W     = (CARD_W - Spacing.md) / 2;

// ─── Mock StoryBook journal data ──────────────────────────────────────────────
//
// Rendered inside the hero card so users immediately understand what a
// StoryBook looks like — not a feature list, but real trip data.

const PREVIEW = {
  title     : 'Italy 2027',
  location  : 'Florence · Tuscany',
  day       : 4,
  totalDays : 10,
  note      : 'Golden hour at Piazzale Michelangelo. Wine on rooftops.',
  photos    : 32,
  videos    : 8,
  places    : 4,
  km        : 18,
};

// ─── Stats data ───────────────────────────────────────────────────────────────

const STATS = [
  { icon: 'camera-outline'   as const, value: PREVIEW.photos,          label: 'Photos'  },
  { icon: 'videocam-outline' as const, value: PREVIEW.videos,          label: 'Videos'  },
  { icon: 'location-outline' as const, value: PREVIEW.places,          label: 'Places'  },
  { icon: 'walk-outline'     as const, value: `${PREVIEW.km} km`,      label: 'Walked'  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function CreateScreen() {
  const onStoryBook = () => Alert.alert('StoryBook', 'Creation flow — coming soon.');
  const onPost      = () => Alert.alert('Post',      'Media picker — coming soon.');
  const onMoment    = () => Alert.alert('Moment',    'Quick capture — coming soon.');

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.layout}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create</Text>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.75}>
            <Ionicons name="close" size={19} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ── StoryBook hero card ───────────────────────────────────────────
            flex: 1 so it fills whatever space remains between the header and
            the secondary row — no hard-coded height needed.                  */}
        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.97}
          onPress={onStoryBook}
        >
          {/* Deep night-sky base */}
          <LinearGradient
            colors={['#232A62', '#161C42', '#0D1230']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.7, y: 1 }}
          />

          {/* Warm horizon glow — golden-hour atmosphere */}
          <LinearGradient
            colors={['transparent', 'rgba(184,98,26,0.30)', 'rgba(184,98,26,0.08)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.8, y: 1 }}
            end={{ x: 0.1, y: 0.3 }}
          />

          {/* Bottom readability scrim */}
          <LinearGradient
            colors={['transparent', 'rgba(10,14,38,0.80)']}
            style={[StyleSheet.absoluteFill, { top: '45%' }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          <View style={styles.heroInner}>

            {/* Top row ─────────────────────────────────────────────────── */}
            <View style={styles.heroTopRow}>
              <View style={styles.journeyBadge}>
                <View style={styles.journeyDot} />
                <Text style={styles.journeyBadgeText}>STORYBOOK PREVIEW</Text>
              </View>
              <View style={styles.dayPill}>
                <Text style={styles.dayPillText}>
                  Day {PREVIEW.day} / {PREVIEW.totalDays}
                </Text>
              </View>
            </View>

            {/* Spacer — pushes main text toward vertical center */}
            <View style={{ flex: 1 }} />

            {/* Location + title + note ─────────────────────────────────── */}
            <View style={styles.heroMid}>
              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={12}
                  color={Colors.accent}
                />
                <Text style={styles.locationText}>{PREVIEW.location}</Text>
              </View>

              <Text style={styles.heroTitle}>{PREVIEW.title}</Text>

              <Text style={styles.heroNote} numberOfLines={1}>
                {PREVIEW.note}
              </Text>
            </View>

            {/* Stats ───────────────────────────────────────────────────── */}
            <View style={styles.statsRow}>
              {STATS.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <View style={styles.statDivider} />}
                  <View style={styles.statItem}>
                    <Ionicons
                      name={s.icon}
                      size={14}
                      color="rgba(255,255,255,0.50)"
                    />
                    <Text style={styles.statValue}>{s.value}</Text>
                    <Text style={styles.statLabel}>{s.label}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>

            {/* CTA ─────────────────────────────────────────────────────── */}
            <TouchableOpacity
              style={styles.heroCta}
              activeOpacity={0.88}
              onPress={onStoryBook}
            >
              <Text style={styles.heroCtaText}>Start a StoryBook</Text>
              <Ionicons name="arrow-forward" size={15} color={Colors.primary} />
            </TouchableOpacity>

          </View>
        </TouchableOpacity>

        {/* ── Secondary row ─────────────────────────────────────────────── */}
        <View style={styles.secondaryRow}>

          {/* Post */}
          <TouchableOpacity
            style={[styles.secondaryCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onPost}
          >
            <View style={styles.secIconBox}>
              <Ionicons name="camera-outline" size={19} color={Colors.primary} />
            </View>
            <Text style={styles.secTitle}>Post</Text>
            <Text style={styles.secDesc}>Photo, video or carousel.</Text>

            {/* Stacked photo thumbnails */}
            <View style={styles.photoStack}>
              {[
                { bg: '#7B8EC8', rotate: '-6deg', left: 0  },
                { bg: '#5A9B84', rotate: '-1deg', left: 10 },
                { bg: Colors.accent, rotate: '5deg',  left: 20 },
              ].map((p, i) => (
                <View
                  key={i}
                  style={[
                    styles.photoThumb,
                    { backgroundColor: p.bg, left: p.left, transform: [{ rotate: p.rotate }] },
                  ]}
                />
              ))}
            </View>
          </TouchableOpacity>

          {/* Moment */}
          <TouchableOpacity
            style={[styles.secondaryCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onMoment}
          >
            <View style={[styles.secIconBox, styles.momentIconBox]}>
              <Ionicons name="flash-outline" size={19} color="#7B5CCC" />
            </View>
            <Text style={styles.secTitle}>Moment</Text>
            <Text style={styles.secDesc}>Share right now.</Text>
            <Text style={styles.expiryText}>Expires in 24h</Text>

            {/* Overlapping story circles */}
            <View style={styles.storyRow}>
              {['#7B8EC8', '#5A9B84', Colors.accent].map((bg, i) => (
                <View
                  key={i}
                  style={[
                    styles.storyCircle,
                    { backgroundColor: bg, marginLeft: i > 0 ? -9 : 0, zIndex: 3 - i },
                  ]}
                />
              ))}
            </View>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  layout: {
    flex: 1,
    paddingHorizontal: H_GUTTER,
    paddingBottom: Spacing.sm,
    gap: Spacing.md,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
  },
  headerTitle: {
    ...Typography.title1,
    color: Colors.textPrimary,
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  // ── Hero card ─────────────────────────────────────────────────────────────
  heroCard: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.26,
    shadowRadius: 36,
    elevation: 12,
  },
  heroInner: {
    flex: 1,
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },

  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  journeyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  journeyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  journeyBadgeText: {
    ...Typography.overline,
    color: 'rgba(255,255,255,0.70)',
  },
  dayPill: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  dayPillText: {
    ...Typography.caption2,
    color: 'rgba(255,255,255,0.55)',
  },

  heroMid: {
    gap: 6,
    marginBottom: Spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    ...Typography.caption1,
    color: Colors.accent,
    fontWeight: '600',
  },
  heroTitle: {
    ...Typography.title1,
    color: Colors.textInverse,
  },
  heroNote: {
    ...Typography.callout,
    color: 'rgba(255,255,255,0.48)',
    fontStyle: 'italic',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  statValue: {
    ...Typography.headline,
    color: Colors.textInverse,
  },
  statLabel: {
    ...Typography.caption2,
    color: 'rgba(255,255,255,0.38)',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignSelf: 'center',
  },

  // CTA
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
  },
  heroCtaText: {
    ...Typography.headline,
    color: Colors.primary,
  },

  // ── Secondary row ─────────────────────────────────────────────────────────
  secondaryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  secondaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    paddingBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    minHeight: 148,
    overflow: 'hidden',
  },
  secIconBox: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  momentIconBox: {
    backgroundColor: 'rgba(123,92,204,0.10)',
  },
  secTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  secDesc: {
    ...Typography.footnote,
    color: Colors.textSecondary,
  },
  expiryText: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    marginTop: 2,
  },

  // Photo stack
  photoStack: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.md,
    width: 62,
    height: 40,
  },
  photoThumb: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.surface,
  },

  // Story circles
  storyRow: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
});
