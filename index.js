const express = require('express');         // Importe Express
const client = require('prom-client');      // Importe le client Prometheus
require('dotenv').config();                 // Charge les variables d'environnement depuis le fichier .env

// Vérifie la connexion à la variable d'environnement
console.log(`Le serveur utilise l'hôte: ${process.env.PORT}`);  // Exemple d'utilisation d'une autre variable d'environnement

const app = express();                      // Crée une application Express
const collectDefaultMetrics = client.collectDefaultMetrics; // Fonction pour collecter les métriques par défaut

// Configurer Prometheus pour collecter les métriques par défaut
collectDefaultMetrics();

// Créer un endpoint /metrics pour exposer les métriques
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);   // Définit le type de contenu
    res.end(await client.register.metrics());               // Envoie les métriques collectées
  } catch (ex) {
    res.status(500).end(ex);                                // Gère les erreurs éventuelles
  }
});

// Exemple de route pour ton application
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Récupérer le port depuis les variables d'environnement ou utiliser le port 3016 par défaut
const port = process.env.PORT;

// Démarrer le serveur sur le port défini
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
