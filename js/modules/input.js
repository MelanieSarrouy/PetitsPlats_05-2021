// import { recipes } from './recipes.js'
import { normalizeAndLowerCase, clean } from './normalize.js'
import { findRecipes } from './findRecipes.js'
import { findTagsDisplayed } from './tags.js'
import { recipesDisplayed, displayResultnumber, allRecipes } from '../index.js'
//_________________________________________________________________

/**
 * @function testInput
 * fonction permettant de vérifier la saisie de l'utilisateur dans le champ de recherche principal
 * et d'afficher les recettes, ingrédients, appareils et ustensiles correspondants
 * @param {MouseEvent} event 
 */


function testInput(event) {
  event.preventDefault
  const mainInput = document.getElementById('search')
  const entry = mainInput.value
  let allTags = findTagsDisplayed()
  /**
   * EventListener sur évènement 'keyup' de l'input principal touches de suppression),
   * lancement de la @function findRecipes avec une recherche sur l'ensemble des recettes 
   * et pas seulement les recettes affichées
   */ 
  mainInput.addEventListener('keyup', (e) => {
    const keyCode = e.code
    if (keyCode === 'Backspace' || keyCode === 'Delete') {
      result(allTags, allRecipes)
    }
  })
  /**
   * si la saisie est supérieure ou égale à 3 caractères alors allTags (mots à chercher)
   * est modifié et la @function findRecipes effectue la recherche de correspondances 
   * uniquement sur les recettes affichées
   */ 
  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    let array = inputText.split(' ')
    let arrayEntry = clean(array)
    arrayEntry.forEach(elem => {
      allTags.push(elem)
    })
    allTags = [...new Set(allTags)]
    result(allTags, allRecipes)
  } 
}

//_________________________________________________________________
/**
 * EventListener sur évènement 'keyup' de l'input principal (touche Escape),
 * lancement de la @function findRecipes avec une recherche sur l'ensemble des recettes 
 * et pas seulement les recettes affichées
 */ 
const mainInput = document.getElementById('search')
mainInput.addEventListener('keyup', (e) => {
  const keyCode = e.code
  if (keyCode === 'Escape') {
    let allTags = findTagsDisplayed()
    result(allTags, allRecipes)
  }
})

//_________________________________________________________________
/**
 * EventListener sur évènement 'dblclick' de l'input principal,
 * lancement de la @function findRecipes avec une recherche sur l'ensemble des recettes 
 * et pas seulement les recettes affichées
 */ 
mainInput.addEventListener('dblclick', () => {
  let allTags = findTagsDisplayed()
  result(allTags, allRecipes)
})

//_________________________________________________________________
/**
 * @function result
 * trouve les correspondance entre tags/saisie et recettes et affiche le résultat
 * @param {Array} tags 
 * @param {Array} someRecipes 
 */
function result(tags, someRecipes) {
  findRecipes(tags, someRecipes)
  let filterdRecipes = recipesDisplayed()
  displayResultnumber(filterdRecipes)
}

//_________________________________________________________________
export { testInput, result }