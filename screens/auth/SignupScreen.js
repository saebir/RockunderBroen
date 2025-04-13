import React, { useState } from "react";
import { supabase } from '../../lib/supabase';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import sharedStyles from '../../styles/sharedStyles';

export default function SignupScreen({ navigation }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirm, setHideConfirm] = useState(true);

    const handleSignup = async () => {
        if (form.email.trim() === '') {
            alert("Indtast venligst din email");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("Adgangskoderne matcher ikke");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
        });

        if (error) {
            console.log('Signup error:', error);
            alert(`Noget gik galt: ${error.message}`);
        } else {
            alert("Tjek din e-mail og bekræft din konto!");
            navigation.navigate('Login');
        }

    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6f0' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={60}
            >
                <ScrollView contentContainerStyle={sharedStyles.container} keyboardShouldPersistTaps="handled">
                    <Text style={sharedStyles.title}>Opret Konto</Text>

                    <View style={sharedStyles.input}>
                        <Text style={sharedStyles.inputLabel}>Email</Text>
                        <TextInput
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="john@example.com"
                            placeholderTextColor="#6b7280"
                            style={sharedStyles.inputControl}
                            value={form.email}
                            onChangeText={email => setForm({ ...form, email })}
                        />
                    </View>

                    <View style={sharedStyles.input}>
                        <Text style={sharedStyles.inputLabel}>Adgangskode</Text>
                        <TextInput
                            secureTextEntry={hidePassword}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            style={sharedStyles.inputControl}
                            value={form.password}
                            onChangeText={password => setForm({ ...form, password })}
                        />
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                            <Text style={sharedStyles.toggleText}>
                                {hidePassword ? "Vis adgangskode" : "Skjul adgangskode"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={sharedStyles.input}>
                        <Text style={sharedStyles.inputLabel}>Bekræft adgangskode</Text>
                        <TextInput
                            secureTextEntry={hideConfirm}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            style={sharedStyles.inputControl}
                            value={form.confirmPassword}
                            onChangeText={confirm => setForm({ ...form, confirmPassword: confirm })}
                        />
                        <TouchableOpacity onPress={() => setHideConfirm(!hideConfirm)}>
                            <Text style={sharedStyles.toggleText}>
                                {hideConfirm ? "Vis adgangskode" : "Skjul adgangskode"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleSignup} style={sharedStyles.btn}>
                        <Text style={sharedStyles.btnText}>Opret konto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={sharedStyles.footerText}>
                            Har du allerede en konto? <Text style={{ textDecorationLine: 'underline' }}>Log ind</Text>
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

