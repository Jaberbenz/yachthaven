# YachtHaven - Plateforme de Réservation de Prestations pour Yachts

## Aperçu du Projet

YachtHaven est une application web MERN (MongoDB, Express, React, Node.js) permettant aux propriétaires de yachts et aux clients de réserver diverses prestations. L'application met en relation les prestataires de services et les clients dans le secteur du yachting.

## Technologies Utilisées

### Frontend

- **Framework**: React.js avec Vite
- **Router**: React Router DOM
- **Styling**: Tailwind CSS
- **Calendrier**: FullCalendar, React Big Calendar
- **Requêtes HTTP**: Axios
- **UI Components**: React Icons, Lucide React, React Slick (carrousels)

### Backend

- **Serveur**: Node.js avec Express
- **Base de données**: MongoDB avec Mongoose
- **Authentification**: JWT (jsonwebtoken) et bcryptjs
- **Upload d'images**: multer, image-downloader
- **Configuration**: dotenv
- **CORS et cookies**: cors, cookie-parser

## Structure de l'Application

### Modèles de Données

1. **Client**: Utilisateurs cherchant des prestations

   - Informations personnelles (nom, prénom, email, téléphone)
   - Authentification (email/mot de passe)
   - Photo de profil

2. **Prestataire**: Fournisseurs de services

   - Informations personnelles et professionnelles
   - Numéro SIRET et adresse
   - Portfolio de prestations

3. **Prestation**: Services proposés par les prestataires

   - Titre, description, prix
   - Localisation
   - Photos
   - Capacité d'accueil
   - Disponibilités
   - Catégorie et options

4. **Booking**: Réservations
   - Lien vers prestation
   - Client
   - Date et horaires
   - Nombre d'invités

### Fonctionnalités Principales

1. **Authentification**

   - Inscription séparée pour clients et prestataires
   - Connexion sécurisée avec JWT

2. **Gestion des profils**

   - Mise à jour des informations personnelles
   - Gestion des photos de profil

3. **Prestations**

   - Création et gestion de prestations par les prestataires
   - Recherche et filtrage des prestations disponibles
   - Visualisation détaillée des prestations

4. **Réservations**

   - Système de réservation avec sélection de date et heure
   - Gestion des disponibilités via calendrier
   - Suivi des réservations pour clients et prestataires

5. **BackOffice Prestataire**
   - Interface dédiée à la gestion des prestations et réservations

## Architecture du Projet

- **/client**: Application frontend React

  - **/src/pages**: Routes principales de l'application
  - **/src/assets**: Images et ressources statiques
  - **/src/layouts**: Composants de mise en page

- **/api**: Serveur backend Node.js
  - **/models**: Modèles MongoDB
  - **/uploads**: Stockage des fichiers uploadés

## Installation et Déploiement

1. Cloner le dépôt

```bash
git clone https://github.com/Jaberbenz/yachthaven.git
```

2. Installation des dépendances:

```bash
# Backend
cd api
npm install

# Frontend
cd client
npm install
```

3. Configuration:

   - Créer un fichier `.env` dans le dossier `api` avec les variables suivantes:

   ```
   MONGODB_URI=votre_uri_mongodb
   JWT_SECRET=votre_secret_jwt
   PORT=4000
   ```

4. Démarrage:

```bash
# Backend
cd api
npm start

# Frontend
cd client
npm run dev
```

## Cas d'Utilisation

- Propriétaires de yachts cherchant des services (nettoyage, maintenance, catering, etc.)
- Prestataires souhaitant proposer leurs services au marché du yachting
- Gestion des rendez-vous et disponibilités pour les deux parties

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
