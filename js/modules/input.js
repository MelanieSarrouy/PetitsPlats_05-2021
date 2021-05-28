import { recipes } from './recipes.js'
import { createACard } from './createACard.js'
import { noDuplicateIngredients, noDuplicateAppliances, noDuplicateUstensils } from './dropdowns.js'


//_________________________________________________________________
const section = document.querySelector('.section')
const mainInput = document.getElementById('search')
let displayedRecipes = []
const wordsToExclude = [' et ', ' a ', ' aux ', ' de ', ' la ', ' les ', ' du ', ' le ', ' y ', ' en ', ' ou ', ' l\'', ' d\'', ' dans ', ' un ', ' une ']


// Fonction de récupération des données du champ de recherche principal 
// pour affichage des recettes, ingrédients, appareils et ustensiles correspondants

function testInput(event) {
  event.preventDefault
  const entry = mainInput.value
  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    let cleanedEntry = clean(inputText, wordsToExclude)
    let arrayEntry = cleanedEntry.split(' ')
    findRecipes(arrayEntry)
    return false
  } else {
    section.innerHTML = ''
    createACard(recipes)
    noDuplicateIngredients(recipes)
    noDuplicateAppliances(recipes)
    noDuplicateUstensils(recipes)
    return false
  }
}

// Fonction de 'nettoyage' de la saisie (retrait des "badWords")
function clean(str, badWords) {
  for (let i = 0; i < badWords.length; i++) {
    if (str.indexOf(badWords[i]) != -1) {
      let cleaned = str.replace(badWords[i], ' ')
      str = cleaned
    }
  }
  return str
}
// Fonction de 'nettoyage' de la saisie (minuscules sans accents)
function normalizeAndLowerCase(param) {
  const a = param.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const b = a.toLowerCase()
  return b
}


function concatenationOfRecipes(recipe) {
  const nameBefore = normalizeAndLowerCase(recipe.name)
  const name = clean(nameBefore, wordsToExclude)
  const applianceBefore = normalizeAndLowerCase(recipe.appliance)
  const appliance = clean(applianceBefore, wordsToExclude)
  const descriptionBefore = normalizeAndLowerCase(recipe.description)
  const description = clean(descriptionBefore, wordsToExclude)
  const arrayIngredients = recoveryIngredients(recipe)
  const ingredients = arrayIngredients.toString()
  const arrayUstensils = recoveryUstensils(recipe)
  const ustensils = arrayUstensils.toString()
  let recipeString = name + ' ' + appliance + ' ' +  description + ' ' +  ingredients + ' ' +  ustensils
  return recipeString
}

function findRecipes(input) {
  let recipesSelected = []
  let index = 0
  for (let i = 0; i < recipes.length; i++) {
    let recipe = concatenationOfRecipes(recipes[i])
    let counter = matchingWords(input, recipe)
    if (counter === input.length) {
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
    section.innerHTML = '<p class="noresult">Auncune recette ne correspond à votre critère...</br>Vous pouvez chercher "Tarte aux pommes", "poisson", etc. </br></br>Pour afficher à nouveau toutes les recettes, veuillez cliquer sur le logo en haut de la page.'
    noDuplicateIngredients(recipes)
    noDuplicateAppliances(recipes)
    noDuplicateUstensils(recipes)
  }
}

function matchingWords(input, recipe) {
  let counter = 0
  for (let j = 0; j < input.length; j++) {
    if (recipe.indexOf(input[j]) != -1) {
      counter++
    } else {
      counter = 0
    }
  }
  return counter
}

function recoveryIngredients(recipe) {
  let allIngredients = []
  const ingredientsList = recipe.ingredients
  for (let j = 0; j < ingredientsList.length; j++) {
    let ingredient = ingredientsList[j].ingredient
    let ingredients = normalizeAndLowerCase(ingredient)
    let ingredientsCleaned = clean(ingredients, wordsToExclude)
    allIngredients.push(ingredientsCleaned)
  }
  return allIngredients
}

function recoveryUstensils(recipe) {
  let allUstensils = []
  const ustensilsList = recipe.ustensils
  for (let k = 0; k < ustensilsList.length; k++) {
    let ustensil = ustensilsList[k]
    let ustensils = normalizeAndLowerCase(ustensil)
    let istensilsCleaned = clean(ustensils, wordsToExclude)
    allUstensils.push(istensilsCleaned)
  }
  return allUstensils
}

// EXPORTS // _____ // EXPORTS //  _____ // EXPORTS //  _____ // EXPORTS //  _____ // EXPORTS // 
export { testInput }
export { normalizeAndLowerCase }