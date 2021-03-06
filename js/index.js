import { createACard } from './modules/createACard.js'
import { openDropdown, closeDropdown } from './modules/dropdowns.js'
import { noDuplicateDropdownsElements } from './modules/contentsOfDropdowns.js'
import { recipes } from './modules/recipes.js'
// import { testInput } from './modules/input.js'
//_________________________________________________________________


// Affichage des recettes _________________________________________
createACard(recipes)
noDuplicateDropdownsElements(recipes)

// Ouverture et fermeture des dropdowns ___________________________
const buttonDropdown = document.querySelectorAll('.dropdown__button')
buttonDropdown.forEach(button => {
  button.addEventListener('click', (event) => {
    openDropdown(event)
  })
})


const iconUp = document.querySelectorAll('.iconUp')
iconUp.forEach(icon => {
  icon.addEventListener('click', () => {
    closeDropdown()
  })
})

const allButtonClose = document.querySelectorAll('.dropdown__form__icon')
allButtonClose.forEach(button => {
  button.addEventListener('click', () => {
    closeDropdown()
  })
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


//_________________________________________________________________
export { recipesDisplayed, displayResultnumber }