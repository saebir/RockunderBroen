import React, { useState } from 'react'; // ← TILFØJET useState
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import sharedStyles from '../../styles/sharedStyles';
import { supabase } from '../../lib/supabase';

export default function BarScreen({ navigation }) {
  const [showCategories, setShowCategories] = useState(false); // ← TILFØJET

  const handleCategoryPress = (category) => { // ← TILFØJET
    setShowCategories(false);
    switch (category) {
      case 'Mad':
        navigation.navigate('Mad');
        break;
      case 'Bar':
        navigation.navigate('Bar');
        break;
      case 'Scener':
        navigation.navigate('Scener');
        break;
      case 'Merch':
        navigation.navigate('Merch');
        break;
      case 'Toiletter':
        navigation.navigate('Toiletter');
        break;
      default:
        console.log('Ukendt kategori:', category);
    }
  };

  const handlePress = (label) => {
    if (label === 'Program') {
      navigation.navigate('Program');
    } else if (label === 'Kort') {
      navigation.navigate('Map'); // 👈 Navigér til MapScreen
    } else {
      Alert.alert(`Du trykkede på: ${label}`);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const menuItems = ['Bar Øst', 'Bar Vest', 'Menu', 'Vis vej '];


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6f0' }}>
      {/* Header-linje med "Tilbage" + Kategori-knap ← OPDATERET */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Text style={sharedStyles.mapBackText}>← Tilbage</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setShowCategories(!showCategories)}
      >
        <View style={styles.smallBtn}>
          <Text style={sharedStyles.btnText}>Kategorier</Text>
        </View>
      </TouchableOpacity>

      {/* Dropdown-menu ← TILFØJET */}
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

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bar!</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <View key={item}>
              <TouchableOpacity onPress={() => handlePress(item)}>
                <Text style={styles.menuItem}>{item}</Text>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </ScrollView>

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
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 140, // plads til dropdown
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e67000',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#1D2A32',
    textAlign: 'center',
    marginBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 20,
    elevation: 5,
    backgroundColor: '#fdf6f0',
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
  menuContainer: {
    width: '80%',
  },
  menuItem: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D2A32',
    textAlign: 'center',
    paddingVertical: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 4,
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
