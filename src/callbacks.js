// ========================================
// src/callbacks.js - Fonctions avec callbacks
// ========================================

/**
 * Simule la cuisson d'un plat avec callback
 * @param {string} nomPlat - Nom du plat à cuisiner
 * @param {number} tempsCuisson - Temps en millisecondes
 * @param {function} callback - Callback (error, result)
 */
function cuisinerPlat(nomPlat, tempsCuisson, callback) {
  // Validation des paramètres
  if (!nomPlat || tempsCuisson <= 0) {
    return callback(new Error('Paramètres invalides'));
  }
  
  setTimeout(() => {
    // Simulation d'un échec de cuisson (brûlé)
    if (tempsCuisson > 10000) {
      callback(new Error(`${nomPlat} a brûlé !`));
    } else {
      callback(null, `${nomPlat} est parfaitement cuit en ${tempsCuisson}ms !`);
    }
  }, tempsCuisson);
}

/**
 * Envoie un SMS avec callback
 * @param {string} numero - Numéro de téléphone
 * @param {string} message - Message à envoyer
 * @param {function} callback - Callback (error, result)
 */
function envoyerSMS(numero, message, callback) {
  setTimeout(() => {
    if (!numero || !message) {
      callback(new Error('Numéro et message requis'));
    } else {
      callback(null, `SMS envoyé à ${numero}: "${message}"`);
    }
  }, 100);
}

/**
 * Lit un fichier avec callback (simulation)
 * @param {string} chemin - Chemin du fichier
 * @param {function} callback - Callback (error, data)
 */
function lireFichier(chemin, callback) {
  setTimeout(() => {
    if (!chemin) {
      return callback(new Error('Chemin de fichier requis'));
    }
    
    if (chemin.includes('inexistant')) {
      return callback(new Error('Fichier non trouvé'));
    }
    
    // Simulation de contenu de fichier
    const contenu = `Contenu du fichier ${chemin}`;
    callback(null, contenu);
  }, 200);
}

module.exports = {
  cuisinerPlat,
  envoyerSMS,
  lireFichier
};