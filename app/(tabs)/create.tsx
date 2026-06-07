import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
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

// Hero reduced by ~23 % so all three creation options fit without scrolling.
const HERO_H = Math.round(SCREEN_H * 0.34);

// ─── Images ───────────────────────────────────────────────────────────────────

// Hero: winding mountain road at golden hour — aspirational, adventure, journey.
const HERO_IMG = {
  uri: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&auto=format&fit=crop',
};

// ─── Journey path ─────────────────────────────────────────────────────────────

const PATH = [
  { icon: 'location-outline' as const, label: 'Destination' },
  { icon: 'calendar-outline' as const, label: 'Dates'       },
  { icon: 'camera-outline'   as const, label: 'Memories'    },
  { icon: 'book-outline'     as const, label: 'StoryBook'   },
];

// ─── Polaroid photos (Post card) ──────────────────────────────────────────────
//
// Three travel-palette gradient fills styled as Polaroid prints — white frame,
// thick white bottom strip, individual shadows, organic rotations and sizes.

const POLAROIDS = [
  {
    colors: ['#1C3D5A', '#2E7BAF'] as const,
    top: 8, left: 4, w: 64, h: 56,
    rotate: '-10deg', zIndex: 1,
  },
  {
    colors: ['#1A4A2E', '#3E8A5A'] as const,
    top: 4, left: 30, w: 70, h: 60,
    rotate: '4deg', zIndex: 3,
  },
  {
    colors: ['#7A3A14', '#C4783A'] as const,
    top: 6, right: 2, w: 66, h: 55,
    rotate: '13deg', zIndex: 2,
  },
];

// ─── Story rings (Moment card) ────────────────────────────────────────────────
//
// Instagram-style: a vivid gradient border ring, a thin white gap, then a
// travel-destination gradient fill simulating a real story thumbnail.

