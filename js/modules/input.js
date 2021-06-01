import { recipes } from './recipes.js'
import { createACard } from './createACard.js'
import { noDuplicateIngredients, noDuplicateAppliances, noDuplicateUstensils } from './dropdowns.js'
import { findTagsDisplayed } from './tags.js'
import { recipesDisplayed } from '../index.js'
//_________________________________________________________________
const section = document.querySelector('.section')
const mainInput = document.getElementById('search')
let displayedRecipes


// Fonction de récupération des données du champ de recherche principal 
// pour affichage des recettes, ingrédients, appareils et ustensiles correspondants
function testInput(event) {
  event.preventDefault
  const entry = mainInput.value
  const result = document.querySelector('.header2__result')
  let filterdRecipes = recipesDisplayed()
  let allTags = findTagsDisplayed()

  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    let arrayEntry = inputText.split(' ')
    arrayEntry.forEach(elem => {
      allTags.push(elem)
    })
    findRecipes(allTags, recipes)
    let filterdRecipes = recipesDisplayed()
    result.innerHTML = `<span class="header2__result__bold">${filterdRecipes.length}</span> recette(s) trouvée(s)`
    return false
  } else {
    section.innerHTML = ''
    displayedRecipes = recipes
    createACard(displayedRecipes)
    noDuplicateIngredients(displayedRecipes)
    noDuplicateAppliances(displayedRecipes)
    noDuplicateUstensils(displayedRecipes)
    result.innerHTML = `<span class="header2__result__bold">${filterdRecipes.length}</span> recette(s) trouvée(s)`
    return false
  }

}

// Fonction de 'nettoyage' de la saisie (minuscules sans accents)
function normalizeAndLowerCase(param) {
  let a = param.normalize('NFD')
  a = replacements(a)
  let b = a.toLowerCase()
  // b = clean(b)
  return b
}
function replacements(str) {
  let a = str.replace(/[\u0300-\u036f]/g, '')
  let b = a.replace(/[œ]/g , 'oe')
  let c = b.replace(/[ÈÉÊË]/g,'E')
  return c
}

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

function findRecipes(input, someRecipes) {
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
  displayedRecipes = recipesSelected
  createACard(displayedRecipes)
  noDuplicateIngredients(displayedRecipes)
  noDuplicateAppliances(displayedRecipes)
  noDuplicateUstensils(displayedRecipes)
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
    allIngredients.push(ingredients)
  }
  return allIngredients
}

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

// EXPORTS // _____ // EXPORTS //  _____ // EXPORTS //  _____ // EXPORTS //  _____ // EXPORTS // 
export { testInput, findRecipes, normalizeAndLowerCase }
