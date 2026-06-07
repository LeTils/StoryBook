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
const H_GUTTER = Spacing.lg;
const CARD_W   = SCREEN_W - H_GUTTER * 2;
const SEC_W    = (CARD_W - Spacing.md) / 2;
const HERO_H   = Math.round(SCREEN_H * 0.44);

// ─── Travel image ─────────────────────────────────────────────────────────────
//
// Winding coastal road — open road energy, clearly a journey.
// Swap for a bundled asset once design provides one.

const TRAVEL_IMAGE = {
  uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=82&auto=format&fit=crop',
};

// ─── Journey waypoint icons ───────────────────────────────────────────────────
//
// Replaces the 4-step text list: a compact horizontal icon path that
// communicates the flow without competing with the photo.

const WAYPOINTS = [
  'location-outline',
  'calendar-outline',
  'camera-outline',
  'book-outline',
] as const;

// ─── Post preview photos ──────────────────────────────────────────────────────
//
// Simulate a photo fan with travel-palette gradients so the Post card
// instantly reads as "share photos" without any copy.

const FAN_PHOTOS = [
  { colors: ['#2D5A8E', '#1A3352'] as const, rotate: '-13deg', tx: -22 },
  { colors: ['#3D7A5C', '#1E4A35'] as const, rotate: '-2deg',  tx: 0   },
  { colors: ['#8E5226', '#5C2E10'] as const, rotate: '11deg',  tx: 22  },
];

// ─── Moment preview circles ───────────────────────────────────────────────────

const STORY_PREVIEWS = [
  { colors: ['#6B3AA0', '#3A1A60'] as const },
  { colors: ['#3A8A5C', '#1A5232'] as const },
  { colors: ['#C06A30', '#7A3C14'] as const },
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
            Photo is the hero: overlay is nearly transparent at the top so the
            landscape shows clearly; only the bottom third gets dark enough to
            hold white text.                                                  */}
        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.97}
          onPress={onJourney}
        >
          <Image
            source={TRAVEL_IMAGE}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />

          {/* 4-stop gradient — clear at top, dark at bottom */}
          <LinearGradient
            colors={[
              'rgba(8,12,32,0.06)',
              'rgba(8,12,32,0.06)',
              'rgba(8,12,32,0.60)',
              'rgba(8,12,32,0.90)',
            ]}
            locations={[0, 0.42, 0.72, 1]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          {/* Warm amber accent at very bottom edge */}
          <LinearGradient
            colors={['transparent', 'rgba(184,98,26,0.20)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.68 }}
            end={{ x: 0, y: 1 }}
          />

          <View style={styles.heroInner}>

            {/* Badge — floats over the clear-photo area */}
            <View style={styles.newBadge}>
              <View style={styles.newBadgeDot} />
              <Text style={styles.newBadgeText}>NEW JOURNEY</Text>
            </View>

            {/* Bottom text block */}
            <View style={styles.heroContent}>

              {/* Compact waypoint path replacing the 4-step list */}
              <View style={styles.waypointRow}>
                {WAYPOINTS.map((icon, i) => (
                  <React.Fragment key={icon}>
                    {i > 0 && <View style={styles.waypointLine} />}
                    <View style={styles.waypointNode}>
                      <Ionicons name={icon} size={11} color={Colors.accent} />
                    </View>
                  </React.Fragment>
                ))}
              </View>

              <Text style={styles.heroHeadline}>
                Turn your trip into{'\n'}a StoryBook.
              </Text>

              <Text style={styles.heroDesc}>
                Create a journey and we'll automatically organize your memories
                into a beautiful travel journal.
              </Text>

              <TouchableOpacity
                style={styles.heroCta}
                activeOpacity={0.88}
                onPress={onJourney}
              >
                <Text style={styles.heroCtaText}>Start Journey</Text>
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

          {/* ── Post ──────────────────────────────────────────────────────── */}
          <TouchableOpacity
            style={[styles.secondaryCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onPost}
          >
            {/* Photo fan — the visual reads instantly as "share photos" */}
            <View style={styles.fanContainer}>
              {FAN_PHOTOS.map((p, i) => (
                <LinearGradient
                  key={i}
                  colors={p.colors}
                  style={[
                    styles.fanPhoto,
                    { transform: [{ translateX: p.tx }, { rotate: p.rotate }] },
                  ]}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                >
                  <Ionicons
                    name="image-outline"
                    size={13}
                    color="rgba(255,255,255,0.40)"
                  />
                </LinearGradient>
              ))}
            </View>

            <View style={styles.secBottom}>
              <View style={styles.secTitleRow}>
                <Ionicons name="camera-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.secTitle}>Post</Text>
              </View>
              <Text style={styles.secDesc}>Photos & videos</Text>
            </View>
          </TouchableOpacity>

          {/* ── Moment ────────────────────────────────────────────────────── */}
          <TouchableOpacity
            style={[styles.secondaryCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onMoment}
          >
            {/* Story rings — reads instantly as "share a live moment" */}
            <View style={styles.storyContainer}>
              {STORY_PREVIEWS.map((s, i) => (
                <LinearGradient
                  key={i}
                  colors={s.colors}
                  style={[
                    styles.storyRing,
                    { marginLeft: i > 0 ? -13 : 0, zIndex: 3 - i },
                  ]}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                />
              ))}
              {/* Live indicator */}
              <View style={styles.liveChip}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>NOW</Text>
              </View>
            </View>

            <View style={styles.secBottom}>
              <View style={styles.secTitleRow}>
                <Ionicons name="flash-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.secTitle}>Moment</Text>
              </View>
              <Text style={styles.secDesc}>Right now · 24h</Text>
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
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  newBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  newBadgeText: {
    ...Typography.overline,
    color: 'rgba(255,255,255,0.82)',
  },

  heroContent: {
    gap: 10,
  },

  // Compact waypoint path — 4 icon dots joined by thin lines
  waypointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  waypointNode: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(231,167,122,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(231,167,122,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waypointLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(231,167,122,0.28)',
    marginHorizontal: 4,
  },

  heroHeadline: {
    ...Typography.title3,
    color: Colors.textInverse,
  },
  heroDesc: {
    ...Typography.footnote,
    color: 'rgba(255,255,255,0.54)',
    lineHeight: 19,
  },

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
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    minHeight: 152,
  },
  secBottom: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: 3,
  },
  secTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  secTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  secDesc: {
    ...Typography.footnote,
    color: Colors.textSecondary,
  },

  // ── Post photo fan ────────────────────────────────────────────────────────
  fanContainer: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  fanPhoto: {
    position: 'absolute',
    width: 54,
    height: 64,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Moment story rings ────────────────────────────────────────────────────
  storyContainer: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    gap: 0,
  },
  storyRing: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2.5,
    borderColor: Colors.surface,
  },
  liveChip: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.success,
  },
  liveText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.textInverse,
    letterSpacing: 0.8,
  },
});
