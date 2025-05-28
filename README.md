# Rock under Broen App

Dette er en mobilapp lavet i React Native med Expo, som er udviklet til "Rock under Broen"-festivalen. Appen indeholder funktioner som login, opret konto, glem adgangskode og mulighed for at se programmet. Designet er simpelt, responsivt og ensartet på tværs af alle skærme.

## Teknologier brugt

- React Native
- Expo
- Supabase (til autentificering)
- React Navigation
- JavaScript
- Visual Studio Code

## Funktioner

- Login med email og adgangskode
- Mulighed for at oprette konto og nulstille adgangskode
- Supabase backend til authentication
- Navigation mellem skærme med React Navigation
- Password kan vises/skjules
- Deep linking understøttet (til brug med Supabase reset-link)
- Programvisning for festivalen med skift mellem datoer

## Sådan kører du projektet på din egen computer

### 1. Installer Node.js

Download og installer Node.js fra https://nodejs.org(Node.js indeholder også npm, som vi skal bruge)

### 2. Installer Expo CLI (kun første gang)

bash
npm install -g expo-cli


### 3. Klon projektet fra GitHub

bash
git clone https://github.com/saebir/RockunderBroen.git
cd RockunderBroen


### 4. Installer projektets afhængigheder

bash
npm install

- @react-navigation/native: ^7.1.6
- @react-navigation/native-stack: ^7.3.10
- @supabase/supabase-js: ^2.49.4
- expo: ~52.0.43
- expo-linking: ~7.0.5
- expo-status-bar: ~2.0.1
- react: 18.3.1
- react-native: 0.76.9
- react-native-gesture-handler: ~2.20.2
- react-native-reanimated: ~3.16.1
- react-native-safe-area-context: 4.12.0
- react-native-screens: ~4.4.0
- react-native-vector-icons: ^10.2.0
- react-native-svg: 15.8.0
- npx expo install react-native-maps


De kan også ses nederst i README filen.

### 5. Start appen med Expo

bash
npx expo start


Når Metro bundler åbner, kan du vælge at:

- Scanne QR-koden med din mobil
- Eller starte appen i en Android/iOS-simulator (hvis opsat)

## Kommandoer brugt under opsætning

- npx create-expo-app@latest RockunderBroen --template blank
- cd RockunderBroen

### Navigation:
- npx expo install @react-navigation/native
- npx expo install react-native-screens react-native-safe-area-context
- npx expo install react-native-gesture-handler
- npx expo install react-native-reanimated
- npx expo install react-native-vector-icons
- npx expo install @react-navigation/native-stack

### Deep link (bruges til reset-password via email link)
- npx expo install expo-linking

### Supabase:
- npm install @supabase/supabase-js

### Ikoner:
- npx expo install react-native-svg

Appen er stadig under udvikling og kan udvides med flere funktioner som backstage-adgang, kort og nyheder. Designet er baseret på orange og sort farvetema som matcher festivalens stil.
