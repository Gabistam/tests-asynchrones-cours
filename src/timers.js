// ========================================
// src/timers.js - Fonctions avec timers
// ========================================

/**
 * Gestionnaire de notifications avec intervalles
 */
class GestionnaireNotifications {
  constructor() {
    this.notifications = [];
    this.intervalles = new Map();
    this.actif = false;
  }
  
  /**
   * Démarre le système de notifications
   */
  demarrer() {
    if (this.actif) return;
    
    this.actif = true;
    
    // Vérification immédiate
    this.verifierNotifications();
    
    // Vérifications périodiques
    const intervalleRapide = setInterval(() => {
      this.verifierNotifications();
    }, 30000); // Toutes les 30 secondes
    
    const intervalleLent = setInterval(() => {
      this.nettoyerNotifications();
    }, 300000); // Toutes les 5 minutes
    
    this.intervalles.set('rapide', intervalleRapide);
    this.intervalles.set('lent', intervalleLent);
  }
  
  /**
   * Arrête le système de notifications
   */
  arreter() {
    this.actif = false;
    this.intervalles.forEach(intervalle => clearInterval(intervalle));
    this.intervalles.clear();
  }
  
  /**
   * Vérifie et ajoute de nouvelles notifications
   */
  verifierNotifications() {
    if (!this.actif) return;
    
    // Simulation de nouvelles notifications
    const nombreNouvelles = Math.floor(Math.random() * 3);
    for (let i = 0; i < nombreNouvelles; i++) {
      this.notifications.push({
        id: Date.now() + Math.random(),
        message: `Notification ${this.notifications.length + i + 1}`,
        timestamp: Date.now()
      });
    }
  }
  
  /**
   * Nettoie les anciennes notifications
   */
  nettoyerNotifications() {
    const maintenant = Date.now();
    const uneHeure = 60 * 60 * 1000;
    
    this.notifications = this.notifications.filter(
      notif => (maintenant - notif.timestamp) < uneHeure
    );
  }
  
  /**
   * Retourne toutes les notifications
   * @returns {Array} Liste des notifications
   */
  obtenirNotifications() {
    return [...this.notifications];
  }
}

/**
 * Fonction de retry avec délai
 * @param {Function} fn - Fonction à exécuter
 * @param {number} maxTentatives - Nombre maximum de tentatives
 * @param {number} delai - Délai entre les tentatives
 * @returns {Promise} Promise qui résout avec le résultat
 */
async function retryAvecDelai(fn, maxTentatives = 3, delai = 1000) {
  let dernierError;
  
  for (let tentative = 1; tentative <= maxTentatives; tentative++) {
    try {
      return await fn();
    } catch (error) {
      dernierError = error;
      
      if (tentative < maxTentatives) {
        await new Promise(resolve => setTimeout(resolve, delai));
      }
    }
  }
  
  throw new Error(`Échec après ${maxTentatives} tentatives: ${dernierError.message}`);
}

/**
 * Fonction de timeout pour limiter le temps d'exécution
 * @param {Promise} promise - Promise à exécuter
 * @param {number} timeout - Timeout en millisecondes
 * @returns {Promise} Promise qui résout ou rejette selon le timeout
 */
function avecTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout dépassé')), timeout)
    )
  ]);
}

module.exports = {
  GestionnaireNotifications,
  retryAvecDelai,
  avecTimeout
};