import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import sharedStyles from '../../styles/sharedStyles';

export default function ResetPasswordScreen({ navigation }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirm, setHideConfirm] = useState(true);

    const handleReset = async () => {
        if (password.length < 6) {
            alert('Adgangskoden skal være mindst 6 tegn');
            return;
        }

        if (password !== confirmPassword) {
            alert('Adgangskoderne matcher ikke');
            return;
        }

        const { data, error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            console.log('Fejl ved opdatering:', error);
            alert(`Noget gik galt: ${error.message}`);
        } else {
            alert('Adgangskoden er opdateret!');
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
                    <Text style={sharedStyles.title}>Nulstil adgangskode</Text>
                    <Text style={sharedStyles.subtitle}>Indtast din nye adgangskode herunder</Text>

                    <View style={sharedStyles.input}>
                        <Text style={sharedStyles.inputLabel}>Ny adgangskode</Text>
                        <TextInput
                            secureTextEntry={hidePassword}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            style={sharedStyles.inputControl}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                            <Text style={sharedStyles.toggleText}>
                                {hidePassword ? 'Vis adgangskode' : 'Skjul adgangskode'}
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
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setHideConfirm(!hideConfirm)}>
                            <Text style={sharedStyles.toggleText}>
                                {hideConfirm ? 'Vis adgangskode' : 'Skjul adgangskode'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleReset} style={sharedStyles.btn}>
                        <Text style={sharedStyles.btnText}>Gem ny adgangskode</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={sharedStyles.link}>Tilbage til login</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

