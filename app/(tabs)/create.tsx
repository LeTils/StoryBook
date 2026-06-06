import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants';

// ─── Dimensions ───────────────────────────────────────────────────────────────

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_W = SCREEN_W - Spacing.lg * 2;
const SECONDARY_W = (CARD_W - Spacing.md) / 2;

// ─── Feature list ─────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: 'images-outline'      as const, label: 'Photos & Videos' },
  { icon: 'map-outline'         as const, label: 'Maps & Routes'   },
  { icon: 'calendar-outline'    as const, label: 'Daily Memories'  },
  { icon: 'stats-chart-outline' as const, label: 'Travel Stats'    },
];

// ─── Mock route points for the decorative map overlay ─────────────────────────
//
// Positions are relative to the hero card (~CARD_W × 200 decorative area).
// All values work for any phone ≥ 320px wide; they're intentionally imprecise
// since this is purely a visual motif.

const ROUTE_DOTS = [
  { top: 44, left: 44,  size: 7,  opacity: 0.55, active: false },
  { top: 28, left: 130, size: 12, opacity: 1,    active: true  },
  { top: 58, left: 214, size: 7,  opacity: 0.50, active: false },
  { top: 38, left: 294, size: 7,  opacity: 0.45, active: false },
  { top: 76, left: 88,  size: 4,  opacity: 0.30, active: false },
  { top: 18, left: 175, size: 4,  opacity: 0.28, active: false },
];

// Pre-calculated: midpoint + rotation for lines connecting P0→P1→P2→P3
const ROUTE_LINES = [
  { left: 47,  top: 44, width: 91,  rotate: '-9deg'   },
  { left: 135, top: 49, width: 88,  rotate: '17deg'   },
  { left: 216, top: 51, width: 83,  rotate: '-14deg'  },
];

// ─── Decorative route overlay ─────────────────────────────────────────────────

