import { createACard } from './modules/createACard.js'
import { openDropdown, closeDropdown } from './modules/dropdowns.js'
import { noDuplicateIngredients, noDuplicateAppliances, noDuplicateUstensils } from './modules/contentsOfDropdowns.js'
import { recipes } from './modules/recipes.js'
import { testInput } from './modules/input.js'
//_________________________________________________________________


// Affichage des recettes _________________________________________
createACard(recipes)
noDuplicateIngredients(recipes)
noDuplicateAppliances(recipes)
noDuplicateUstensils(recipes)

// Ouverture et fermeture des dropdowns ___________________________
const iconDown = document.querySelectorAll('.iconDown')
iconDown.forEach(icon => {
  icon.addEventListener('click', (event) => {
    openDropdown(event)
  })
})

const iconUp = document.querySelectorAll('.iconUp')
iconUp.forEach(icon => {
  icon.addEventListener('click', () => {
    closeDropdown()
  })
})

const labelDropdown = document.querySelectorAll('.dropdown__form__label')
labelDropdown.forEach(label => {
  label.addEventListener('click', (event) => {
    openDropdown(event)
  })
})

// recherche dans le champ de recherche principal _________________
const mainInput = document.getElementById('search')
const buttonsearch = document.getElementById('bouton-rechercher')

buttonsearch.addEventListener('click', (event) => {
  testInput(event)
})
mainInput.addEventListener('input', (event) => {
  testInput(event)
})


//_________________________________________________________________
/**
 * @function displayResultnumber
 * fonction permettant d'afficher dans le HTML 
 * le nombre de recettes trouvées
 * @param {Array} param - recettes affichées
 */

function displayResultnumber(param) {
  const result = document.querySelector('.header2__result')
  result.innerHTML = `<span class="header2__result__bold">${param.length}</span> recette(s) trouvée(s)`
}

let filteredRecipes = recipesDisplayed()
displayResultnumber(filteredRecipes)

//_________________________________________________________________
/**
 * @function recipesDisplayed
 * fonction permettant de récupérer les recettes affichées
 * @returns {array} - recettes affichées
 */

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


// EXPORTS // _____ // EXPORTS //  _____ // EXPORTS //  ___________
export { recipesDisplayed, displayResultnumber }
