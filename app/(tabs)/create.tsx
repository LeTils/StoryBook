import React from 'react';
import {
  View,
  Text,
  Image,
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

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const H_GUTTER  = Spacing.lg;
const CARD_W    = SCREEN_W - H_GUTTER * 2;
const SEC_W     = (CARD_W - Spacing.md) / 2;
// Hero height is a fixed proportion so the rest of the screen always shows.
const HERO_H    = Math.round(SCREEN_H * 0.42);

// ─── Travel image ─────────────────────────────────────────────────────────────
//
// A dramatic road-trip photo that immediately communicates "journey".
// Replace with a locally bundled asset once the design team provides one.

const TRAVEL_IMAGE = {
  uri: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80&auto=format&fit=crop',
};

// ─── Journey flow steps ───────────────────────────────────────────────────────

const STEPS = [
  'Choose a destination',
  'Add your travel dates',
  'Capture memories along the way',
  'Get your StoryBook automatically',
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function CreateScreen() {
  const onJourney = () => Alert.alert('Journey', 'Journey setup — coming soon.');
  const onPost    = () => Alert.alert('Post',    'Media picker — coming soon.');
  const onMoment  = () => Alert.alert('Moment',  'Quick capture — coming soon.');

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

        {/* ── Journey hero card ─────────────────────────────────────────────
            Fixed height so the Quick Share section is always visible below. */}
        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.97}
          onPress={onJourney}
        >
          {/* Travel photo background */}
          <Image source={TRAVEL_IMAGE} style={StyleSheet.absoluteFill} resizeMode="cover" />

          {/* Full-card dark overlay — lifts legibility on any photo */}
          <LinearGradient
            colors={['rgba(10,14,38,0.30)', 'rgba(10,14,38,0.78)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          {/* Warm amber tint at the very bottom — reinforces travel warmth */}
          <LinearGradient
            colors={['transparent', 'rgba(184,98,26,0.18)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 1 }}
          />

          <View style={styles.heroInner}>

            {/* Badge */}
            <View style={styles.newBadge}>
              <View style={styles.newBadgeDot} />
              <Text style={styles.newBadgeText}>NEW JOURNEY</Text>
            </View>

            {/* Text + steps */}
            <View style={styles.heroContent}>
              <Text style={styles.heroHeadline}>
                Turn your trip into{'\n'}a StoryBook.
              </Text>

              <Text style={styles.heroDesc}>
                Add your destination and travel dates. We'll turn your memories
                into a beautiful travel journal automatically.
              </Text>

              {/* Journey flow */}
              <View style={styles.stepList}>
                {STEPS.map((step, i) => (
                  <View key={i} style={styles.stepRow}>
                    <View style={styles.stepNum}>
                      <Text style={styles.stepNumText}>{i + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>

              {/* CTA */}
              <TouchableOpacity
                style={styles.heroCta}
                activeOpacity={0.88}
                onPress={onJourney}
              >
                <Text style={styles.heroCtaText}>Start a Journey</Text>
                <Ionicons name="arrow-forward" size={15} color={Colors.primary} />
              </TouchableOpacity>
            </View>

          </View>
        </TouchableOpacity>

        {/* ── Quick Share ───────────────────────────────────────────────────── */}
        <View style={styles.quickShareHead}>
          <Text style={styles.quickShareTitle}>Quick Share</Text>
          <Text style={styles.quickShareSubtitle}>
            Share a moment or a memory in seconds.
          </Text>
        </View>

        {/* ── Secondary cards ───────────────────────────────────────────────── */}
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
            <View style={styles.photoStack}>
              {[
                { bg: '#7B8EC8', rotate: '-6deg', left: 0  },
                { bg: '#5A9B84', rotate: '-1deg', left: 10 },
                { bg: Colors.accent, rotate: '5deg', left: 20 },
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
    height: HERO_H,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 10,
  },
  heroInner: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  newBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
  },
  newBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  newBadgeText: {
    ...Typography.overline,
    color: 'rgba(255,255,255,0.80)',
  },

  heroContent: {
    gap: 10,
  },
  heroHeadline: {
    ...Typography.title2,
    color: Colors.textInverse,
  },
  heroDesc: {
    ...Typography.footnote,
    color: 'rgba(255,255,255,0.58)',
    lineHeight: 19,
  },

  // Journey steps
  stepList: {
    gap: 7,
    marginTop: 2,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  stepNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(231,167,122,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(231,167,122,0.40)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accent,
    lineHeight: 12,
  },
  stepText: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.70)',
  },

  // CTA
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: 13,
    marginTop: 2,
  },
  heroCtaText: {
    ...Typography.headline,
    color: Colors.primary,
  },

  // ── Quick Share ───────────────────────────────────────────────────────────
  quickShareHead: {
    gap: 3,
  },
  quickShareTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  quickShareSubtitle: {
    ...Typography.footnote,
    color: Colors.textSecondary,
  },

  // ── Secondary cards ───────────────────────────────────────────────────────
  secondaryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  secondaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
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
