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
// Hero is fixed-height so Quick Share + secondary cards always appear below.
const HERO_H    = Math.round(SCREEN_H * 0.43);
// Right photo column width inside the hero card.
const HERO_IMG_W = Math.round(CARD_W * 0.42);

// ─── Travel photo ─────────────────────────────────────────────────────────────

const TRAVEL_IMAGE = {
  uri: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=82&auto=format&fit=crop',
};

// ─── Journey step definitions ─────────────────────────────────────────────────

const STEPS = [
  { icon: 'location-outline'  as const, color: '#D4524A', bg: 'rgba(212,82,74,0.12)',  label: 'Choose a destination'             },
  { icon: 'calendar-outline'  as const, color: '#4A7EC4', bg: 'rgba(74,126,196,0.12)', label: 'Add your travel dates'             },
  { icon: 'camera-outline'    as const, color: '#4DAA82', bg: 'rgba(77,170,130,0.12)', label: 'Capture memories along the way'    },
  { icon: 'book-outline'      as const, color: Colors.accentDark, bg: 'rgba(196,133,90,0.15)', label: 'Get your StoryBook automatically'  },
];

// ─── Post card photo thumbnails ───────────────────────────────────────────────
//
// Three portrait-style gradient "photos" fanned at the bottom of the Post card.

const POST_PHOTOS = [
  { colors: ['#2A4E7A', '#152840'] as const, rotate: '-10deg', tx: -28, ty: 6  },
  { colors: ['#2E6E4E', '#163828'] as const, rotate: '-2deg',  tx: 0,   ty: 2  },
  { colors: ['#7A4020', '#3E1C08'] as const, rotate: '8deg',   tx: 28,  ty: 6  },
];

// ─── Moment story ring colours ────────────────────────────────────────────────

