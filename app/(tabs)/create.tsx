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
const H_GUTTER   = Spacing.lg;
const CARD_W     = SCREEN_W - H_GUTTER * 2;
const SEC_W      = (CARD_W - Spacing.md) / 2;
const HERO_H     = Math.round(SCREEN_H * 0.43);
// Photo column: wider share so imagery dominates the hero card.
const PHOTO_COL  = Math.round(CARD_W * 0.50);

// ─── Travel image ─────────────────────────────────────────────────────────────

const TRAVEL_IMAGE = {
  uri: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=520&q=85&auto=format&fit=crop',
};

// ─── Visual journey path icons ────────────────────────────────────────────────
//
// Replaces the numbered step list with a compact icon row — conveys the flow
// without any instructional copy.

const PATH_ICONS = [
  'location-outline',
  'calendar-outline',
  'camera-outline',
  'book-outline',
] as const;

// ─── Post card photo collage ──────────────────────────────────────────────────
//
// Three portrait-orientation gradient "photos" fanned at different angles.
// Each one simulates a real travel memory — the card reads as "share photos"
// before any text is processed.

const POST_PHOTOS = [
  {
    colors: ['#1E557A', '#0C2E44'] as const,
    top: -10, left: -14, w: 118, h: 96, rotate: '-8deg',
  },
  {
    colors: ['#1A6E44', '#0A3A22'] as const,
    top: 28, left: 18, w: 108, h: 88, rotate: '3deg',
  },
  {
    colors: ['#7E3C18', '#3E1C08'] as const,
    top: 64, right: -10, w: 112, h: 86, rotate: '9deg',
  },
];

// ─── Moment story ring data ───────────────────────────────────────────────────

