import { createACard } from './modules/createACard.js'
import { openDropdown, closeDropdown } from './modules/dropdowns.js'
import { recipes } from './modules/recipes.js'
import { testInput } from './modules/input.js'

// Affichage des recettes ________________________________________
let newArrayRecipes = recipes
createACard(newArrayRecipes)

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

const mainInput = document.getElementById('search')
const buttonsearch = document.getElementById('bouton-rechercher')


buttonsearch.addEventListener('click', (event) => {
  testInput(event)
})
mainInput.oninput =  testInput



export { newArrayRecipes }