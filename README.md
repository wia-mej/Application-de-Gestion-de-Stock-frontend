HEAD
# 🏪 Application de Gestion de Stock - Frontend

Interface utilisateur Angular pour l'application de gestion de stock développée dans le cadre du stage ouvrier.

## 📱 Technologies utilisées

- **Angular** 17
- **TypeScript**
- **Bootstrap** (si utilisé)
- **RxJS** pour la gestion des appels HTTP
- **Angular Router** pour la navigation
- **JWT** pour l'authentification

## 🏗️ Architecture

```
src/
├── app/
│   ├── components/          # Composants réutilisables
│   ├── pages/              # Pages principales
│   ├── services/           # Services Angular
│   ├── models/             # Interfaces TypeScript
│   └── interceptors/       # Intercepteurs HTTP
├── assets/                 # Images, styles, etc.
└── environments/           # Configuration d'environnement
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js (version 16+)
- Angular CLI (`npm install -g @angular/cli`)

### Installation
```bash
# Cloner le repository
git clone https://github.com/wia-mej/Application-de-Gestion-de-Stock-Frontend.git

# Installer les dépendances
cd Application-de-Gestion-de-Stock-Frontend
npm install

# Démarrer l'application
ng serve
```

L'application sera accessible sur `http://localhost:4200`

## 🔗 Backend

Cette application frontend communique avec l'API REST Spring Boot :
- **Repository Backend** : [Application-de-Gestion-de-Stock](https://github.com/wia-mej/Application-de-Gestion-de-Stock)
- **URL API par défaut** : `http://localhost:8080/api`

## 📊 Fonctionnalités principales

### 🔐 Authentification
- Connexion avec JWT
- Gestion des rôles utilisateurs
- Protection des routes

### 📦 Gestion des produits
- Liste des produits avec pagination
- Ajout/modification/suppression de produits
- Recherche et filtrage
- Gestion des catégories

### 👥 Gestion des clients et fournisseurs
- CRUD complet
- Gestion des informations de contact
- Historique des commandes

### 🛒 Gestion des commandes
- Création de commandes clients
- Gestion des commandes fournisseurs
- Suivi des statuts
- Génération de factures

### 📈 Suivi des stocks
- Vue d'ensemble des stocks
- Mouvements de stock
- Alertes de stock faible
- Inventaire

### 📊 Tableau de bord
- Statistiques en temps réel
- Graphiques et indicateurs
- Rapports d'activité

## 🎨 Interface utilisateur

L'interface est conçue pour être :
- **Responsive** : Compatible mobile et desktop
- **Intuitive** : Navigation claire et ergonomique
- **Moderne** : Design contemporain et professionnel

## 🔧 Configuration

### Environnements
Modifiez `src/environments/environment.ts` pour la configuration locale :

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### Services principaux
- `AuthService` : Gestion de l'authentification
- `ProductService` : API produits
- `ClientService` : API clients
- `OrderService` : API commandes
- `StockService` : API mouvements de stock

## 🧪 Tests

```bash
# Tests unitaires
ng test

# Tests e2e
ng e2e

# Build de production
ng build --prod
```

## 📝 Contexte du projet

**Projet de stage** réalisé dans le cadre d'une formation en développement web.

**Objectif** : Développer une application complète de gestion de stock pour une entreprise, avec une architecture moderne séparant frontend et backend.



## 📄 License

Ce projet est développé dans un cadre éducatif.

---

**Développé avec ❤️ par Wiame Jaoui dans le cadre d'un stage**
=======
# GDSPremierProjet

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
develop