const STORY_RINGS = [
  { gradient: ['#8B3AA0', '#4A1A60'] as const },
  { gradient: ['#1A8A5E', '#0A4A30'] as const },
  { gradient: ['#C05A20', '#6A2A08'] as const },
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
            Light card: photo fills 50% width so imagery leads; text on the
            left is minimal — title, one sentence, visual path, CTA only.   */}
        <View style={[styles.heroCard, { height: HERO_H }]}>

          {/* LEFT — stripped-down copy */}
          <View style={styles.heroLeft}>

            <View style={styles.newBadge}>
              <View style={styles.newBadgeDot} />
              <Text style={styles.newBadgeText}>NEW JOURNEY</Text>
            </View>

            <Text style={styles.heroTitle}>Start a{'\n'}Journey.</Text>

            <Text style={styles.heroDesc}>
              Add your destination and dates. We'll build your StoryBook along
              the way.
            </Text>

            {/* Visual journey path — icon nodes joined by lines, no labels */}
            <View style={styles.journeyPath}>
              {PATH_ICONS.map((icon, i) => (
                <React.Fragment key={icon}>
                  {i > 0 && <View style={styles.pathLine} />}
                  <View style={styles.pathNode}>
                    <Ionicons name={icon} size={9} color={Colors.accent} />
                  </View>
                </React.Fragment>
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

          {/* RIGHT — travel photo with map-pin decorations */}
          <View style={[styles.heroPhotoCol, { width: PHOTO_COL }]}>
            <Image
              source={TRAVEL_IMAGE}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            {/* Left-edge scrim blends photo into the white card */}
            <LinearGradient
              colors={['rgba(255,255,255,0.25)', 'transparent']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            {/* Decorative map pins */}
            <View style={[styles.mapPinIcon, { top: '20%', left: '28%' }]}>
              <Ionicons name="location-sharp" size={16} color={Colors.accent} />
            </View>
            <View style={[styles.mapPinDot, { top: '50%', left: '52%' }]} />
            <View style={[styles.mapPinDot, { top: '70%', left: '22%' }]} />
          </View>

        </View>

        {/* ── Quick Share ───────────────────────────────────────────────────── */}
        <View style={styles.quickShareHead}>
          <Text style={styles.quickShareTitle}>Quick Share</Text>
          <Text style={styles.quickShareSub}>
            Share a moment or a memory in seconds.
          </Text>
        </View>

        {/* ── Secondary cards ───────────────────────────────────────────────── */}
        <View style={styles.secondaryRow}>

          {/* ── Post ──────────────────────────────────────────────────────── */}
          {/* White card: gradient photo collage fills most of the space;
              only a thin bottom strip names the action.                     */}
          <TouchableOpacity
            style={[styles.postCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onPost}
          >
            {POST_PHOTOS.map((p, i) => (
              <LinearGradient
                key={i}
                colors={p.colors}
                style={[
                  styles.postPhoto,
                  {
                    top: p.top, left: p.left, right: p.right,
                    width: p.w, height: p.h,
                    transform: [{ rotate: p.rotate }],
                  } as any,
                ]}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 1 }}
              >
                <Ionicons name="image-outline" size={12} color="rgba(255,255,255,0.35)" />
              </LinearGradient>
            ))}

            {/* Bottom strip */}
            <View style={styles.postBottom}>
              <Ionicons name="camera-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.cardLabel}>Post</Text>
            </View>
          </TouchableOpacity>

          {/* ── Moment ────────────────────────────────────────────────────── */}
          {/* Dark card: story rings dominate; LIVE badge top-right; minimal
              bottom text. Communicates "live / happening now" instantly.    */}
          <TouchableOpacity
            style={[styles.momentCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onMoment}
          >
            {/* Dark gradient background */}
            <LinearGradient
              colors={['#1C1040', '#0A0818']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0.3, y: 0 }}
              end={{ x: 0.7, y: 1 }}
            />

            {/* Warm accent glow from bottom */}
            <LinearGradient
              colors={['transparent', 'rgba(139,58,160,0.28)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0.4 }}
              end={{ x: 0, y: 1 }}
            />

            {/* LIVE badge */}
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>

            {/* Story rings — the visual centrepiece */}
            <View style={styles.storyRingsRow}>
              {STORY_RINGS.map((ring, i) => (
                <LinearGradient
                  key={i}
                  colors={ring.gradient}
                  style={[
                    styles.storyRing,
                    { marginLeft: i > 0 ? -15 : 0, zIndex: 3 - i },
                  ]}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                />
              ))}
            </View>

            {/* Bottom strip */}
            <View style={styles.momentBottom}>
              <Ionicons name="flash" size={12} color={Colors.accent} />
              <Text style={styles.cardLabelLight}>Moment</Text>
              <Text style={styles.expiryDot}>· 24h</Text>
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

  // ── Hero card ─────────────────────────────────────────────────────────────
  heroCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 22,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },

  // Left text column — compact, minimal
  heroLeft: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  newBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(231,167,122,0.12)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(231,167,122,0.28)',
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
  heroTitle: {
    ...Typography.title2,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 11.5,
    fontWeight: '400',
    lineHeight: 17,
    color: Colors.textSecondary,
    marginBottom: 12,
  },

  // Visual journey path — icon nodes + connecting lines, no text
  journeyPath: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  pathNode: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(231,167,122,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(231,167,122,0.32)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pathLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(231,167,122,0.28)',
    marginHorizontal: 3,
  },

  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
  },
  heroCtaText: {
    ...Typography.subhead,
    fontWeight: '700',
    color: Colors.textInverse,
  },

  // Right photo column
  heroPhotoCol: {
    position: 'relative',
    overflow: 'hidden',
  },
  mapPinIcon: {
    position: 'absolute',
  },
  mapPinDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
  },

  // ── Quick Share ───────────────────────────────────────────────────────────
  quickShareHead: {
    gap: 2,
  },
  quickShareTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  quickShareSub: {
    ...Typography.footnote,
    color: Colors.textSecondary,
  },

  // ── Secondary cards ───────────────────────────────────────────────────────
  secondaryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  // Post card — white background with photo collage dominating
  postCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    minHeight: 164,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  postPhoto: {
    position: 'absolute',
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  cardLabel: {
    ...Typography.subhead,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  // Moment card — dark, story-first
  momentCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    minHeight: 164,
    justifyContent: 'flex-end',
    shadowColor: '#0A0818',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  liveBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.success,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.80)',
    letterSpacing: 0.8,
  },
  storyRingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: Spacing.xl,
  },
  storyRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  momentBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  cardLabelLight: {
    ...Typography.subhead,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  expiryDot: {
    ...Typography.caption2,
    color: 'rgba(255,255,255,0.45)',
  },
});
