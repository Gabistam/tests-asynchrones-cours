// ========================================
// src/patterns.js - Patterns avancés
// ========================================

/**
 * Cuisine parallèle avec Promise.all
 */
class CuisineParallele {
  /**
   * Prépare un ingrédient avec délai
   * @param {string} ingredient - Nom de l'ingrédient
   * @param {number} temps - Temps de préparation
   * @returns {Promise<string>} Ingrédient préparé
   */
  async preparerIngredient(ingredient, temps) {
    await new Promise(resolve => setTimeout(resolve, temps));
    return `${ingredient} préparé`;
  }
  
  /**
   * Prépare un menu complet en parallèle
   * @returns {Promise<Object>} Menu complet
   */
  async preparerMenuComplet() {
    const preparations = [
      this.preparerIngredient('Légumes', 200),
      this.preparerIngredient('Viande', 300),
      this.preparerIngredient('Sauce', 150),
      this.preparerIngredient('Garniture', 100)
    ];
    
    const resultats = await Promise.all(preparations);
    return {
      ingredients: resultats,
      tempsTotal: 'Temps du plus lent (300ms)',
      menuComplet: true
    };
  }
  
  /**
   * Prépare un menu avec un échec simulé
   * @returns {Promise} Promise qui rejette
   */
  async preparerMenuAvecEchec() {
    const preparations = [
      this.preparerIngredient('Légumes', 100),
      Promise.reject(new Error('Viande avariée !')),
      this.preparerIngredient('Sauce', 50)
    ];
    
    return Promise.all(preparations);
  }
}

/**
 * Services concurrents avec Promise.race
 */
class ServicesConcurrents {
  /**
   * Service lent
   * @param {any} donnees - Données à traiter
   * @returns {Promise<string>} Résultat du service lent
   */
  async serviceLent(donnees) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Service lent: ${donnees}`;
  }
  
  /**
   * Service rapide
   * @param {any} donnees - Données à traiter
   * @returns {Promise<string>} Résultat du service rapide
   */
  async serviceRapide(donnees) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return `Service rapide: ${donnees}`;
  }
  
  /**
   * Service avec timeout utilisant Promise.race
   * @param {any} donnees - Données à traiter
   * @param {number} timeoutMs - Timeout en millisecondes
   * @returns {Promise} Promise qui résout ou rejette selon le timeout
   */
  async serviceAvecTimeout(donnees, timeoutMs = 500) {
    const promisePrincipale = this.serviceLent(donnees);
    const promiseTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout dépassé')), timeoutMs)
    );
    
    return Promise.race([promisePrincipale, promiseTimeout]);
  }
  
  /**
   * Retourne le résultat du service le plus rapide
   * @param {any} donnees - Données à traiter
   * @returns {Promise} Promise qui résout avec le premier résultat
   */
  async meilleurService(donnees) {
    return Promise.race([
      this.serviceLent(donnees),
      this.serviceRapide(donnees)
    ]);
  }
}

/**
 * Service avec retry intelligent
 */
class ServiceAvecRetry {
  constructor() {
    this.tentatives = 0;
  }
  
  /**
   * Remet à zéro le compteur de tentatives
   */
  reset() {
    this.tentatives = 0;
  }
  
  /**
   * Opération qui échoue plusieurs fois avant de réussir
   * @returns {Promise<string>} Message de succès
   */
  async operationInstable() {
    this.tentatives++;
    
    // Simule un service qui échoue 2 fois sur 3
    if (this.tentatives < 3) {
      throw new Error(`Échec tentative ${this.tentatives}`);
    }
    
    return `Succès après ${this.tentatives} tentatives`;
  }
  
  /**
   * Exécute une opération avec retry automatique
   * @param {Function} operation - Fonction à exécuter
   * @param {number} maxTentatives - Nombre maximum de tentatives
   * @param {number} delaiMs - Délai entre les tentatives
   * @returns {Promise} Promise qui résout avec le résultat
   */
  async avecRetry(operation, maxTentatives = 3, delaiMs = 50) {
    let derniereErreur;
    
    for (let tentative = 1; tentative <= maxTentatives; tentative++) {
      try {
        return await operation();
      } catch (erreur) {
        derniereErreur = erreur;
        console.log(`Tentative ${tentative} échouée: ${erreur.message}`);
        
        // Attendre avant de réessayer (sauf pour la dernière tentative)
        if (tentative < maxTentatives) {
          await new Promise(resolve => setTimeout(resolve, delaiMs));
        }
      }
    }
    
    throw new Error(`Échec après ${maxTentatives} tentatives: ${derniereErreur.message}`);
  }
}

module.exports = {
  CuisineParallele,
  ServicesConcurrents,
  ServiceAvecRetry
};

