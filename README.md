
## En ligne
- Application web : https://senevent-three.vercel.app
- Deploiement continu : chaque merge sur main met la production a jour, chaque Pull Request recoit une URL de previsualisation.

## Application Android (APK)
- Telechargement : https://expo.dev/accounts/khadidiatoudiallo/projects/senevent/builds/26987e58-6824-4933-a45b-d10f613623cd
- Version mobile : 1.0.0 (profil EAS "preview")

## Lancer le projet en local
- npm install a la racine
- Web : apps/web, creer .env.local (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY), npm run dev
- Mobile : apps/mobile, creer .env (EXPO_PUBLIC_...), npx expo start
