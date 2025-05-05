import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { supabase } from '../../lib/supabase';
import sharedStyles from '../../styles/sharedStyles';

export default function LoginScreen({ navigation }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = async () => {
        if (form.email.trim() === '' || form.password.trim() === '') {
            alert("Indtast både email og adgangskode");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        });

        if (error) {
            alert(`Login mislykkedes: ${error.message}`);
        } else {
            navigation.navigate('Home');
        }
    };

    return (
        <SafeAreaView style={sharedStyles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={60}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        padding: 20,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <View style={sharedStyles.header}>
                            <Image
                                alt="App Logo"
                                resizeMode="contain"
                                style={sharedStyles.headerImg}
                                source={{ uri: 'https://dronenetvaerk.dk/content/uploads/2021/02/rock-under-broen.png' }}
                            />

                            <Text style={sharedStyles.title}>
                                Rock under Broen
                            </Text>

                            <Text style={sharedStyles.subtitle}>
                                Login for at få en bedre oplevelse!
                            </Text>
                        </View>

                        <View style={sharedStyles.form}>
                            <View style={sharedStyles.input}>
                                <Text style={sharedStyles.inputLabel}>Email:</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    keyboardType="email-address"
                                    onChangeText={email => setForm({ ...form, email })}
                                    placeholder="john@example.com"
                                    placeholderTextColor="#6b7280"
                                    style={sharedStyles.inputControl}
                                    value={form.email}
                                />
                            </View>

                            <View style={sharedStyles.input}>
                                <Text style={sharedStyles.inputLabel}>Adgangskode:</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    onChangeText={password => setForm({ ...form, password })}
                                    placeholder="********"
                                    placeholderTextColor="#6b7280"
                                    style={sharedStyles.inputControl}
                                    secureTextEntry={hidePassword}
                                    value={form.password}
                                />
                                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                    <Text style={sharedStyles.toggleText}>
                                        {hidePassword ? 'Vis adgangskode' : 'Skjul adgangskode'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={sharedStyles.formAction}>
                                <TouchableOpacity onPress={handleLogin}>
                                    <View style={sharedStyles.btn}>
                                        <Text style={sharedStyles.btnText}>Login</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={sharedStyles.formLink}>Glemt kodeord?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[sharedStyles.footer, { marginTop: 20 }]}>
                        {[
                            { label: 'Opret konto', onPress: () => navigation.navigate('Signup') },
                            {
                                label: 'Fortsæt uden login',
                                onPress: () =>
                                    Alert.alert(
                                        'Fortsæt uden login?',
                                        'Hvis du fortsætter uden at logge ind, kan du ikke spille festivalspillene eller optjene point.',
                                        [
                                            { text: 'Tilbage', style: 'cancel' },
                                            { text: 'OK', onPress: () => navigation.navigate('Home') },
                                        ]
                                    )
                            },
                        ].map((item, index, arr) => (
                            <View key={item.label} style={sharedStyles.footerItemWrapper}>
                                <TouchableOpacity onPress={item.onPress}>
                                    <Text style={sharedStyles.footerItem}>{item.label}</Text>
                                </TouchableOpacity>
                                {index < arr.length - 1 && (
                                    <Text style={sharedStyles.footerDivider}>|</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
