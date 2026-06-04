import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants';

const JOURNEY_SUGGESTIONS = [
  'Italy 2027',
  'Japan Cherry Blossom',
  'New York Weekend',
  'Roadtrip Canada',
  'Morocco Desert Route',
];

const PRIVACY_OPTIONS = [
  {
    key: 'private' as const,
    label: 'Private',
    desc: 'Only you can see this journey',
    icon: 'lock-closed-outline' as const,
  },
  {
    key: 'followers' as const,
    label: 'Followers',
    desc: 'People who follow you',
    icon: 'people-outline' as const,
  },
  {
    key: 'public' as const,
    label: 'Public',
    desc: 'Anyone on Storybook',
    icon: 'globe-outline' as const,
  },
];

const COLLECT_ITEMS = [
  { icon: 'images-outline' as const, label: 'Photos & videos' },
  { icon: 'navigate-outline' as const, label: 'GPS route' },
  { icon: 'location-outline' as const, label: 'Places visited' },
  { icon: 'sunny-outline' as const, label: 'Daily highlights' },
];

export default function CreateScreen() {
  const [journeyName, setJourneyName] = useState('');
  const [privacy, setPrivacy] = useState<'private' | 'followers' | 'public'>('private');

  const handleCreate = () => {
    if (!journeyName.trim()) {
      Alert.alert('Name your adventure', 'Give this journey a title before starting.');
      return;
    }
    Alert.alert('Journey started!', `"${journeyName}" begins now. Go make memories.`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New adventure</Text>
          <Text style={styles.headerSubtitle}>
            Every great story starts with a destination.
          </Text>
        </View>

        {/* Journey name */}
        <View style={styles.nameSection}>
          <Text style={styles.sectionLabel}>NAME YOUR JOURNEY</Text>
          <TextInput
            style={[styles.nameInput, journeyName.length > 0 && styles.nameInputActive]}
            placeholder="e.g. Italy 2027..."
            placeholderTextColor={Colors.textTertiary}
            value={journeyName}
            onChangeText={setJourneyName}
            autoFocus
            returnKeyType="next"
            maxLength={40}
            selectionColor={Colors.accent}
          />
          <View style={[styles.inputLine, journeyName.length > 0 && styles.inputLineActive]} />
          <Text style={styles.charCount}>{journeyName.length}/40</Text>
        </View>

        {/* Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>QUICK START</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsScroll}
          >
            {JOURNEY_SUGGESTIONS.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.suggestionChip, journeyName === s && styles.suggestionChipActive]}
                onPress={() => setJourneyName(s)}
                activeOpacity={0.75}
              >
                <Text style={[styles.suggestionText, journeyName === s && styles.suggestionTextActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WHO CAN SEE THIS?</Text>
          <View style={styles.privacyList}>
            {PRIVACY_OPTIONS.map((option) => {
              const isActive = privacy === option.key;
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[styles.privacyCard, isActive && styles.privacyCardActive]}
                  onPress={() => setPrivacy(option.key)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.privacyIconBox, isActive && styles.privacyIconBoxActive]}>
                    <Ionicons
                      name={option.icon}
                      size={18}
                      color={isActive ? Colors.textInverse : Colors.textSecondary}
                    />
                  </View>
                  <View style={styles.privacyBody}>
                    <Text style={[styles.privacyLabel, isActive && styles.privacyLabelActive]}>
                      {option.label}
                    </Text>
                    <Text style={styles.privacyDesc}>{option.desc}</Text>
                  </View>
                  <View style={[styles.radioOuter, isActive && styles.radioOuterActive]}>
                    {isActive && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* What storybook collects */}
        <View style={styles.section}>
          <View style={styles.collectCard}>
            <Text style={styles.collectTitle}>Storybook will capture</Text>
            <View style={styles.collectGrid}>
              {COLLECT_ITEMS.map((item) => (
                <View key={item.label} style={styles.collectItem}>
                  <View style={styles.collectIconBox}>
                    <Ionicons name={item.icon} size={18} color={Colors.accent} />
                  </View>
                  <Text style={styles.collectLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={[styles.ctaButton, !journeyName.trim() && styles.ctaButtonDisabled]}
            onPress={handleCreate}
            activeOpacity={0.87}
          >
            <LinearGradient
              colors={['#1E2456', '#0F1230']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.ctaText}>Start journey</Text>
              <Ionicons name="arrow-forward" size={18} color={Colors.textInverse} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingBottom: Spacing.xxxl,
  },

  // Header
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  headerTitle: {
    ...Typography.title1,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  // Name section
  nameSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  sectionLabel: {
    ...Typography.overline,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  nameInput: {
    ...Typography.title2,
    color: Colors.textPrimary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: 0,
  },
  nameInputActive: {
    color: Colors.textPrimary,
  },
  inputLine: {
    height: 2,
    backgroundColor: Colors.border,
    borderRadius: 1,
    marginTop: 2,
  },
  inputLineActive: {
    backgroundColor: Colors.accent,
  },
  charCount: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    textAlign: 'right',
    marginTop: Spacing.sm,
  },

  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
  },

  // Suggestions
  suggestionsScroll: {
    gap: Spacing.sm,
    paddingRight: Spacing.lg,
  },
  suggestionChip: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  suggestionChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  suggestionText: {
    ...Typography.subhead,
    color: Colors.textSecondary,
  },
  suggestionTextActive: {
    color: Colors.textInverse,
    fontWeight: '600',
  },

  // Privacy
  privacyList: {
    gap: Spacing.sm,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  privacyCardActive: {
    borderColor: Colors.primary,
  },
  privacyIconBox: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyIconBoxActive: {
    backgroundColor: Colors.primary,
  },
  privacyBody: {
    flex: 1,
  },
  privacyLabel: {
    ...Typography.headline,
    color: Colors.textSecondary,
  },
  privacyLabelActive: {
    color: Colors.textPrimary,
  },
  privacyDesc: {
    ...Typography.caption1,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },

  // Collect card
  collectCard: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  collectTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  collectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  collectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    width: '44%',
  },
  collectIconBox: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  collectLabel: {
    ...Typography.subhead,
    color: Colors.textSecondary,
    flex: 1,
  },

  // CTA
  ctaSection: {
    paddingHorizontal: Spacing.lg,
  },
  ctaButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaButtonDisabled: {
    opacity: 0.45,
  },
  ctaGradient: {
    paddingVertical: 18,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  ctaText: {
    ...Typography.headline,
    color: Colors.textInverse,
  },
});
