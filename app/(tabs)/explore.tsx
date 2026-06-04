import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants';

const { width, height } = Dimensions.get('window');

const MOCK_STORIES = [
  {
    id: '1',
    title: 'Tokyo at Night',
    author: 'Sarah M.',
    location: 'Japan',
    days: 7,
    description: 'Neon lights, ramen at midnight, temples at dawn. Tokyo never sleeps — and neither did I.',
    category: 'City',
    gradient: ['#1C1472', '#0E0A40', '#060320'] as const,
    accentColor: '#7B6FE8',
  },
  {
    id: '2',
    title: 'Hidden Rome',
    author: 'Marc D.',
    location: 'Italy',
    days: 5,
    description: 'Beyond the Colosseum lies a city of secret courtyards, local trattorias, and ancient fountains.',
    category: 'History',
    gradient: ['#8B3A1A', '#4A1D0C', '#200D05'] as const,
    accentColor: '#E7A77A',
  },
  {
    id: '3',
    title: 'Morocco Desert Route',
    author: 'Léa P.',
    location: 'Morocco',
    days: 10,
    description: 'From Marrakesh medinas to Saharan dunes — an unforgettable journey through ancient trade routes.',
    category: 'Adventure',
    gradient: ['#7A4010', '#4A2508', '#1E0F03'] as const,
    accentColor: '#F5A623',
  },
  {
    id: '4',
    title: 'Vanlife Iceland',
    author: 'Thomas K.',
    location: 'Iceland',
    days: 14,
    description: 'Ring Road in a van. Waterfalls, hot springs, and the Northern Lights as a bedroom ceiling.',
    category: 'Road Trip',
    gradient: ['#0D3557', '#072440', '#03101E'] as const,
    accentColor: '#5BB5D5',
  },
];

const CATEGORIES = ['All', 'City', 'History', 'Adventure', 'Road Trip', 'Nature'];

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered = selectedCategory === 'All'
    ? MOCK_STORIES
    : MOCK_STORIES.filter(s => s.category === selectedCategory);

  const story = filtered[currentIndex % filtered.length];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={story.gradient}
        style={styles.fullScreen}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      >
        {/* Subtle noise/depth overlay */}
        <View style={styles.depthOverlay} />

        {/* Top UI */}
        <SafeAreaView style={styles.topSection} edges={['top']}>
          {/* Search */}
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={16} color="rgba(255,255,255,0.5)" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search stories, places..."
              placeholderTextColor="rgba(255,255,255,0.4)"
            />
          </View>

          {/* Categories */}
          <FlatList
            horizontal
            data={CATEGORIES}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => { setSelectedCategory(item); setCurrentIndex(0); }}
                style={[styles.categoryPill, item === selectedCategory && styles.categoryPillActive]}
                activeOpacity={0.75}
              >
                <Text style={[styles.categoryText, item === selectedCategory && styles.categoryTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>

        {/* Story content — bottom */}
        <View style={styles.storyContent}>
          {/* Category + meta */}
          <View style={styles.metaRow}>
            <View style={[styles.categoryBadge, { backgroundColor: story.accentColor + '28', borderColor: story.accentColor + '50' }]}>
              <Text style={[styles.categoryBadgeText, { color: story.accentColor }]}>
                {story.category.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.metaDivider}>·</Text>
            <Text style={styles.metaText}>{story.location} · {story.days} days</Text>
          </View>

          {/* Title */}
          <Text style={styles.storyTitle}>{story.title}</Text>

          {/* Description */}
          <Text style={styles.storyDescription}>{story.description}</Text>

          {/* Author */}
          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorInitial}>{story.author[0]}</Text>
            </View>
            <View>
              <Text style={styles.authorName}>{story.author}</Text>
              <Text style={styles.authorRole}>Traveler</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryAction} activeOpacity={0.88}>
              <Text style={styles.primaryActionText}>Open story</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextAction}
              onPress={() => setCurrentIndex(i => i + 1)}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-forward" size={20} color={Colors.textInverse} />
            </TouchableOpacity>
          </View>

          {/* Pagination */}
          <View style={styles.pagination}>
            {filtered.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setCurrentIndex(i)}>
                <View style={[styles.dot, i === currentIndex % filtered.length && styles.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  depthOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  topSection: {
    paddingBottom: Spacing.md,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    gap: Spacing.sm,
  },
  searchIcon: {},
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.textInverse,
  },
  categoriesList: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  categoryPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  categoryPillActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  categoryText: {
    ...Typography.subhead,
    color: 'rgba(255,255,255,0.7)',
  },
  categoryTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },

  // Story content
  storyContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.lg,
    paddingBottom: 44,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  categoryBadgeText: {
    ...Typography.overline,
  },
  metaDivider: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.3)',
  },
  metaText: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.45)',
  },
  storyTitle: {
    ...Typography.title1,
    color: Colors.textInverse,
    marginBottom: Spacing.md,
  },
  storyDescription: {
    ...Typography.callout,
    color: 'rgba(255,255,255,0.62)',
    lineHeight: 23,
    marginBottom: Spacing.xl,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorInitial: {
    ...Typography.subhead,
    color: Colors.primary,
    fontWeight: '700',
  },
  authorName: {
    ...Typography.headline,
    color: Colors.textInverse,
  },
  authorRole: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: Colors.textInverse,
    borderRadius: BorderRadius.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryActionText: {
    ...Typography.headline,
    color: Colors.primary,
  },
  nextAction: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  dotActive: {
    width: 20,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.textInverse,
  },
});
