# Rock under Broen App

Dette er en mobilapp lavet i React Native med Expo, som er udviklet til "Rock under Broen"-festivalen. Appen indeholder funktioner som login, opret konto, glem adgangskode og mulighed for at se programmet. Designet er simpelt, responsivt og ensartet på tværs af alle skærme.

## Teknologier brugt

- React Native
- Expo
- Supabase (til autentificering)
- React Navigation
- JavaScript
- Visual Studio Code

## Sikkerhedsfunktioner

- Login med email og adgangskode
- Mulighed for at oprette konto og nulstille adgangskode
- Supabase backend til authentication
- Navigation mellem skærme med React Navigation
- Password kan vises/skjules
- Deep linking understøttet (til brug med Supabase reset-link)
- Programvisning for festivalen med skift mellem datoer

## Sådan kører du projektet på din egen computer

### 1.Klon projektet og åbn det i VS Code
```
git clone https://github.com/din-bruger/pantrypal.git
cd pantrypa
```

### 2.  Installer live server (hvis du bruger VS Code)

Brug udvidelsen "Live Server" til at køre siden lokalt i browseren.

### 3. Firebase setup

- Opret et Firebase-projekt
- Aktiver Authentication (Email/Password + evt. Google)
- Aktiver Firestore Database og opret sikkerhedsregler
- Tilføj dine Firebase-config-oplysninger i firebase.js

### 4. Kør projektet

Åbn index.html i browseren via Live Server.

## Vigtigt omkring billeder og indhold
Alle billeder brugt i projektet er enten egne, fra frie billedsider (fx Unsplash/Pexels), eller licensgodkendte. Projektet er til læring og visning – ikke kommerciel brug.

## Fremtidige forbedringer
- Automatisk logout ved inaktivitet
- Sikker backend med rollebaseret kontrol
- Upload af egne billeder med kontrol

