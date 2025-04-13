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

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (email.trim() === '') {
      alert('Indtast din email for at nulstille adgangskode');
      return;
    }
  
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  
    if (error) {
      console.log('Fejl:', error);
      alert(`Noget gik galt: ${error.message}`);
    } else {
      alert('Email sendt! Tjek din indbakke for at nulstille adgangskoden.');
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6f0' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={sharedStyles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={sharedStyles.title}>Glemt adgangskode</Text>

          <Text style={sharedStyles.subtitle}>
            Indtast din email, så sender vi et link til at nulstille din adgangskode.
          </Text>

          <View style={sharedStyles.input}>
            <Text style={sharedStyles.inputLabel}>Email:</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={sharedStyles.inputControl}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity onPress={handleResetPassword}>
            <View style={sharedStyles.btn}>
              <Text style={sharedStyles.btnText}>Send nulstillingslink</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={sharedStyles.link}>Tilbage til login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


