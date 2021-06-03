import { recipes } from './recipes.js'
import { concatenationOfRecipes } from './concatenation.js'
import { createACard } from './createACard.js'
import { noDuplicateIngredients, noDuplicateAppliances, noDuplicateUstensils } from './contentsOfDropdowns.js'
//_________________________________________________________________

/** 
 * @function findRecipes
 * fonction popur trouver les recettes contenant le(s) mot(s) saisi(s) + le(s) tag(s) eventuel(s)
 * dans les recettes affichées ou l'ensemble des recettes
 * @param {Array} input - array des mots saisis + tags
 * @param {Array} someRecipes - array des recttes affichées ou de toutes les recettes
 */

function findRecipes(input, someRecipes) {
  const section = document.querySelector('.section')
  let recipesSelected = []
  let index = 0
  for (let i = 0; i < someRecipes.length; i++) {
    let recipe = concatenationOfRecipes(someRecipes[i])
    let counter = matchingWords(input, recipe)
    if (counter === input.length) {
      recipesSelected.push(someRecipes[i])
      index++
    }
  }
  section.innerHTML = ''
  createACard(recipesSelected)
  noDuplicateIngredients(recipesSelected)
  noDuplicateAppliances(recipesSelected)
  noDuplicateUstensils(recipesSelected)
  if (index === 0) {
    section.style.display = 'flex'
    section.style.justifyContent = 'center'
    section.innerHTML = '<p class="noresult">Auncune recette ne correspond à votre critère...</br>Vous pouvez chercher "Tarte aux pommes", "poisson", etc. </br></br>Pour afficher à nouveau toutes les recettes, veuillez cliquer sur le logo en haut de la page.'
    noDuplicateIngredients(recipes)
    noDuplicateAppliances(recipes)
    noDuplicateUstensils(recipes)
  }
}

/** 
 * @function matchingWords
 * fonction permettant de vérifier la présence de chaque élément de l'array 'input' dans chaque recette concaténée.
 * S'il y a correspondance alors le compteur est incrémenté
 * @param {Array} input - array des mots saisis + tags
 * @param {string} recipe - recette concaténée
 * @returns {Number} - compteur de correspondances
 */

function matchingWords(input, recipe) {
  let counter = 0
  for (let j = 0; j < input.length; j++) {
    if (recipe.indexOf(input[j]) != -1) {
      counter++
    } 
  }
  return counter
}

// EXPORTS // _____ // EXPORTS //  _____ // EXPORTS //  ___________
export { findRecipes }