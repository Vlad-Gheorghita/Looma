import { Button } from "@components";
import { globalStyling } from "@styling";
import React from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { useAuth } from "state/AuthContext";
import SettingsIcon from "@icons/settings-icon.svg";
import Constants from 'expo-constants';

const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();

  const settingsOptions = [
    {
      id: 'profile',
      title: 'Profile',
      subtitle: 'Manage your personal information',
      icon: '👤',
      onPress: () => console.log('Profile pressed')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Configure your notification preferences',
      icon: '🔔',
      onPress: () => console.log('Notifications pressed')
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Control your privacy settings',
      icon: '🔒',
      onPress: () => console.log('Privacy pressed')
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: '❓',
      onPress: () => console.log('Help pressed')
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'App version and information',
      icon: 'ℹ️',
      onPress: () => console.log('About pressed')
    }
  ];

  return (
    <View style={[globalStyling.pageStyle, styles.container]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerIconContainer}>
            <SettingsIcon width={40} height={40} />
          </View>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your experience</Text>
        </View>

        {/* Settings Options */}
        <View style={styles.optionsContainer}>
          {settingsOptions.map((option) => (
            <Pressable
              key={option.id}
              style={[
                styles.optionItem,
                styles.optionItemDisabled
              ]}
              disabled={true}
            >
              <View style={styles.optionContent}>
                <View style={[styles.optionIcon, styles.optionIconDisabled]}>
                  <Text style={[styles.optionIconText, styles.optionIconTextDisabled]}>{option.icon}</Text>
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionTitle, styles.optionTitleDisabled]}>{option.title}</Text>
                  <Text style={[styles.optionSubtitle, styles.optionSubtitleDisabled]}>{option.subtitle}</Text>
                </View>
                <View style={styles.optionArrow}>
                  <Text style={[styles.optionArrowText, styles.optionArrowTextDisabled]}>›</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <Button 
            title="Log Out" 
            onPress={logout}
            styling={{
              button: styles.logoutButton,
              title: styles.logoutButtonText
            }}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Looma v{Constants.expoConfig?.version || '1.0.0'}</Text>
          <Text style={styles.footerText}>Made with ❤️</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 40,
  },
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#4D96FF',
  },
  
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  
  // Options Section
  optionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  
  optionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  
  optionItemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  
  optionItemDisabled: {
    opacity: 0.5,
  },
  
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  optionIconText: {
    fontSize: 24,
  },
  
  optionIconDisabled: {
    backgroundColor: '#f9fafb',
  },
  
  optionIconTextDisabled: {
    opacity: 0.6,
  },
  
  optionTextContainer: {
    flex: 1,
  },
  
  optionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  
  optionTitleDisabled: {
    color: '#9ca3af',
  },
  
  optionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  
  optionSubtitleDisabled: {
    color: '#d1d5db',
  },
  
  optionArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  optionArrowText: {
    fontSize: 20,
    color: '#9ca3af',
    fontWeight: '300',
  },
  
  optionArrowTextDisabled: {
    color: '#e5e7eb',
  },
  
  // Logout Section
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  
  logoutButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
  },
  
  // Footer
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 4,
  },
  
  pageStyle: {
    alignItems: "stretch",
  },
});

export default SettingsScreen;
