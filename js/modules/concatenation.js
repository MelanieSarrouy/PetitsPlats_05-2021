import { normalizeAndLowerCase } from './normalize.js'
//_________________________________________________________________

/**
 * @function concatenationOfRecipes
 * fonction permettant de concaténer les recettes
 * @param {Object} recipe 
 * @returns {String} - recette concaténée
 */

function concatenationOfRecipes(recipe) {
  let name = normalizeAndLowerCase(recipe.name)
  let appliance = normalizeAndLowerCase(recipe.appliance)
  let description = normalizeAndLowerCase(recipe.description)
  let arrayIngredients = recoveryIngredients(recipe)
  let ingredients = arrayIngredients.toString()
  let arrayUstensils = recoveryUstensils(recipe)
  let ustensils = arrayUstensils.toString()
  let recipeString = name + ' ' + appliance + ' ' +  description + ' ' +  ingredients + ' ' +  ustensils
  return recipeString
}

/**
 * @function recoveryIngredients
 * fonction permettant de récupérer les ingrédients de l'objet recette 
 * pour en faire un array
 * @param {Object} recipe 
 * @returns {Array} - array de chaque ingrédient de la recette
 */

function recoveryIngredients(recipe) {
  let allIngredients = []
  const ingredientsList = recipe.ingredients
  for (let j = 0; j < ingredientsList.length; j++) {
    let ingredient = ingredientsList[j].ingredient
    let ingredients = normalizeAndLowerCase(ingredient)
    allIngredients.push(ingredients)
  }
  return allIngredients
}

/**
 * @function recoveryUstensils
 * fonction permettant de récupérer les ustensiles de l'objet recette 
 * pour en faire un array
 * @param {Object} recipe 
 * @returns {Array} - array de chaque ustensile de la recette
 */

function recoveryUstensils(recipe) {
  let allUstensils = []
  const ustensilsList = recipe.ustensils
  for (let k = 0; k < ustensilsList.length; k++) {
    let ustensil = ustensilsList[k]
    let ustensils = normalizeAndLowerCase(ustensil)
    allUstensils.push(ustensils)
  }
  return allUstensils
}

// EXPORTS // _____ // EXPORTS //  _____ // EXPORTS //  ___________
export { concatenationOfRecipes }