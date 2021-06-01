import { createACard } from './modules/createACard.js'
import { openDropdown, closeDropdown, noDuplicateIngredients, noDuplicateAppliances, noDuplicateUstensils } from './modules/dropdowns.js'
import { recipes } from './modules/recipes.js'
import { testInput } from './modules/input.js'

// Affichage des recettes ________________________________________

createACard(recipes)
noDuplicateIngredients(recipes)
noDuplicateAppliances(recipes)
noDuplicateUstensils(recipes)

// Ouverture et fermeture des dropdowns __________________________
const iconDown = document.querySelectorAll('.iconDown')
iconDown.forEach(icon => {
  icon.addEventListener('click', (event) => {
    openDropdown(event)
  })
})

const iconUp = document.querySelectorAll('.iconUp')
iconUp.forEach(icon => {
  icon.addEventListener('click', (event) => {
    closeDropdown(event)
  })
})

const inputDropdown = document.querySelectorAll('.dropdown__form__input')
inputDropdown.forEach(input => {
  input.addEventListener('focus', (event) => {
    openDropdown(event)
  })
})


// recherche dans le champ de recherche principal __________________________
const mainInput = document.getElementById('search')
const buttonsearch = document.getElementById('bouton-rechercher')

buttonsearch.addEventListener('click', (event) => {
  testInput(event)
})
mainInput.addEventListener('input', (event) => {
  testInput(event)
})


let filteredRecipes = recipesDisplayed()

const result = document.querySelector('.header2__result')
result.innerHTML = `<span class="header2__result__bold">${filteredRecipes.length}</span> recette(s) trouvée(s)`


function recipesDisplayed() {
  let displayedRecipes = []
  let articles = document.querySelectorAll('.article')
  let allArticles = Array.from(articles)
  allArticles.forEach(article => {
    let articleId = article.id
    for (let i = 0; i < recipes.length; i++) {
      let recipeId = `article-${recipes[i].id}`
      if (articleId == recipeId) {
        displayedRecipes.push(recipes[i])
      }
    }
  }) 
  return displayedRecipes
}

export { recipesDisplayed }


