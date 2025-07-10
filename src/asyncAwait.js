// ========================================
// src/asyncAwait.js - Fonctions async/await
// ========================================

/**
 * Service de livraison complet utilisant async/await
 */
class ServiceLivraison {
  constructor() {
    this.commandes = new Map();
    this.livreurs = ['Pierre', 'Marie', 'Jean'];
  }
  
  /**
   * Vérifie le stock d'un plat
   * @param {string} plat - Nom du plat
   * @returns {Promise<number>} Quantité en stock
   */
  async verifierStock(plat) {
    await this.attendre(100);
    
    const stocks = {
      'Pizza': 5,
      'Burger': 3,
      'Salade': 10,
      'Soupe': 0
    };
    
    return stocks[plat] || 0;
  }
  
  /**
   * Assigne un livreur disponible
   * @returns {Promise<string>} Nom du livreur assigné
   */
  async assignerLivreur() {
    await this.attendre(50);
    
    if (this.livreurs.length === 0) {
      throw new Error('Aucun livreur disponible');
    }
    
    return this.livreurs[Math.floor(Math.random() * this.livreurs.length)];
  }
  
  /**
   * Calcule le temps de livraison selon la distance
   * @param {number} distance - Distance en kilomètres
   * @returns {Promise<number>} Temps de livraison en minutes
   */
  async calculerTempsLivraison(distance) {
    await this.attendre(30);
    
    if (distance > 20) {
      throw new Error('Distance trop importante pour la livraison');
    }
    
    return distance * 2; // 2 minutes par km
  }
  
  /**
   * Traite une commande complète
   * @param {string} plat - Plat commandé
   * @param {string} adresse - Adresse de livraison
   * @param {number} distance - Distance en km
   * @returns {Promise<Object>} Détails de la commande
   */
  async traiterCommande(plat, adresse, distance) {
    try {
      // Étape 1 : Vérifier le stock
      const stock = await this.verifierStock(plat);
      if (stock === 0) {
        throw new Error(`${plat} en rupture de stock`);
      }
      
      // Étape 2 : Assigner un livreur
      const livreur = await this.assignerLivreur();
      
      // Étape 3 : Calculer le temps de livraison
      const tempsLivraison = await this.calculerTempsLivraison(distance);
      
      // Étape 4 : Créer la commande
      const commande = {
        id: Math.random().toString(36).substr(2, 9),
        plat,
        adresse,
        livreur,
        tempsLivraison,
        statut: 'confirmée',
        timestamp: new Date().toISOString()
      };
      
      this.commandes.set(commande.id, commande);
      return commande;
      
    } catch (erreur) {
      console.error('Erreur lors du traitement de la commande:', erreur.message);
      throw erreur;
    }
  }
  
  /**
   * Utilitaire pour attendre un délai
   * @param {number} ms - Millisecondes à attendre
   * @returns {Promise} Promise qui résout après le délai
   */
  async attendre(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Prépare un menu séquentiel avec async/await
 * @param {Array} plats - Liste des plats à préparer
 * @returns {Promise<Array>} Liste des plats préparés
 */
async function preparerMenuSequentiel(plats) {
  const resultats = [];
  
  for (const plat of plats) {
    const resultat = await commanderPlat(plat, 'normale');
    resultats.push(resultat);
  }
  
  return resultats;
}

/**
 * Prépare un menu en parallèle avec async/await
 * @param {Array} plats - Liste des plats à préparer
 * @returns {Promise<Array>} Liste des plats préparés
 */
async function preparerMenuParallele(plats) {
  const promesses = plats.map(plat => commanderPlat(plat, 'express'));
  return await Promise.all(promesses);
}

// Import de la fonction commanderPlat pour les fonctions ci-dessus
const { commanderPlat } = require('./promises');

module.exports = {
  ServiceLivraison,
  preparerMenuSequentiel,
  preparerMenuParallele
};