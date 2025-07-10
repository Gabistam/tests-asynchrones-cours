// ========================================
// src/promises.js - Fonctions avec Promises
// ========================================

/**
 * Commande un plat avec Promise
 * @param {string} nomPlat - Nom du plat
 * @param {string} priorite - Priorité de la commande
 * @returns {Promise} Promise qui résout avec les détails de la commande
 */
function commanderPlat(nomPlat, priorite = 'normale') {
  return new Promise((resolve, reject) => {
    // Validation
    if (!nomPlat) {
      reject(new Error('Nom du plat requis'));
      return;
    }
    
    // Calcul du temps selon la priorité
    const tempsBase = 1000;
    const multiplicateur = priorite === 'express' ? 0.5 : priorite === 'lente' ? 2 : 1;
    const tempsCuisson = tempsBase * multiplicateur;
    
    setTimeout(() => {
      // Simulation d'échecs spécifiques
      if (nomPlat === 'Soufflé') {
        reject(new Error('Le soufflé s\'est effondré !'));
      } else if (nomPlat === 'Plat Inexistant') {
        reject(new Error('Ce plat n\'existe pas dans notre menu'));
      } else {
        resolve({
          plat: nomPlat,
          statut: 'prêt',
          tempsCuisson: tempsCuisson,
          priorite: priorite,
          timestamp: new Date().toISOString()
        });
      }
    }, tempsCuisson);
  });
}

/**
 * Télécharge une application avec Promise
 * @param {string} nomApp - Nom de l'application
 * @returns {Promise} Promise qui résout avec le statut de téléchargement
 */
function telechargerApplication(nomApp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!nomApp) {
        reject(new Error('Nom d\'application requis'));
      } else if (nomApp === 'AppMalveillante') {
        reject(new Error('Application bloquée par la sécurité'));
      } else {
        resolve(`${nomApp} a été téléchargée et installée.`);
      }
    }, 500);
  });
}

/**
 * Vérifie la disponibilité d'un service
 * @param {string} serviceUrl - URL du service
 * @returns {Promise} Promise qui résout avec le statut du service
 */
function verifierService(serviceUrl) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!serviceUrl) {
        reject(new Error('URL de service requise'));
      } else if (serviceUrl.includes('down')) {
        reject(new Error('Service indisponible'));
      } else {
        resolve({
          url: serviceUrl,
          statut: 'actif',
          tempsReponse: Math.floor(Math.random() * 100) + 50
        });
      }
    }, 300);
  });
}

module.exports = {
  commanderPlat,
  telechargerApplication,
  verifierService
};