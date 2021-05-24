import { recipes } from './recipes.js'
import { createACard } from './createACard.js'



//_________________________________________________________________
const section = document.querySelector('.section')
const mainInput = document.getElementById('search')


function testInput(event, newArrayRecipes) {
  event.preventDefault
  const entry = mainInput.value
  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    findRecipes(inputText, newArrayRecipes)
  } else {
    section.innerHTML = ''
    newArrayRecipes = recipes
    createACard(newArrayRecipes)
  }
}

function normalizeAndLowerCase(param) {
  const a = param.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const b = a.toLowerCase()
  return b
}

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
      createACard(recipesSelected)
      index++
    } 
  }
  if (index === 0) {
    console.log('test')
    section.style.display = 'flex'
    section.style.justifyContent = 'center'
    section.innerHTML = '<p class="noresult">Auncune recette ne correspond à votre critère...</br>Vous pouvez chercher "Tarte aux pommes", "poisson", etc. </br></br>Pour afficher à nouveau toutes les recettes, veillez cliquer sur le logo en haut de la page.'
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