const STORY_RINGS = [
  {
    border: ['#F77737', '#FCAF45', '#FD1D1D'] as const, // Instagram orange/yellow
    photo:  ['#1C3D5A', '#2A5A8A'] as const,            // coastal blue
  },
  {
    border: ['#833AB4', '#C13584', '#E1306C'] as const, // Instagram purple/pink
    photo:  ['#1A4A2E', '#4DAA82'] as const,            // forest green
  },
  {
    border: ['#405DE6', '#5B51D8', '#833AB4'] as const, // Instagram blue/purple
    photo:  ['#7A3A14', '#C4783A'] as const,            // warm desert
  },
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
            <Text style={styles.headerSub}>Start sharing your journey</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} activeOpacity={0.75}>
            <Ionicons name="close" size={19} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ── Journey hero card ─────────────────────────────────────────────
            Full-bleed mountain road photo. 4-stop gradient: transparent at
            the top so the landscape shows clearly, near-opaque at the bottom
            so badge, title, path and CTA are always legible.               */}
        <TouchableOpacity
          style={[styles.heroCard, { height: HERO_H }]}
          activeOpacity={0.97}
          onPress={onJourney}
        >
          <Image source={HERO_IMG} style={StyleSheet.absoluteFill} resizeMode="cover" />

          <LinearGradient
            colors={[
              'rgba(8,12,32,0.15)',
              'rgba(8,12,32,0.08)',
              'rgba(8,12,32,0.65)',
              'rgba(8,12,32,0.94)',
            ]}
            locations={[0, 0.30, 0.62, 1]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          <View style={styles.heroInner}>

            {/* Badge — top-left, floats over clear-photo zone */}
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>NEW JOURNEY</Text>
            </View>

            {/* Bottom content */}
            <View style={styles.heroBottom}>
              <Text style={styles.heroTitle}>Start a Journey</Text>
              <Text style={styles.heroDesc}>
                Add your destination and dates.{'\n'}We'll build your StoryBook along the way.
              </Text>

              {/* Visual journey path */}
              <View style={styles.path}>
                {PATH.map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && <View style={styles.pathLine} />}
                    <View style={styles.pathItem}>
                      <View style={styles.pathNode}>
                        <Ionicons name={item.icon} size={13} color="rgba(255,255,255,0.90)" />
                      </View>
                      <Text style={styles.pathLabel}>{item.label}</Text>
                    </View>
                  </React.Fragment>
                ))}
              </View>

              <TouchableOpacity style={styles.heroCta} activeOpacity={0.88} onPress={onJourney}>
                <Text style={styles.heroCtaText}>Start Journey</Text>
                <Ionicons name="arrow-forward" size={15} color={Colors.primary} />
              </TouchableOpacity>
            </View>

          </View>
        </TouchableOpacity>

        {/* ── Quick Share ───────────────────────────────────────────────────── */}
        <View style={styles.qsHead}>
          <Text style={styles.qsTitle}>Quick Share</Text>
          <Text style={styles.qsSub}>Share a moment or a memory in seconds.</Text>
        </View>

        {/* ── Secondary cards ───────────────────────────────────────────────── */}
        <View style={styles.secRow}>

          {/* ── Post card ─────────────────────────────────────────────────── */}
          {/* Polaroid-style photos fill the top; a minimal text strip below.  */}
          <TouchableOpacity
            style={[styles.secCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onPost}
          >
            {/* Polaroid stack */}
            <View style={styles.polaroidStack}>
              {POLAROIDS.map((p, i) => (
                <View
                  key={i}
                  style={[
                    styles.polaroid,
                    {
                      top: p.top,
                      left: p.left,
                      right: (p as any).right,
                      zIndex: p.zIndex,
                      transform: [{ rotate: p.rotate }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={p.colors}
                    style={{ width: p.w, height: p.h, borderRadius: 2 }}
                    start={{ x: 0.2, y: 0 }}
                    end={{ x: 0.8, y: 1 }}
                  />
                </View>
              ))}
            </View>

            {/* Text strip */}
            <View style={styles.secText}>
              <View style={styles.secTitleRow}>
                <View style={styles.secIconBox}>
                  <Ionicons name="camera-outline" size={14} color={Colors.primary} />
                </View>
                <Text style={styles.secTitle}>Post</Text>
              </View>
              <Text style={styles.secDesc}>Photo, video or carousel.</Text>
            </View>
          </TouchableOpacity>

          {/* ── Moment card ───────────────────────────────────────────────── */}
          {/* Instagram-style story rings fill the top; text strip below.     */}
          <TouchableOpacity
            style={[styles.secCard, { width: SEC_W }]}
            activeOpacity={0.92}
            onPress={onMoment}
          >
            {/* Story rings with gradient border + white gap + photo fill */}
            <View style={styles.storyStack}>
              {STORY_RINGS.map((ring, i) => (
                <LinearGradient
                  key={i}
                  colors={ring.border}
                  style={[styles.storyOuter, { marginLeft: i > 0 ? -16 : 0, zIndex: 3 - i }]}
                  start={{ x: 0.1, y: 0.9 }}
                  end={{ x: 0.9, y: 0.1 }}
                >
                  {/* White gap */}
                  <View style={styles.storyGap}>
                    {/* Travel photo fill */}
                    <LinearGradient
                      colors={ring.photo}
                      style={styles.storyPhoto}
                      start={{ x: 0.2, y: 0 }}
                      end={{ x: 0.8, y: 1 }}
                    />
                  </View>
                </LinearGradient>
              ))}
              {/* Add story button */}
              <View style={styles.addBtn}>
                <Ionicons name="add" size={14} color={Colors.textSecondary} />
              </View>
            </View>

            {/* Text strip */}
            <View style={styles.secText}>
              <View style={styles.secTitleRow}>
                <View style={[styles.secIconBox, styles.momentIconBg]}>
                  <Ionicons name="flash-outline" size={14} color="#7B5CCC" />
                </View>
                <Text style={styles.secTitle}>Moment</Text>
              </View>
              <Text style={styles.secDesc}>Share right now.</Text>
              <Text style={styles.expiryText}>Expires in 24h.</Text>
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
  headerSub: {
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
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.20,
    shadowRadius: 28,
    elevation: 10,
  },
  heroInner: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  badgeText: {
    ...Typography.overline,
    color: 'rgba(255,255,255,0.88)',
  },
  heroBottom: {
    gap: 8,
  },
  heroTitle: {
    ...Typography.title3,
    color: Colors.textInverse,
  },
  heroDesc: {
    fontSize: 11.5,
    fontWeight: '400' as const,
    lineHeight: 17,
    color: 'rgba(255,255,255,0.60)',
  },

  // Journey path
  path: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pathItem: {
    alignItems: 'center',
    gap: 3,
  },
  pathNode: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pathLabel: {
    fontSize: 8,
    fontWeight: '600' as const,
    color: 'rgba(255,255,255,0.62)',
    letterSpacing: 0.2,
  },
  pathLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.26)',
    marginHorizontal: 2,
    marginTop: 15, // vertically centred on the 30 px nodes
  },

  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
  },
  heroCtaText: {
    ...Typography.subhead,
    fontWeight: '700' as const,
    color: Colors.primary,
  },

  // ── Quick Share ───────────────────────────────────────────────────────────
  qsHead: { gap: 2 },
  qsTitle: { ...Typography.headline, color: Colors.textPrimary },
  qsSub:   { ...Typography.footnote, color: Colors.textSecondary },

  // ── Secondary cards ───────────────────────────────────────────────────────
  secRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  secCard: {
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
  },
  secText: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  secTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  secIconBox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  momentIconBg: {
    backgroundColor: 'rgba(123,92,204,0.12)',
  },
  secTitle:   { ...Typography.headline, color: Colors.textPrimary },
  secDesc:    { ...Typography.caption1, color: Colors.textSecondary },
  expiryText: { ...Typography.caption2, color: Colors.textTertiary },

  // ── Polaroid stack (Post card) ────────────────────────────────────────────
  polaroidStack: {
    height: 92,
    position: 'relative',
  },
  polaroid: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    padding: 3,
    paddingBottom: 11,        // thick white bottom strip = Polaroid look
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 4,
  },

  // ── Story rings (Moment card) ─────────────────────────────────────────────
  storyStack: {
    height: 92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.md,
  },
  storyOuter: {               // vivid gradient ring border
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 2.5,             // ring thickness
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyGap: {                 // white gap between border and photo
    width: 43,
    height: 43,
    borderRadius: 21.5,
    backgroundColor: Colors.surface,
    padding: 1.5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyPhoto: {               // travel destination fill
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
