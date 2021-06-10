import { recipes } from './recipes.js'
// import { concatenationOfRecipes } from './concatenation.js'
import { createACard } from './createACard.js'
import { noDuplicateDropdownsElements } from './contentsOfDropdowns.js'
// import { allRecipes } from '../index.js'
//_________________________________________________________________

/** 
 * @function findRecipes
 * fonction popur trouver les recettes contenant le(s) mot(s) saisi(s) + le(s) tag(s) eventuel(s)
 * dans les recettes affichées ou l'ensemble des recettes
 * @param {Array} array - array des mots saisis + tags
 * @param {Array} array2 - array des recttes affichées ou de toutes les recettes
 */

function findRecipes(array, array2) {
  const section = document.querySelector('.section')
  let recipesSelected = []
  let index = 0
  console.log(array)
  console.log(array2)
  for (let i = 0; i < array2.length; i++) {
    let recipe = array2[i]
    let counter = matchingWords(array, recipe)
    if (counter === array.length) {
      recipesSelected.push(recipes[i])
      index++
    }
  }
  section.innerHTML = ''
  createACard(recipesSelected)
  noDuplicateDropdownsElements(recipesSelected)
  if (index === 0) {
    section.style.display = 'flex'
    section.style.justifyContent = 'center'
    section.innerHTML = '<p class="noresult">Auncune recette ne correspond à votre recherche...</br>Vous pouvez chercher "Tarte aux pommes", "poisson", etc. </br></br>Pour afficher à nouveau toutes les recettes, veuillez cliquer sur le logo en haut de la page.'
    noDuplicateDropdownsElements(recipes)
  }
}

/** 
 * @function matchingWords
 * fonction permettant de vérifier la présence de chaque élément de l'array 'input' 
 * dans chaque recette concaténée.S'il y a correspondance alors le compteur est incrémenté.
 * @param {Array} input - array des mots saisis + tags
 * @param {string} recipe - recette concaténée
 * @returns {Number} - compteur de correspondances
 */

function matchingWords(array, recipe) {
  let counter = 0
  for (let j = 0; j < array.length; j++) {
    if (recipe.indexOf(array[j]) != -1) {
      counter++
    } 
  }
  return counter
}


//_________________________________________________________________
export { findRecipes }