# 🏪 Application de Gestion de Stock - Frontend

Interface utilisateur Angular pour l'application de gestion de stock développée dans le cadre d'un stage.

## 📱 Technologies utilisées

- **Angular** 15+ (ou votre version)
- **TypeScript**
- **Angular Material** (si utilisé)
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
│   ├── guards/             # Guards d'authentification
│   ├── interceptors/       # Intercepteurs HTTP
│   └── shared/             # Modules partagés
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

**Durée** : [Indiquez la durée de votre stage]

## 🤝 Contribution

Ce projet étant un projet de stage, les contributions sont actuellement fermées.

## 📄 License

Ce projet est développé dans un cadre éducatif.

---

**Développé avec ❤️ par [Votre nom] dans le cadre d'un stage**
