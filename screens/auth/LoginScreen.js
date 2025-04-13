import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
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
                    contentContainerStyle={sharedStyles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={sharedStyles.header}>
                        <Image
                            alt="App Logo"
                            resizeMode="contain"
                            style={sharedStyles.headerImg}
                            source={{ uri: 'https://dronenetvaerk.dk/content/uploads/2021/02/rock-under-broen.png' }}
                        />

                        <Text style={sharedStyles.title}>
                            Rock under Broen <Text style={{ color: '#075eec' }}></Text>
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

                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={sharedStyles.formFooter}>
                            Ingen konto?{' '}
                            <Text style={{ textDecorationLine: 'underline' }}>Opret en nu!</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
