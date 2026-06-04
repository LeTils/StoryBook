import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !username) return;
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) Alert.alert('Sign up failed', error.message);
    else Alert.alert('Check your email', 'We sent you a confirmation link.');
    setLoading(false);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#F8F7F5', '#EDEBE6', '#E3E0D9']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <LinearGradient
        colors={['rgba(231,167,122,0.18)', 'rgba(231,167,122,0)']}
        style={styles.decorBlob}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Wordmark */}
            <View style={styles.wordmarkSection}>
              <Text style={styles.wordmark}>storybook</Text>
              <View style={styles.wordmarkAccent} />
              <Text style={styles.tagline}>Your journey begins here.</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>USERNAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="traveler_name"
                  placeholderTextColor={Colors.textTertiary}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoComplete="username-new"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>EMAIL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={Colors.textTertiary}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textTertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoComplete="password-new"
                />
              </View>

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.87}
              >
                <LinearGradient
                  colors={['#1E2456', '#0F1230']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.textInverse} />
                  ) : (
                    <Text style={styles.buttonText}>Create account</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already travelling? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Sign in →</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  decorBlob: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
  },

  // Wordmark
  wordmarkSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  wordmark: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -2,
    marginBottom: Spacing.sm,
  },
  wordmarkAccent: {
    width: 32,
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
  },
  tagline: {
    ...Typography.callout,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },

  // Form
  form: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    ...Typography.overline,
    color: Colors.textSecondary,
  },
  input: {
    ...Typography.body,
    color: Colors.textPrimary,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 15,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  button: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginTop: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonGradient: {
    paddingVertical: 17,
    alignItems: 'center',
  },
  buttonText: {
    ...Typography.headline,
    color: Colors.textInverse,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    ...Typography.subhead,
    color: Colors.textSecondary,
  },
  footerLink: {
    ...Typography.subhead,
    color: Colors.accent,
    fontWeight: '700',
  },
});
