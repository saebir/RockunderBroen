import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import sharedStyles from '../../styles/sharedStyles';
import { supabase } from '../../lib/supabase';

export default function MapScreen({ navigation }) {
    const [showCategories, setShowCategories] = useState(false);

    const handleCategoryPress = (category) => {
        console.log('Valgt kategori:', category);
        setShowCategories(false); // Luk overlay

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
                navigation.navigate('Toiletter')
                break;
            default:
                console.log('Ukendt kategori:', category);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <SafeAreaView style={sharedStyles.safeArea}>
            {/* Header-linje med "Tilbage" */}
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => {
                    console.log('Trykket på Tilbage');
                    navigation.navigate('Home');
                }}>
                    <Text style={sharedStyles.mapBackText}>← Tilbage</Text>
                </TouchableOpacity>
            </View>

            {/* Kategorier-knap */}
            <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => setShowCategories(!showCategories)}
            >
                <View style={styles.smallBtn}>
                    <Text style={sharedStyles.btnText}>Kategorier</Text>
                </View>
            </TouchableOpacity>

            {/* Kort og markører */}
            <View style={sharedStyles.mapContainer}>
                <Image
                    source={require('../../assets/KortFarve.png')}
                    style={sharedStyles.mapImage}
                    resizeMode="contain"
                />

                <TouchableOpacity
                    style={[sharedStyles.mapMarker, { top: 155, left: 40 }]}
                    onPress={() => alert('Toilet')}
                >
                    <View style={sharedStyles.mapMarkerDot} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[sharedStyles.mapMarker, { top: 343, left: 40 }]}
                    onPress={() => alert('Toilet')}
                >
                    <View style={sharedStyles.mapMarkerDot} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[sharedStyles.mapMarker, { top: 420, left: 330 }]}
                    onPress={() => alert('Toilet')}
                >
                    <View style={sharedStyles.mapMarkerDot} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[sharedStyles.mapMarker, { top: 205, left: 305 }]}
                    onPress={() => alert('Toilet')}
                >
                    <View style={sharedStyles.mapMarkerDot} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[sharedStyles.mapMarker, { top: 326, left: 163 }]}
                    onPress={() => alert('Bar 1')}
                >
                    <View style={[sharedStyles.mapMarkerDot, { backgroundColor: 'red' }]} />
                </TouchableOpacity>
            </View>

            {/* Overlay med kategorier */}
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
