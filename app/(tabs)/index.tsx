import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Easing,
  FlatList,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants';

// ─── Dimensions ───────────────────────────────────────────────────────────────

const { height: SCREEN_H } = Dimensions.get('window');
const HERO_HEIGHT = 310;
const FEED_CARD_H = Math.round(SCREEN_H * 0.88);

// ─── Transition thresholds (unchanged from previous iteration) ────────────────

const T = {
  greetingOut : [0,   100],
  storiesOut  : [90,  240],
  heroOut     : [80,  410],
  feedRise    : [0,   370],
  firstScale  : [0,   370],
  dividerOut  : [100, 260],
  chipIn      : [370, 450],
  // Feed mode activates the moment scroll crosses this offset during the gesture.
  // Set just past firstScale completion (370) so the first card locks at full-screen
  // before the user can scroll further.
  feedMode    : 385,
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const JOURNEY = {
  title    : 'Italy 2027',
  day      : 4,
  totalDays: 10,
  location : 'Florence · Tuscany',
  memories : 32,
  km       : 18,
  places   : 4,
};

const STORIES = [
  { id: 'own', isOwn: true,  initials: '',  name: 'Your story', unseen: false },
  { id: '1',  isOwn: false, initials: 'S', name: 'Sarah',       unseen: true  },
  { id: '2',  isOwn: false, initials: 'M', name: 'Marc',        unseen: true  },
  { id: '3',  isOwn: false, initials: 'L', name: 'Léa',         unseen: false },
  { id: '4',  isOwn: false, initials: 'T', name: 'Thomas',      unseen: true  },
  { id: '5',  isOwn: false, initials: 'A', name: 'Alex',        unseen: false },
];

const FEED = [
  {
    id: '1', title: 'Tokyo at Night', author: 'Sarah M.',
    location: 'Tokyo, Japan', timeAgo: '7h ago',
    desc: 'Neon lights, ramen at midnight, temples at dawn. Tokyo never sleeps.',
    gradient: ['#1C1472', '#0E0A40', '#060320'] as const, saves: 128,
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  },
  {
    id: '2', title: 'Iceland Roadtrip', author: 'Marc D.',
    location: 'Iceland', timeAgo: '1d ago',
    desc: 'Epic landscapes, waterfalls, and endless roads with no destination.',
    gradient: ['#0D3557', '#072440', '#03101E'] as const, saves: 92,
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: '3', title: 'Lost in Marrakesh', author: 'Léa P.',
    location: 'Morocco', timeAgo: '2d ago',
    desc: 'Spices, souks, and rooftop sunsets over the ancient medina.',
    gradient: ['#7A4010', '#4A2508', '#1E0F03'] as const, saves: 215,
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  },
  {
    id: '4', title: 'Amalfi at Dawn', author: 'Thomas K.',
    location: 'Italy', timeAgo: '3d ago',
    desc: 'The coast before the crowds. Pure silence and the smell of citrus.',
    gradient: ['#8B3A1A', '#4A1D0C', '#200D05'] as const, saves: 67,
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  },
];

// ─── Shared feed card content ─────────────────────────────────────────────────
//
//  Used by both the transition ScrollView cards and the paged FlatList.
//  Keeping it in one place guarantees visual continuity across the handoff.

type FeedItem = (typeof FEED)[number];

function FeedCardContent({ item }: { item: FeedItem }) {
  return (
    <LinearGradient
      colors={item.gradient}
      style={styles.feedGradient}
      start={{ x: 0.25, y: 0 }}
      end={{ x: 0.75, y: 1 }}
    >
      <View style={styles.feedTop}>
        <View style={styles.feedAuthorRow}>
          <View style={styles.feedAvatar}>
            <Text style={styles.feedAvatarInitial}>{item.author[0]}</Text>
          </View>
          <View>
            <Text style={styles.feedAuthorName}>{item.author}</Text>
            <Text style={styles.feedTimeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity
          hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
          activeOpacity={0.7}
        >
          <Ionicons name="bookmark-outline" size={20} color="rgba(255,255,255,0.75)" />
        </TouchableOpacity>
      </View>

      <View style={styles.feedBottom}>
        <Text style={styles.feedCardTitle}>{item.title}</Text>
        <Text style={styles.feedCardDesc}>{item.desc}</Text>
        <View style={styles.feedMeta}>
          <View style={styles.feedLocRow}>
            <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.4)" />
            <Text style={styles.feedLoc}>{item.location}</Text>
          </View>
          <View style={styles.feedSavesRow}>
            <Ionicons name="heart-outline" size={14} color="rgba(255,255,255,0.55)" />
            <Text style={styles.feedSaves}>{item.saves}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

// ─── Feed video card (FlatList phase only) ────────────────────────────────────
//
//  Each item creates its own VideoPlayer.  The player is muted and looping by
//  default.  It plays only when isActive=true (driven by viewability) and isFeed-
//  Mode=true so nothing runs while the overlay is hidden.  The item's gradient
//  sits behind the VideoView as a loading placeholder that's visible until the
//  first frame arrives.

function FeedVideoCard({ item, isActive }: { item: FeedItem; isActive: boolean }) {
  const [muted, setMuted] = useState(true);

  const player = useVideoPlayer({ uri: item.videoUri }, p => {
    p.loop = true;
    p.muted = true;
  });

  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player]);

  useEffect(() => {
    player.muted = muted;
  }, [muted, player]);

  const toggleMute = useCallback(() => setMuted(m => !m), []);

  return (
    <View style={styles.feedVideoCard}>
      {/* Loading placeholder — same gradient as transition card */}
      <LinearGradient
        colors={item.gradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.25, y: 0 }}
        end={{ x: 0.75, y: 1 }}
      />

      {/* Video layer */}
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
      />

      {/* Scrim + UI overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.82)']}
        style={[StyleSheet.absoluteFill, styles.videoOverlay]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.feedTop}>
          <View style={styles.feedAuthorRow}>
            <View style={styles.feedAvatar}>
              <Text style={styles.feedAvatarInitial}>{item.author[0]}</Text>
            </View>
            <View>
              <Text style={styles.feedAuthorName}>{item.author}</Text>
              <Text style={styles.feedTimeAgo}>{item.timeAgo}</Text>
            </View>
          </View>
          <View style={styles.videoActions}>
            <TouchableOpacity
              hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
              activeOpacity={0.7}
              onPress={toggleMute}
            >
              <Ionicons
                name={muted ? 'volume-mute-outline' : 'volume-high-outline'}
                size={20}
                color="rgba(255,255,255,0.75)"
              />
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
              activeOpacity={0.7}
            >
              <Ionicons name="bookmark-outline" size={20} color="rgba(255,255,255,0.75)" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.feedBottom}>
          <Text style={styles.feedCardTitle}>{item.title}</Text>
          <Text style={styles.feedCardDesc}>{item.desc}</Text>
          <View style={styles.feedMeta}>
            <View style={styles.feedLocRow}>
              <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.4)" />
              <Text style={styles.feedLoc}>{item.location}</Text>
            </View>
            <View style={styles.feedSavesRow}>
              <Ionicons name="heart-outline" size={14} color="rgba(255,255,255,0.55)" />
              <Text style={styles.feedSaves}>{item.saves}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // ── Phase 1: transition scroll ─────────────────────────────────────────────
  const scrollY   = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<any>(null);
  const [chipActive, setChipActive] = useState(false);

  // ── Phase 2: paged feed overlay ───────────────────────────────────────────
  //
  //  isFeedModeRef is the source of truth (avoids stale closure issues).
  //  isFeedMode state drives React renders (pointerEvents, conditional rendering).
  //  feedOverlayAnim drives the opacity cross-fade between phases.
  const isFeedModeRef    = useRef(false);
  const [isFeedMode, setIsFeedMode] = useState(false);
  const feedOverlayAnim  = useRef(new Animated.Value(0)).current;
  const flatListRef      = useRef<FlatList<FeedItem>>(null);
  const currentFeedIndex  = useRef(0);
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);

  // listHeight is measured from the FlatList onLayout so paging is exact
  // regardless of tab bar / safe-area dimensions.
  const [listHeight, setListHeight] = useState(SCREEN_H);
  const listHeightRef = useRef(SCREEN_H);

  // ── Scroll freeze ──────────────────────────────────────────────────────────
  //
  //  Disabled when feed mode activates so the background card cannot drift
  //  during the 240 ms handoff fade.  Re-enabled after the exit fade completes.
  const [mainScrollEnabled, setMainScrollEnabled] = useState(true);

  // ── Layout refs for analytical card-position computation ──────────────────
  //
  //  feedSectionTopRef  — Y of the feedSection in the ScrollView content.
  //  firstCardTopRef    — Y of the first feedCardWrapper within feedSection.
  //  Both are set from onLayout (pre-transform).
  const feedSectionTopRef = useRef(0);
  const firstCardTopRef   = useRef(0);

  // ── Morph animated values (JS thread) ─────────────────────────────────────
  //
  //  Animate the first overlay card from its exact transition-card position
  //  (top / height / borderRadius) to a full-screen page simultaneously with
  //  the opacity fade.  useNativeDriver: false is required for layout props.
  const overlayCardTopAnim    = useRef(new Animated.Value(0)).current;
  const overlayCardHeightAnim = useRef(new Animated.Value(FEED_CARD_H)).current;
  const overlayCardRadiusAnim = useRef(new Animated.Value(0)).current;

  // ── Feed mode: enter ───────────────────────────────────────────────────────
  //
  //  Compute where the first feed card's top edge sits on screen at this exact
  //  scroll offset, then seed the morph animations so the overlay card starts
  //  in exactly that position.  A 240 ms parallel fade + expand then brings
  //  the card to full-screen, making the handoff feel like a natural growth
  //  rather than a sudden overlay appearance.
  //
  //  feedTranslateY is clamped at –80 for all scrollY ≥ T.feedRise[1] (370),
  //  and T.feedMode (385) > 370, so the offset is always exactly –80 here.
  const enterFeedMode = useCallback((currentScrollY: number) => {
    if (isFeedModeRef.current) return;
    isFeedModeRef.current = true;

    const cardTop = Math.max(
      0,
      feedSectionTopRef.current + firstCardTopRef.current - currentScrollY - 80,
    );

    overlayCardTopAnim.setValue(cardTop);
    overlayCardHeightAnim.setValue(FEED_CARD_H);
    overlayCardRadiusAnim.setValue(16);

    setIsFeedMode(true);
    setMainScrollEnabled(false);

    Animated.parallel([
      Animated.timing(feedOverlayAnim, {
        toValue: 1,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(overlayCardTopAnim, {
        toValue: 0,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(overlayCardHeightAnim, {
        toValue: listHeightRef.current,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(overlayCardRadiusAnim, {
        toValue: 0,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
  }, [feedOverlayAnim, overlayCardTopAnim, overlayCardHeightAnim, overlayCardRadiusAnim]);

  // ── Real-time scroll listener ──────────────────────────────────────────────
  //
  //  Runs on every scroll event (JS thread, 16ms throttle).
  //  Feed mode is entered here — not on scroll-end — so the overlay activates
  //  the instant the first card reaches full-screen, before the user can scroll
  //  any further. The 120ms fade covers any residual movement during the crossfade.
  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      // Chip pointer-event toggle
      const next = value > T.chipIn[0];
      setChipActive(prev => (prev === next ? prev : next));

      // Feed mode — detect during the gesture, not after
      if (!isFeedModeRef.current && value >= T.feedMode) {
        enterFeedMode(value);
      }
    });
    return () => scrollY.removeListener(id);
  }, [scrollY, enterFeedMode]);

  // ── Feed mode: exit ────────────────────────────────────────────────────────
  //
  //  Reset both scroll containers while the overlay is still opaque, then fade
  //  the overlay out.  mainScrollEnabled is restored in the completion callback
  //  so the background cannot drift during the exit fade.
  //  Note: on iOS, scrollTo() works even when scrollEnabled=false (the prop
  //  only blocks user touch, not programmatic calls).
  const exitFeedMode = useCallback(() => {
    if (!isFeedModeRef.current) return;

    scrollRef.current?.scrollTo({ y: 0, animated: false });
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });

    Animated.timing(feedOverlayAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      isFeedModeRef.current = false;
      setIsFeedMode(false);
      setMainScrollEnabled(true);
      currentFeedIndex.current = 0;
      setActiveFeedIndex(0);
    });
  }, [feedOverlayAnim]);

  // ── FlatList swipe-down-to-exit handler ────────────────────────────────────
  //
  //  When the user is on the first story and pulls down past the rubber-band
  //  threshold, return to home. This is detected on drag-end (not momentum)
  //  because pagingEnabled kills momentum at page boundaries.
  const handleFeedScrollEndDrag = useCallback((event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y < -48 && currentFeedIndex.current === 0) {
      exitFeedMode();
    }
  }, [exitFeedMode]);

  // Track which FlatList page is currently visible.
  // setActiveFeedIndex is stable so it's safe to capture in the ref callback.
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0;
      currentFeedIndex.current = idx;
      setActiveFeedIndex(idx);
    }
  }).current;

  // ── Chip action ────────────────────────────────────────────────────────────
  const returnToJourney = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  // ── Transition animated values (all native-thread) ─────────────────────────

  const greetingOpacity = scrollY.interpolate({
    inputRange: T.greetingOut, outputRange: [1, 0], extrapolate: 'clamp',
  });
  const storiesOpacity = scrollY.interpolate({
    inputRange: T.storiesOut, outputRange: [1, 0], extrapolate: 'clamp',
  });
  const storiesTranslate = scrollY.interpolate({
    inputRange: T.storiesOut, outputRange: [0, -10], extrapolate: 'clamp',
  });
  const heroOpacity = scrollY.interpolate({
    inputRange: T.heroOut, outputRange: [1, 0], extrapolate: 'clamp',
  });
  const heroScale = scrollY.interpolate({
    inputRange: [0, T.heroOut[1]], outputRange: [1, 0.93], extrapolate: 'clamp',
  });
  const feedTranslateY = scrollY.interpolate({
    inputRange: T.feedRise, outputRange: [0, -80], extrapolate: 'clamp',
  });
  const firstCardScale = scrollY.interpolate({
    inputRange: T.firstScale, outputRange: [0.87, 1.0], extrapolate: 'clamp',
  });
  const dividerOpacity = scrollY.interpolate({
    inputRange: T.dividerOut, outputRange: [1, 0], extrapolate: 'clamp',
  });
  const chipOpacity = scrollY.interpolate({
    inputRange: T.chipIn, outputRange: [0, 1], extrapolate: 'clamp',
  });
  const chipTranslate = scrollY.interpolate({
    inputRange: T.chipIn, outputRange: [-14, 0], extrapolate: 'clamp',
  });

  const progress = JOURNEY.day / JOURNEY.totalDays;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <View style={styles.screen}>

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 1 — transition scroll
          Normal free-scroll. Animations fade/scale the hero out and bring
          the feed cards in. Hands off to Phase 2 when scroll settles past
          T.feedMode. The ScrollView remains mounted throughout — it is reset
          to y=0 under the overlay when the user exits feed mode.
      ════════════════════════════════════════════════════════════════════ */}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEnabled={mainScrollEnabled}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        decelerationRate="normal"
      >
        <SafeAreaView edges={['top']}>

          {/* Greeting */}
          <Animated.View style={[styles.greeting, { opacity: greetingOpacity }]}>
            <View>
              <Text style={styles.greetingLabel}>GOOD MORNING</Text>
              <Text style={styles.greetingName}>Alexis</Text>
            </View>
            <View style={styles.greetingActions}>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.75}>
                <Ionicons name="search-outline" size={20} color={Colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.75}>
                <Ionicons name="notifications-outline" size={20} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Hero journey card */}
          <Animated.View style={{ opacity: heroOpacity, transform: [{ scale: heroScale }] }}>
            <TouchableOpacity style={styles.heroCard} activeOpacity={0.93}>
              <LinearGradient
                colors={['#B8621A', '#7A3A10', '#3A1A06', '#0F1230']}
                style={styles.heroGradient}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 1 }}
              >
                <View style={styles.heroInner}>
                  <View style={styles.heroTopRow}>
                    <View style={styles.activeBadge}>
                      <View style={styles.activeDot} />
                      <Text style={styles.activeBadgeText}>ACTIVE JOURNEY</Text>
                    </View>
                    <Text style={styles.heroDay}>
                      Day {JOURNEY.day} / {JOURNEY.totalDays}
                    </Text>
                  </View>
                  <View style={styles.heroMid}>
                    <Text style={styles.heroTitle}>{JOURNEY.title}</Text>
                    <Text style={styles.heroLocation}>{JOURNEY.location}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                    </View>
                  </View>
                  <View style={styles.heroBottom}>
                    <View style={styles.statsRow}>
                      {[
                        { v: JOURNEY.memories, l: 'memories' },
                        { v: JOURNEY.km,       l: 'km'       },
                        { v: JOURNEY.places,   l: 'places'   },
                      ].map((s, i) => (
                        <React.Fragment key={s.l}>
                          {i > 0 && <View style={styles.statDivider} />}
                          <View style={styles.stat}>
                            <Text style={styles.statVal}>{s.v}</Text>
                            <Text style={styles.statLbl}>{s.l}</Text>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>
                    <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.85}>
                      <Text style={styles.ctaText}>Continue story</Text>
                      <Ionicons name="arrow-forward" size={15} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Stories row */}
          <Animated.View style={{
            opacity: storiesOpacity,
            transform: [{ translateY: storiesTranslate }],
          }}>
            <View style={styles.storiesHead}>
              <Text style={styles.storiesHeadTitle}>Stories</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.storiesHeadLink}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesRow}
            >
              {STORIES.map(s => (
                <TouchableOpacity key={s.id} style={styles.storyItem} activeOpacity={0.8}>
                  {s.isOwn ? (
                    <>
                      <View style={styles.ownStoryCircle}>
                        <Ionicons name="add" size={22} color={Colors.accent} />
                      </View>
                      <Text style={styles.storyName}>Your story</Text>
                    </>
                  ) : (
                    <>
                      <View style={[styles.storyRing, !s.unseen && styles.storyRingMuted]}>
                        <View style={styles.storyInner}>
                          <Text style={styles.storyInitial}>{s.initials}</Text>
                        </View>
                      </View>
                      <Text style={styles.storyName}>{s.name}</Text>
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>

        </SafeAreaView>

        {/* Transition feed cards — visible during morph, hidden once overlay locks in */}
        <Animated.View
          style={[styles.feedSection, { transform: [{ translateY: feedTranslateY }] }]}
          onLayout={e => { feedSectionTopRef.current = e.nativeEvent.layout.y; }}
        >
          <Animated.View style={[styles.dividerRow, { opacity: dividerOpacity }]}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>FROM THE WORLD</Text>
            <View style={styles.dividerLine} />
          </Animated.View>

          {FEED.map((item, index) => {
            const isFirst = index === 0;
            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.feedCardWrapper,
                  isFirst && { transform: [{ scale: firstCardScale }] },
                ]}
                onLayout={isFirst
                  ? e => { firstCardTopRef.current = e.nativeEvent.layout.y; }
                  : undefined}
              >
                <TouchableOpacity style={styles.feedCard} activeOpacity={0.95}>
                  <FeedCardContent item={item} />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.View>
      </Animated.ScrollView>

      {/* Return chip — sits above the ScrollView but below the feed overlay */}
      <Animated.View
        pointerEvents={chipActive && !isFeedMode ? 'box-none' : 'none'}
        style={[
          styles.chipWrapper,
          {
            top: insets.top + 10,
            opacity: chipOpacity,
            transform: [{ translateY: chipTranslate }],
          },
        ]}
      >
        <TouchableOpacity style={styles.chip} onPress={returnToJourney} activeOpacity={0.88}>
          <View style={styles.chipDot} />
          <Text style={styles.chipTitle}>{JOURNEY.title}</Text>
          <Text style={styles.chipDay}>· Day {JOURNEY.day}</Text>
          <Ionicons name="chevron-up" size={13} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </Animated.View>

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 2 — paged feed overlay
          Fades in over Phase 1 when the scroll settles past T.feedMode.
          pagingEnabled locks each story to fill the full viewport.
          Swiping down on the first story (rubber-band past y=0) exits back
          to home — both scroll containers reset under the fading overlay.
      ════════════════════════════════════════════════════════════════════ */}
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: feedOverlayAnim }]}
        pointerEvents={isFeedMode ? 'auto' : 'none'}
      >
        <FlatList
          ref={flatListRef}
          data={FEED}
          keyExtractor={item => item.id}
          pagingEnabled
          bounces
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScrollEndDrag={handleFeedScrollEndDrag}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onLayout={e => {
            const h = e.nativeEvent.layout.height;
            setListHeight(h);
            listHeightRef.current = h;
          }}
          getItemLayout={(_, index) => ({
            length: listHeight,
            offset: listHeight * index,
            index,
          })}
          renderItem={({ item, index }) => {
            const isActive = isFeedMode && activeFeedIndex === index;
            if (index === 0) {
              return (
                <View style={{ height: listHeight }}>
                  <Animated.View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: overlayCardTopAnim,
                      height: overlayCardHeightAnim,
                      borderRadius: overlayCardRadiusAnim,
                      overflow: 'hidden',
                    }}
                  >
                    <FeedVideoCard item={item} isActive={isActive} />
                  </Animated.View>
                </View>
              );
            }
            return (
              <View style={{ height: listHeight }}>
                <FeedVideoCard item={item} isActive={isActive} />
              </View>
            );
          }}
        />
      </Animated.View>

    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ── Greeting ──────────────────────────────────────────────────────────────
  greeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  greetingLabel: {
    ...Typography.overline,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  greetingName: {
    ...Typography.title1,
    color: Colors.textPrimary,
  },
  greetingActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // ── Hero card ─────────────────────────────────────────────────────────────
  heroCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    height: HERO_HEIGHT,
    shadowColor: '#0F1230',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 12,
  },
  heroGradient: { flex: 1 },
  heroInner: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  activeBadgeText: {
    ...Typography.overline,
    color: 'rgba(255,255,255,0.75)',
  },
  heroDay: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.45)',
  },
  heroMid: { gap: 6 },
  heroTitle: {
    ...Typography.display,
    color: Colors.textInverse,
  },
  heroLocation: {
    ...Typography.callout,
    color: 'rgba(255,255,255,0.52)',
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginTop: Spacing.sm,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
  },
  heroBottom: { gap: Spacing.sm },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  stat: { flex: 1, alignItems: 'center' },
  statVal: {
    ...Typography.title3,
    color: Colors.textInverse,
  },
  statLbl: {
    ...Typography.caption2,
    color: 'rgba(255,255,255,0.42)',
    marginTop: 3,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignSelf: 'center',
  },
  ctaBtn: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  ctaText: {
    ...Typography.headline,
    color: Colors.primary,
  },

  // ── Stories row ───────────────────────────────────────────────────────────
  storiesHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xs,
  },
  storiesHeadTitle: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },
  storiesHeadLink: {
    ...Typography.subhead,
    color: Colors.accent,
    fontWeight: '600',
  },
  storiesRow: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  storyItem: {
    alignItems: 'center',
    gap: 5,
    width: 56,
  },
  ownStoryCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 2.5,
    backgroundColor: Colors.accent,
  },
  storyRingMuted: {
    backgroundColor: Colors.border,
  },
  storyInner: {
    flex: 1,
    borderRadius: 23,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  storyInitial: {
    ...Typography.subhead,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  storyName: {
    ...Typography.caption2,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // ── Transition feed section ────────────────────────────────────────────────
  feedSection: {
    paddingBottom: 140,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerLabel: {
    ...Typography.overline,
    color: Colors.textTertiary,
  },
  feedCardWrapper: {
    marginBottom: Spacing.sm,
  },
  feedCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: FEED_CARD_H,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 10,
  },

  // ── Shared feed card content (transition + paged FlatList) ────────────────
  feedGradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  feedTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  feedAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedAvatarInitial: {
    ...Typography.subhead,
    color: Colors.primary,
    fontWeight: '700',
  },
  feedAuthorName: {
    ...Typography.headline,
    color: Colors.textInverse,
  },
  feedTimeAgo: {
    ...Typography.caption2,
    color: 'rgba(255,255,255,0.42)',
    marginTop: 1,
  },
  feedBottom: { gap: Spacing.sm },
  feedCardTitle: {
    ...Typography.title1,
    color: Colors.textInverse,
  },
  feedCardDesc: {
    ...Typography.callout,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 22,
  },
  feedMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  feedLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feedLoc: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.42)',
  },
  feedSavesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  feedSaves: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.55)',
  },

  // ── Return chip ───────────────────────────────────────────────────────────
  chipWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  chipTitle: {
    ...Typography.subhead,
    color: Colors.textInverse,
    fontWeight: '700',
  },
  chipDay: {
    ...Typography.subhead,
    color: 'rgba(255,255,255,0.5)',
  },

  // ── Feed video card ───────────────────────────────────────────────────────
  feedVideoCard: {
    flex: 1,
  },
  videoOverlay: {
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  videoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
});