const STORY_COLORS = [
  ['#6B3AA0', '#3A1A60'] as const,
  ['#2E7A5A', '#124030'] as const,
  ['#B05C28', '#602C10'] as const,
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
          <View>
            <Text style={styles.headerTitle}>Create</Text>
            <Text style={styles.headerSubtitle}>Start sharing your journey</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.75}>
            <Ionicons name="close" size={19} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ── Journey hero card ─────────────────────────────────────────────
            Light card with a text column on the left and the travel photo on
            the right — the photo is the emotional anchor, the left explains
            the action clearly.                                               */}
        <View style={[styles.heroCard, { height: HERO_H }]}>

          {/* LEFT — text content */}
          <View style={styles.heroLeft}>

            <View style={styles.newBadge}>
              <View style={styles.newBadgeDot} />
              <Text style={styles.newBadgeText}>NEW JOURNEY</Text>
            </View>

            <Text style={styles.heroHeadline}>
              Turn your trip{'\n'}into a StoryBook.
            </Text>

            <Text style={styles.heroDesc}>
              Create a journey and we'll automatically organize your memories
              into a beautiful travel journal.
            </Text>

            {/* Step list */}
            <View style={styles.stepList}>
              {STEPS.map((step, i) => (
                <View key={i} style={styles.stepRow}>
                  <View style={[styles.stepCircle, { backgroundColor: step.bg }]}>
                    <Ionicons name={step.icon} size={10} color={step.color} />
                  </View>
                  <Text style={styles.stepLabel} numberOfLines={1}>{step.label}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.heroCta}
              activeOpacity={0.88}
              onPress={onJourney}
            >
              <Text style={styles.heroCtaText}>Start Journey</Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.textInverse} />
            </TouchableOpacity>

          </View>

          {/* RIGHT — travel photo with decorative map pins */}
          <View style={[styles.heroRight, { width: HERO_IMG_W }]}>
            <Image
              source={TRAVEL_IMAGE}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />

            {/* Subtle gradient scrim so the right edge merges into the card */}
            <LinearGradient
              colors={['rgba(255,255,255,0.18)', 'transparent']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />

            {/* Decorative map pins — suggest that trips have locations */}
            <View style={[styles.mapPin, { top: '22%', left: '30%' }]}>
              <Ionicons name="location-sharp" size={14} color={Colors.accent} />
            </View>
            <View style={[styles.mapPinSmall, { top: '48%', left: '55%' }]} />
            <View style={[styles.mapPinSmall, { top: '68%', left: '25%' }]} />
          </View>

        </View>

        {/* ── Quick Share ───────────────────────────────────────────────────── */}
        <View style={styles.quickShareHead}>
          <Text style={styles.quickShareTitle}>Quick Share</Text>
          <Text style={styles.quickShareSubtitle}>
            Share a moment or a memory in seconds.
          </Text>
        </View>

        {/* ── Secondary cards ───────────────────────────────────────────────── */}
        <View style={styles.secondaryRow}>

          {/* ── Post ──────────────────────────────────────────────────────── */}
          <TouchableOpacity
            style={[styles.secondaryCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onPost}
          >
            {/* Top: icon + labels */}
            <View style={styles.secTop}>
              <View style={styles.secIconBox}>
                <Ionicons name="camera-outline" size={18} color={Colors.primary} />
              </View>
              <Text style={styles.secTitle}>Post</Text>
              <Text style={styles.secDesc}>Photo, video or carousel.</Text>
            </View>

            {/* Bottom: stacked travel photo thumbnails */}
            <View style={styles.photoFan}>
              {POST_PHOTOS.map((p, i) => (
                <LinearGradient
                  key={i}
                  colors={p.colors}
                  style={[
                    styles.fanPhoto,
                    { transform: [{ translateX: p.tx }, { translateY: p.ty }, { rotate: p.rotate }] },
                  ]}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                >
                  <Ionicons name="image-outline" size={11} color="rgba(255,255,255,0.38)" />
                </LinearGradient>
              ))}
            </View>
          </TouchableOpacity>

          {/* ── Moment ────────────────────────────────────────────────────── */}
          <TouchableOpacity
            style={[styles.secondaryCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onMoment}
          >
            {/* Top: icon + labels */}
            <View style={styles.secTop}>
              <View style={[styles.secIconBox, styles.momentIconBg]}>
                <Ionicons name="flash-outline" size={18} color="#7B5CCC" />
              </View>
              <Text style={styles.secTitle}>Moment</Text>
              <Text style={styles.secDesc}>Share right now.</Text>
              <Text style={styles.expiryLabel}>Expires in 24h</Text>
            </View>

            {/* Bottom: story rings + add button */}
            <View style={styles.storyPreview}>
              {STORY_COLORS.map((colors, i) => (
                <LinearGradient
                  key={i}
                  colors={colors}
                  style={[
                    styles.storyRing,
                    { marginLeft: i > 0 ? -11 : 0, zIndex: 3 - i },
                  ]}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                />
              ))}
              <View style={styles.addStoryBtn}>
                <Ionicons name="add" size={13} color={Colors.textPrimary} />
              </View>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
  },
  headerTitle: {
    ...Typography.title1,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    marginTop: 2,
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
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  // ── Hero card — light split layout ────────────────────────────────────────
  heroCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 24,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },

  // Left text column
  heroLeft: {
    flex: 1,
    padding: Spacing.md,
    paddingTop: Spacing.md,
    justifyContent: 'space-between',
  },
  newBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(231,167,122,0.14)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(231,167,122,0.30)',
    marginBottom: 8,
  },
  newBadgeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.accent,
  },
  newBadgeText: {
    ...Typography.overline,
    color: Colors.accentDark,
  },
  heroHeadline: {
    ...Typography.title3,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  heroDesc: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  stepList: {
    gap: 6,
    marginBottom: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  stepCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    color: Colors.textSecondary,
    flex: 1,
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: 11,
  },
  heroCtaText: {
    ...Typography.subhead,
    fontWeight: '700',
    color: Colors.textInverse,
  },

  // Right photo column
  heroRight: {
    position: 'relative',
    overflow: 'hidden',
  },
  mapPin: {
    position: 'absolute',
  },
  mapPinSmall: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.8)',
  },

  // ── Quick Share ───────────────────────────────────────────────────────────
  quickShareHead: {
    gap: 2,
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
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    minHeight: 158,
    justifyContent: 'space-between',
  },

  secTop: {
    padding: Spacing.md,
    paddingBottom: 6,
  },
  secIconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  momentIconBg: {
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
  expiryLabel: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    marginTop: 2,
  },

  // Post photo fan — portrait-oriented thumbnails at the bottom of the card
  photoFan: {
    height: 68,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: Spacing.md,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
  },
  fanPhoto: {
    position: 'absolute',
    width: 44,
    height: 56,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Moment story rings
  storyPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: 0,
  },
  storyRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2.5,
    borderColor: Colors.surface,
  },
  addStoryBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
