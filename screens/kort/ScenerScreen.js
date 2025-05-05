import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import sharedStyles from '../../styles/sharedStyles';
import { supabase } from '../../lib/supabase';

export default function ScenerScreen({ navigation }) {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedDate, setSelectedDate] = useState('13');

  const scenes = {
    '13': [
      { time: '15:00', act: 'Scene 1 - Rockband A' },
      { time: '17:00', act: 'Scene 1 - DJ Crazy Beats' },
    ],
    '14': [
      { time: '13:00', act: 'Scene 2 - Jazz & Chill' },
      { time: '20:00', act: 'Scene 2 - Metal Storm' },
    ],
  };

  const handleCategoryPress = (category) => {
    setShowCategories(false);
    switch (category) {
      case 'Mad': navigation.navigate('Mad'); break;
      case 'Bar': navigation.navigate('Bar'); break;
      case 'Scener': navigation.navigate('Scener'); break;
      case 'Merch': navigation.navigate('Merch'); break;
      case 'Toiletter': navigation.navigate('Toiletter'); break;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6f0' }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Text style={sharedStyles.mapBackText}>← Tilbage</Text>
        </TouchableOpacity>
      </View>

      {/* Kategori-knap */}
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setShowCategories(!showCategories)}
      >
        <View style={styles.smallBtn}>
          <Text style={sharedStyles.btnText}>Kategorier</Text>
        </View>
      </TouchableOpacity>

      {/* Dropdown */}
      {showCategories && (
        <View style={styles.overlay}>
          {['Mad', 'Bar', 'Scener', 'Merch', 'Toiletter'].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(item)}
            >
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Se på kort-knap */}
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => navigation.navigate('Map')}
      >
        <Text style={styles.mapButtonText}>Se scener på kort</Text>
      </TouchableOpacity>

      {/* Dato-navigation (tabs) */}
      <View style={styles.tabContainer}>
        {['13', '14'].map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDate(day)}
            style={[
              styles.tabButton,
              selectedDate === day && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedDate === day && styles.activeTabText,
              ]}
            >
              {day}. juni
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ScrollView med sceneprogram */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {scenes[selectedDate].map((item, index) => (
          <View key={index} style={styles.programItem}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.act}>{item.act}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {['Praktisk info', 'Hjemmeside', 'Kontakt os', 'Log ud'].map(
          (label, index, arr) => (
            <View key={label} style={styles.footerItemWrapper}>
              <TouchableOpacity
                onPress={() =>
                  label === 'Log ud'
                    ? handleLogout()
                    : Alert.alert(label)
                }
              >
                <Text
                  style={[
                    styles.footerItem,
                    label === 'Log ud' && { color: '#e67000' },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
              {index < arr.length - 1 && (
                <Text style={styles.footerDivider}>|</Text>
              )}
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 20,
  },
  categoryButton: {
    position: 'absolute',
    top: 110,
    left: '50%',
    transform: [{ translateX: -75 }],
    zIndex: 10,
  },
  smallBtn: {
    backgroundColor: '#e67000',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e67000',
  },
  overlay: {
    position: 'absolute',
    top: 160,
    left: 24,
    right: 24,
    backgroundColor: 'rgba(230, 112, 0, 0.95)',
    paddingVertical: 20,
    borderRadius: 16,
    zIndex: 30,
  },
  categoryItem: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  mapButton: {
    alignSelf: 'center',
    marginTop: 190,
  },
  mapButtonText: {
    fontSize: 16,
    color: '#e67000',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeTab: {
    backgroundColor: '#e67000',
  },
  tabText: {
    fontSize: 16,
    color: '#1D2A32',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  programItem: {
    marginBottom: 16,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D2A32',
  },
  act: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  footerItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  footerItem: {
    fontSize: 14,
    color: '#8a5c00',
    fontWeight: '500',
  },
  footerDivider: {
    marginHorizontal: 4,
    color: '#8a5c00',
    fontSize: 14,
  },
});
