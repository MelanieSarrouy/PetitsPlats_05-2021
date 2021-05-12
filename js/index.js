import { recipes } from './recipes.js'

import { Element } from './element.js'

import { createACard } from './createACard.js'

createACard()

const ingredientsDown = document.getElementById('iconDown-ingredients')
const ingredientsUp = document.getElementById('iconUp-ingredients')

let ALLingredients = []

ingredientsDown.addEventListener('click', () => allIngredients())

function allIngredients() {
  ingredientsDown.style.display = 'none'
  ingredientsUp.style.display = 'block'
  for (let i = 0; i < recipes.length; i++) {
    let ingredientsRecipe = recipes[i].ingredients
    let arrayIngred = []
    for (let ingredient of ingredientsRecipe) {
      let ingred = ingredient.ingredient
      arrayIngred.push(ingred)
    }
    arrayIngred.forEach(ingr => ALLingredients.push(ingr))
  }
  let AllingredientsUnique = [...new Set(ALLingredients)]
  
  const ul = document.getElementById('menu-ingredients')
  ul.innerHTML = ''
  for (let t = 0; t < AllingredientsUnique.length; t++) {
    const li = new Element('li', 'li', 'dropdown__menu__item').elem
    ul.appendChild(li)
    li.classList.add('dropdown__menu__item--ingredients')
    li.textContent = `${AllingredientsUnique[t]}`
  }
}

ingredientsUp.addEventListener('click', () => closeDropdown())

function closeDropdown() {
  ingredientsDown.style.display = 'block'
  ingredientsUp.style.display = 'none'
  const ul = document.getElementById('menu-ingredients')
  ul.innerHTML = ''
}