function HeroMapDecoration() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {ROUTE_LINES.map((line, i) => (
        <View
          key={i}
          style={[
            styles.routeLine,
            {
              top: line.top,
              left: line.left,
              width: line.width,
              transform: [{ rotate: line.rotate }],
            },
          ]}
        />
      ))}

      {ROUTE_DOTS.map((dot, i) => (
        <View
          key={i}
          style={[
            styles.routeDot,
            {
              top: dot.top - dot.size / 2,
              left: dot.left - dot.size / 2,
              width: dot.size,
              height: dot.size,
              borderRadius: dot.size / 2,
              opacity: dot.opacity,
              backgroundColor: dot.active ? Colors.accent : 'rgba(255,255,255,0.8)',
            },
          ]}
        >
          {dot.active && (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  borderRadius: dot.size / 2,
                  borderWidth: 3,
                  borderColor: 'rgba(231,167,122,0.35)',
                  margin: -5,
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function CreateScreen() {
  const handleStartStoryBook = () =>
    Alert.alert('StoryBook', 'StoryBook creation flow — coming soon.');
  const handlePost = () =>
    Alert.alert('Post', 'Media picker — coming soon.');
  const handleMoment = () =>
    Alert.alert('Moment', 'Quick capture flow — coming soon.');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Create</Text>
            <Text style={styles.headerSubtitle}>Start sharing your journey</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.75}>
            <Ionicons name="close" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ── Featured StoryBook hero card ─────────────────────────────────── */}
        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.96}
          onPress={handleStartStoryBook}
        >
          {/* Base deep navy gradient — sky/night landscape */}
          <LinearGradient
            colors={['#232A62', '#141A3F', '#0D1230']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
          />

          {/* Warm amber glow — sunrise/golden-hour feel */}
          <LinearGradient
            colors={['transparent', 'rgba(184,98,26,0.22)', 'rgba(231,167,122,0.10)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 1, y: 0.4 }}
            end={{ x: 0.1, y: 1 }}
          />

          {/* Decorative travel route */}
          <HeroMapDecoration />

          {/* Readability scrim from mid-card downward */}
          <LinearGradient
            colors={['transparent', 'rgba(10,14,38,0.92)']}
            style={[StyleSheet.absoluteFill, { top: '35%' }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          {/* Card content */}
          <View style={styles.heroInner}>
            {/* Top bar — badge */}
            <View style={styles.heroTopBar}>
              <View style={styles.featuredBadge}>
                <View style={styles.featuredDot} />
                <Text style={styles.featuredText}>FEATURED</Text>
              </View>
            </View>

            {/* Bottom content */}
            <View style={styles.heroBottom}>
              <Text style={styles.heroTitle}>New StoryBook</Text>
              <Text style={styles.heroDesc}>
                Turn a trip into a living travel journal.
              </Text>

              {/* Feature grid */}
              <View style={styles.featureGrid}>
                {FEATURES.map(f => (
                  <View key={f.label} style={styles.featureItem}>
                    <View style={styles.featureIconBox}>
                      <Ionicons name={f.icon} size={12} color={Colors.accent} />
                    </View>
                    <Text style={styles.featureLabel}>{f.label}</Text>
                  </View>
                ))}
              </View>

              {/* CTA */}
              <TouchableOpacity
                style={styles.heroCta}
                activeOpacity={0.88}
                onPress={handleStartStoryBook}
              >
                <Text style={styles.heroCtaText}>Start a StoryBook</Text>
                <Ionicons name="arrow-forward" size={15} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* ── Quick Share section ──────────────────────────────────────────── */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Quick Share</Text>
          <Text style={styles.sectionSubtitle}>
            Share a moment or a memory in seconds.
          </Text>
        </View>

        {/* ── Secondary cards row ──────────────────────────────────────────── */}
        <View style={styles.secondaryRow}>

          {/* Post card */}
          <TouchableOpacity
            style={[styles.secondaryCard, { width: SECONDARY_W }]}
            activeOpacity={0.93}
            onPress={handlePost}
          >
            <View style={styles.secondaryCardInner}>
              {/* Icon */}
              <View style={[styles.secondaryIconBox, styles.postIconBox]}>
                <Ionicons name="camera-outline" size={20} color={Colors.primary} />
              </View>

              {/* Text */}
              <Text style={styles.secondaryTitle}>Post</Text>
              <Text style={styles.secondaryDesc}>
                Share a photo, video or carousel.
              </Text>

              {/* Photo stack preview */}
              <View style={styles.photoStack}>
                {[
                  { bg: '#7B8EC8', rotate: '-7deg', offset: 0  },
                  { bg: '#5A9B84', rotate: '-2deg', offset: 6  },
                  { bg: '#E7A77A', rotate: '4deg',  offset: 12 },
                ].map((p, i) => (
                  <View
                    key={i}
                    style={[
                      styles.photoThumb,
                      {
                        backgroundColor: p.bg,
                        left: p.offset,
                        transform: [{ rotate: p.rotate }],
                        zIndex: i,
                      },
                    ]}
                  >
                    <Ionicons name="image-outline" size={12} color="rgba(255,255,255,0.75)" />
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>

          {/* Moment card */}
          <TouchableOpacity
            style={[styles.secondaryCard, { width: SECONDARY_W }]}
            activeOpacity={0.93}
            onPress={handleMoment}
          >
            <View style={styles.secondaryCardInner}>
              {/* Icon */}
              <View style={[styles.secondaryIconBox, styles.momentIconBox]}>
                <Ionicons name="flash-outline" size={20} color="#7B5CCC" />
              </View>

              {/* Text */}
              <Text style={styles.secondaryTitle}>Moment</Text>
              <Text style={styles.secondaryDesc}>
                Share what's happening right now.
              </Text>
              <Text style={styles.momentExpiry}>Expires in 24h.</Text>

              {/* Story circles preview */}
              <View style={styles.storyCirclesRow}>
                {['#7B8EC8', '#5A9B84', '#E7A77A'].map((color, i) => (
                  <View
                    key={i}
                    style={[
                      styles.storyCircle,
                      {
                        backgroundColor: color,
                        marginLeft: i > 0 ? -10 : 0,
                        zIndex: 3 - i,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  headerTitle: {
    ...Typography.title1,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...Typography.callout,
    color: Colors.textSecondary,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  // ── Hero card ─────────────────────────────────────────────────────────────
  heroCard: {
    width: CARD_W,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.28,
    shadowRadius: 40,
    elevation: 12,
    marginBottom: Spacing.xl,
  },
  heroInner: {
    padding: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
    justifyContent: 'space-between',
    minHeight: 340,
  },
  heroTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  featuredDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  featuredText: {
    ...Typography.overline,
    color: 'rgba(255,255,255,0.75)',
  },

  heroBottom: {
    gap: 10,
  },
  heroTitle: {
    ...Typography.title2,
    color: Colors.textInverse,
  },
  heroDesc: {
    ...Typography.callout,
    color: 'rgba(255,255,255,0.58)',
    lineHeight: 22,
  },

  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: 4,
    marginBottom: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '46%',
  },
  featureIconBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: 'rgba(231,167,122,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.65)',
  },

  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    marginTop: 6,
  },
  heroCtaText: {
    ...Typography.headline,
    color: Colors.primary,
  },

  // ── Map decoration ────────────────────────────────────────────────────────
  routeLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  routeDot: {
    position: 'absolute',
  },

  // ── Quick Share section ───────────────────────────────────────────────────
  sectionHead: {
    marginBottom: Spacing.md,
    gap: 4,
  },
  sectionTitle: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    ...Typography.callout,
    color: Colors.textSecondary,
  },

  // ── Secondary cards ───────────────────────────────────────────────────────
  secondaryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  secondaryCard: {
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  secondaryCardInner: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
    minHeight: 210,
    justifyContent: 'flex-start',
    gap: 6,
  },
  secondaryIconBox: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  postIconBox: {
    backgroundColor: Colors.surfaceSecondary,
  },
  momentIconBox: {
    backgroundColor: 'rgba(123,92,204,0.10)',
  },
  secondaryTitle: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },
  secondaryDesc: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  momentExpiry: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    marginTop: -2,
  },

  // ── Photo stack preview ───────────────────────────────────────────────────
  photoStack: {
    flexDirection: 'row',
    height: 44,
    marginTop: 'auto',
    alignItems: 'flex-end',
    paddingTop: Spacing.sm,
  },
  photoThumb: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },

  // ── Story circles preview ─────────────────────────────────────────────────
  storyCirclesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: Spacing.sm,
    height: 44,
    alignSelf: 'flex-start',
  },
  storyCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
});
