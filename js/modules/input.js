import { recipes } from './recipes.js'
import { createACard } from './createACard.js'
import { noDuplicateIngredients, noDuplicateAppliances, noDuplicateUstensils } from './dropdowns.js'


//_________________________________________________________________
const section = document.querySelector('.section')
const mainInput = document.getElementById('search')

let displayedRecipes = []

function testInput(event) {
  event.preventDefault
  const entry = mainInput.value
  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    // let arrayWords = researchAllWords(inputText)
    findRecipes(inputText)
  } else {
    section.innerHTML = ''
    displayedRecipes = recipes
    createACard(recipes)
    noDuplicateIngredients(recipes)
    noDuplicateAppliances(recipes)
    noDuplicateUstensils(recipes)
  }
}

function normalizeAndLowerCase(param) {
  const a = param.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const b = a.toLowerCase()
  return b
}

// function researchAllWords(chaine) {
//   const wordsToExclude = ['', ' et ', ' à ', ' aux ', ' de ', ' la ', ' les ', ' du ', ' le ', ' en ', ' ou ']
//   let arrayWords = []
//   for (let i = 0; i < wordsToExclude.length; i++) {
//     let wordToExclude = wordsToExclude[i]
//     if (chaine.indexOf(wordToExclude) != -1) {
//       chaine = chaine.replace(wordToExclude, ' ')
//     }
//   }
//   for (let i = 0; i < chaine.length; i++) {
//     let word = chaine.split(' ')
//     arrayWords.push(word)
//   }
//   return arrayWords
// }

function findRecipes(inputText) {
  let recipesSelected = []
  let index = 0
  for (let i = 0; i < recipes.length; i++) {
    let name = normalizeAndLowerCase(recipes[i].name)
    let appliance = normalizeAndLowerCase(recipes[i].appliance)
    let description = normalizeAndLowerCase(recipes[i].description)
    let allIngredients = []
    let allUstensils = []
    normalizeRecipes(recipes[i], allIngredients, allUstensils)
    if ((name.indexOf(inputText) != -1) || 
    (appliance.indexOf(inputText) != -1) ||
    (description.indexOf(inputText) != -1) ||
    (allIngredients.indexOf(inputText) != -1) ||
    (allUstensils.indexOf(inputText) != -1)) {
      recipesSelected.push(recipes[i])
      section.innerHTML = ''
      displayedRecipes = recipesSelected
      createACard(displayedRecipes)
      noDuplicateIngredients(displayedRecipes)
      noDuplicateAppliances(displayedRecipes)
      noDuplicateUstensils(displayedRecipes)
      index++
    } 
  }
  if (index === 0) {
    section.style.display = 'flex'
    section.style.justifyContent = 'center'
    section.innerHTML = '<p class="noresult">Auncune recette ne correspond à votre critère...</br>Vous pouvez chercher "Tarte aux pommes", "poisson", etc. </br></br>Pour afficher à nouveau toutes les recettes, veillez cliquer sur le logo en haut de la page.'
    noDuplicateIngredients(recipes)
    noDuplicateAppliances(recipes)
    noDuplicateUstensils(recipes)
  }
}


function normalizeRecipes(recipe, allIngredients, allUstensils) {
  const ingredientsList = recipe.ingredients
  for (let j = 0; j < ingredientsList.length; j++) {
    let ingredient = ingredientsList[j].ingredient
    let ingredients = normalizeAndLowerCase(ingredient)
    allIngredients.push(ingredients)
    return allIngredients
  }
  const ustensilsList = recipe.ustensils
  for (let k = 0; k < ustensilsList.length; k++) {
    let ustensil = ustensilsList[k]
    let ustensils = normalizeAndLowerCase(ustensil)
    allUstensils.push(ustensils)
    return allUstensils
  }
}

export { testInput }
export { displayedRecipes }
export { normalizeAndLowerCase }