import { recipes } from './recipes.js'
import { normalizeAndLowerCase } from './normalize.js'
import { findRecipes } from './findRecipes.js'
import { createACard } from './createACard.js'
import { noDuplicateIngredients, noDuplicateAppliances, noDuplicateUstensils } from './contentsOfDropdowns.js'
import { findTagsDisplayed } from './tags.js'
import { recipesDisplayed, displayResultnumber } from '../index.js'
//_________________________________________________________________

/**
 * @function testInput
 * fonction permettant de vérifier la saisie de l'utilisateur dans le champ de recherche principal
 * et d'afficher les recettes, ingrédients, appareils et ustensiles correspondants
 * @param {MouseEvent} event 
 */

function testInput(event) {
  event.preventDefault
  const section = document.querySelector('.section')
  const mainInput = document.getElementById('search')
  const entry = mainInput.value
  let allTags = findTagsDisplayed()
  let filterdRecipes
  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    let arrayEntry = inputText.split(' ')
    arrayEntry.forEach(elem => {
      allTags.push(elem)
    })
    findRecipes(allTags, recipes)
    filterdRecipes = recipesDisplayed()
    displayResultnumber(filterdRecipes)
  } 
  if (entry.length < 3 && allTags.length != 0) {
    findRecipes(allTags, recipes)
    filterdRecipes = recipesDisplayed()
    displayResultnumber(filterdRecipes)
  } 
  if (entry.length < 3 && allTags.length == 0) {
    section.innerHTML = ''
    createACard(recipes)
    noDuplicateIngredients(recipes)
    noDuplicateAppliances(recipes)
    noDuplicateUstensils(recipes)
    displayResultnumber(recipes)
  }
}

// EXPORTS // _____ // EXPORTS //  _____ // EXPORTS //  ___________
export { testInput }
