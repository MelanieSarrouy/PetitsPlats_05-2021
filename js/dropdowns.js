import { recipes } from './recipes.js'
import { Element } from './element.js'
import { ingredientsDown, ingredientsUp } from './index.js'

//fonction affichage des ingrédients
function displayIngredients() {
  ingredientsDown.style.display = 'none'
  ingredientsUp.style.display = 'block'
  const ulIngredients = document.getElementById('menu-ingredients')
  ulIngredients.innerHTML = ''
  ulIngredients.style.paddingTop = '1rem'
  const allIngredientsUnique = noDuplicateElements()
  titleSort(allIngredientsUnique)
  columnSize(allIngredientsUnique, ulIngredients)
  createItem(allIngredientsUnique, ulIngredients)
}

// fonction liste des ingrédients sans doublons
function noDuplicateElements() {
  let ALLingredients = []
  for (let i = 0; i < recipes.length; i++) {
    const ingredientsRecipe = recipes[i].ingredients
    let arrayIngredients = []
    for (let ingredient of ingredientsRecipe) {
      let oneIgredient = ingredient.ingredient
      arrayIngredients.push(oneIgredient)
    }
    arrayIngredients.forEach(ingr => ALLingredients.push(ingr))
  }
  let allIngredientsUnique = [...new Set(ALLingredients)]
  return allIngredientsUnique
}

// fonction création de chaque li pour chaque ingrédient
function createItem(allIngredientsUnique, ulIngredients) {
  for (let t = 0; t < allIngredientsUnique.length; t++) {
    const li = new Element('li', 'li', 'dropdown__menu__item').elem
    ulIngredients.appendChild(li)
    li.classList.add('dropdown__menu__item--ingredients')
    li.textContent = `${allIngredientsUnique[t]}`
  }
}

// fonction pour déterminer le nombre de lignes à afficher sur 3 colonnes
function columnSize(allIngredientsUnique, ulIngredients) {
  const lenghtList = allIngredientsUnique.length
  const columnSize = Math.round(lenghtList / 3)
  ulIngredients.style.gridTemplateRows = `repeat(${columnSize}, 1fr)`
}

// fonction de tri par ordre alphabétique 
function titleSort(elements) {
  function tri(a,b) {
    const titleA = a.split(' ').join('')
    a = titleA.toLowerCase()
    a.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const titleB = b.split(' ').join('')
    b = titleB.toLowerCase()
    b.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return (a < b) ? -1 : 1
  }
  elements.sort(tri)
}

// fermeture de la dropdown
function closeDropdown() {
  const ulIngredients = document.getElementById('menu-ingredients')
  ingredientsDown.style.display = 'block'
  ingredientsUp.style.display = 'none'
  ulIngredients.innerHTML = ''
  ulIngredients.style.paddingTop = '0rem'
}

export { displayIngredients, closeDropdown }