// ========================================
// src/testUtils.js - Utilitaires de test
// ========================================

/**
 * Utilitaires pour les tests asynchrones
 */
class TestUtils {
  /**
   * Opération critique pour tests de performance
   * @param {string} id - Identifiant de l'opération
   * @returns {Promise<Object>} Résultat de l'opération
   */
  static async operationCritique(id = 'default') {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { 
      id, 
      status: 'completed', 
      timestamp: Date.now() 
    };
  }
  
  /**
   * Teste un service externe
   * @param {string} endpoint - Endpoint à tester
   * @returns {Promise<Object>} Statut du service
   */
  static async testerService(endpoint) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return { 
      status: 'ok', 
      endpoint,
      responseTime: Math.floor(Math.random() * 100) + 50
    };
  }
  
  /**
   * Mesure le temps d'exécution d'une fonction
   * @param {Function} fn - Fonction à mesurer
   * @returns {Promise<Object>} Résultat avec temps d'exécution
   */
  static async mesurerTempsExecution(fn) {
    const debut = Date.now();
    const resultat = await fn();
    const tempsExecution = Date.now() - debut;
    
    return {
      resultat,
      tempsExecution
    };
  }
  
  /**
   * Simule un délai réseau variable
   * @param {number} min - Délai minimum
   * @param {number} max - Délai maximum
   * @returns {Promise} Promise qui résout après le délai
   */
  static async simulerDelaiReseau(min = 50, max = 200) {
    const delai = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise(resolve => setTimeout(resolve, delai));
    return delai;
  }
  
  /**
   * Crée une fonction qui échoue un certain nombre de fois
   * @param {number} nombreEchecs - Nombre d'échecs avant succès
   * @param {string} messageSucces - Message de succès
   * @returns {Function} Fonction qui échoue puis réussit
   */
  static creerFonctionInstable(nombreEchecs, messageSucces = 'Succès') {
    let tentatives = 0;
    
    return async () => {
      tentatives++;
      
      if (tentatives <= nombreEchecs) {
        throw new Error(`Échec ${tentatives}/${nombreEchecs}`);
      }
      
      return messageSucces;
    };
  }
  
  /**
   * Vérifie qu'une promesse se résout dans un délai donné
   * @param {Promise} promise - Promise à vérifier
   * @param {number} delaiMax - Délai maximum en millisecondes
   * @returns {Promise<boolean>} True si la promesse se résout dans les temps
   */
  static async verifierDelai(promise, delaiMax) {
    const debut = Date.now();
    
    try {
      await promise;
      const duree = Date.now() - debut;
      return duree <= delaiMax;
    } catch (error) {
      return false;
    }
  }
}

module.exports = TestUtils;