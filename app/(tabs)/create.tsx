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
// Hero takes ~44 % of screen height so Quick Share + cards always show below.
const HERO_H    = Math.round(SCREEN_H * 0.44);

// ─── Images ───────────────────────────────────────────────────────────────────
//
// Hero: a winding coastal road with warm golden light — instantly communicates
// "journey" and wanderlust. Swap for a bundled asset later.

const HERO_IMG = {
  uri: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=820&q=85&auto=format&fit=crop',
};

// Post card preview photos — three portrait-orientation travel memories.
const POST_IMGS = [
  { uri: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&q=75&auto=format&fit=crop' },
  { uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=75&auto=format&fit=crop' },
  { uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=75&auto=format&fit=crop' },
];

// Moment card story ring gradient fills.
const STORY_GRADIENTS = [
  ['#8B3AA0', '#4A1A60'] as const,
  ['#1A8A5E', '#0A4A30'] as const,
  ['#C05A20', '#6A2A08'] as const,
];

// ─── Journey path items ───────────────────────────────────────────────────────

const PATH = [
  { icon: 'location-outline' as const, label: 'Destination' },
  { icon: 'calendar-outline' as const, label: 'Dates'       },
  { icon: 'camera-outline'   as const, label: 'Memories'    },
  { icon: 'book-outline'     as const, label: 'StoryBook'   },
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
            Full-bleed travel photo — the image is the emotional centrepiece.
            Gradient darkens progressively toward the bottom so white text
            and the CTA are always legible, while the top third of the photo
            shows almost unobstructed.                                       */}
        <TouchableOpacity
          style={[styles.heroCard, { height: HERO_H }]}
          activeOpacity={0.97}
          onPress={onJourney}
        >
          <Image source={HERO_IMG} style={StyleSheet.absoluteFill} resizeMode="cover" />

          {/* 4-stop gradient: barely-there at the top, opaque at the bottom */}
          <LinearGradient
            colors={[
              'rgba(10,14,38,0.18)',
              'rgba(10,14,38,0.12)',
              'rgba(10,14,38,0.68)',
              'rgba(10,14,38,0.94)',
            ]}
            locations={[0, 0.32, 0.64, 1]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          <View style={styles.heroInner}>

            {/* Badge — floats over the clear-photo zone */}
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>NEW JOURNEY</Text>
            </View>

            {/* Bottom content block */}
            <View style={styles.heroBottom}>
              <Text style={styles.heroTitle}>Start a Journey</Text>

              <Text style={styles.heroDesc}>
                Add your destination and dates.{'\n'}We'll build your StoryBook along the way.
              </Text>

              {/* Journey path — icon nodes with text labels and connecting lines */}
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

              {/* CTA */}
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

          {/* ── Post ──────────────────────────────────────────────────────── */}
          {/* White card: travel photo thumbnails fill the top portion;
              text sits below — card reads as "share photos" instantly.      */}
          <TouchableOpacity style={[styles.secCard, { width: SEC_W }]} activeOpacity={0.92} onPress={onPost}>

            {/* Photo stack — three overlapping portrait thumbnails */}
            <View style={styles.postStack}>
              <Image source={POST_IMGS[0]} style={[styles.postPhoto, styles.postPhotoBack]}  resizeMode="cover" />
              <Image source={POST_IMGS[1]} style={[styles.postPhoto, styles.postPhotoMid]}   resizeMode="cover" />
              <Image source={POST_IMGS[2]} style={[styles.postPhoto, styles.postPhotoFront]} resizeMode="cover" />
            </View>

            {/* Text strip */}
            <View style={styles.secText}>
              <View style={styles.secTitleRow}>
                <View style={styles.secIconBox}>
                  <Ionicons name="camera-outline" size={15} color={Colors.primary} />
                </View>
                <Text style={styles.secTitle}>Post</Text>
              </View>
              <Text style={styles.secDesc}>Photo, video or carousel.</Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.textTertiary} style={styles.secArrow} />
            </View>
          </TouchableOpacity>

          {/* ── Moment ────────────────────────────────────────────────────── */}
          {/* White card: story rings fill the top portion; text sits below.
              "+ " button mirrors the Instagram Stories add-to-story pattern. */}
          <TouchableOpacity style={[styles.secCard, { width: SEC_W }]} activeOpacity={0.92} onPress={onMoment}>

            {/* Story rings */}
            <View style={styles.momentRings}>
              {STORY_GRADIENTS.map((colors, i) => (
                <LinearGradient
                  key={i}
                  colors={colors}
                  style={[styles.storyRing, { marginLeft: i > 0 ? -14 : 0, zIndex: 3 - i }]}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                />
              ))}
              <View style={styles.addBtn}>
                <Ionicons name="add" size={14} color={Colors.textPrimary} />
              </View>
            </View>

            {/* Text strip */}
            <View style={styles.secText}>
              <View style={styles.secTitleRow}>
                <View style={[styles.secIconBox, styles.momentIconBg]}>
                  <Ionicons name="flash-outline" size={15} color="#7B5CCC" />
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
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },

  // Badge
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

  // Bottom text block
  heroBottom: {
    gap: 10,
  },
  heroTitle: {
    ...Typography.title2,
    color: Colors.textInverse,
  },
  heroDesc: {
    ...Typography.footnote,
    color: 'rgba(255,255,255,0.60)',
    lineHeight: 19,
  },

  // Journey path
  path: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pathItem: {
    alignItems: 'center',
    gap: 4,
  },
  pathNode: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pathLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  pathLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.28)',
    marginHorizontal: 3,
    marginTop: 17, // vertically centred on the 34px nodes
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
  qsHead: {
    gap: 2,
  },
  qsTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  qsSub: {
    ...Typography.footnote,
    color: Colors.textSecondary,
  },

  // ── Secondary cards (shared shell) ───────────────────────────────────────
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
    padding: 12,
    paddingTop: 10,
    gap: 2,
  },
  secTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  secIconBox: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  momentIconBg: {
    backgroundColor: 'rgba(123,92,204,0.12)',
  },
  secTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  secDesc: {
    ...Typography.caption1,
    color: Colors.textSecondary,
  },
  expiryText: {
    ...Typography.caption2,
    color: Colors.textTertiary,
  },
  secArrow: {
    marginTop: 4,
  },

  // ── Post card photo stack ─────────────────────────────────────────────────
  postStack: {
    height: 96,
    position: 'relative',
  },
  postPhoto: {
    position: 'absolute',
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  postPhotoBack: {
    width: 70, height: 88,
    top: 8, left: 6,
    transform: [{ rotate: '-8deg' }],
    zIndex: 1,
  },
  postPhotoMid: {
    width: 72, height: 86,
    top: 5, left: 38,
    transform: [{ rotate: '2deg' }],
    zIndex: 2,
  },
  postPhotoFront: {
    width: 68, height: 84,
    top: 10, right: 6,
    transform: [{ rotate: '10deg' }],
    zIndex: 3,
  },

  // ── Moment card story rings ───────────────────────────────────────────────
  momentRings: {
    height: 96,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.md,
    gap: 0,
  },
  storyRing: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2.5,
    borderColor: Colors.surface,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
