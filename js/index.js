import { createACard } from './createACard.js'
// import { displayIngredients, closeDropdown } from './dropdowns.js'

createACard()

const ingredientsDown = document.getElementById('iconDown-ingredients')
const ingredientsUp = document.getElementById('iconUp-ingredients')

const applianceDown = document.getElementById('iconDown-appareil')
const applianceUp = document.getElementById('iconUp-appareil')

const ustensilsDown = document.getElementById('iconDown-ustensiles')
const ustensilsUp = document.getElementById('iconUp-ustensiles')

ingredientsDown.addEventListener('click', () => displayIngredients())
ingredientsUp.addEventListener('click', () => closeDropdownIngredients())

applianceDown.addEventListener('click', () => displayAppliances())
applianceUp.addEventListener('click', () => closeDropdownAppliances())

ustensilsDown.addEventListener('click', () => displayUstensils())
ustensilsUp.addEventListener('click', () => closeDropdownUstensils())

// export { ingredientsDown, ingredientsUp }
import { recipes } from './recipes.js'
import { Element } from './element.js'

function sortAndDisplayItems(allElementsUnique, ul) {
  titleSort(allElementsUnique)
  columnSize(allElementsUnique, ul)
  createItem(allElementsUnique, ul)
}

//fonction affichage des ingrédients
function displayIngredients() {
  const ul = document.getElementById('menu-ingredients')
  ingredientsDown.style.display = 'none'
  ingredientsUp.style.display = 'block'
  ul.style.paddingTop = '1rem'
  const allElementsUnique = noDuplicateIngredients()
  sortAndDisplayItems(allElementsUnique, ul)
}

//fonction affichage des appareils
function displayAppliances() {
  const ul = document.getElementById('menu-appareil')
  applianceDown.style.display = 'none'
  applianceUp.style.display = 'block'
  ul.style.paddingTop = '1rem'
  const allElementsUnique = noDuplicateAppliances()
  sortAndDisplayItems(allElementsUnique, ul)
}

//fonction affichage des appareils
function displayUstensils() {
  const ul = document.getElementById('menu-ustensiles')
  applianceDown.style.display = 'none'
  applianceUp.style.display = 'block'
  ul.style.paddingTop = '1rem'
  const allElementsUnique = noDuplicateUstensils()
  sortAndDisplayItems(allElementsUnique, ul)
}


// fonction liste des ingrédients sans doublons
function noDuplicateIngredients() {
  let ALLelements = []
  for (let i = 0; i < recipes.length; i++) {
    const ingredientsRecipe = recipes[i].ingredients
    let arrayIngredients = []
    for (let ingredient of ingredientsRecipe) {
      let oneIgredient = ingredient.ingredient
      arrayIngredients.push(oneIgredient)
    }
    arrayIngredients.forEach(ingr => ALLelements.push(ingr))
  }
  let allElementsUnique = [...new Set(ALLelements)]
  return allElementsUnique
}

// fonction liste des appareils sans doublons
function noDuplicateAppliances() {
  let ALLelements = []
  for (let i = 0; i < recipes.length; i++) {
    const applianceRecipe = recipes[i].appliance
    ALLelements.push(applianceRecipe)
  }
  let allElementsUnique = [...new Set(ALLelements)]
  return allElementsUnique
}

// fonction liste des ustensiles sans doublons
function noDuplicateUstensils() {
  let ALLelements = []
  for (let i = 0; i < recipes.length; i++) {
    const ustensilsRecipe = recipes[i].ustensils
    let arrayUstensils = []
    for (let ustensil of ustensilsRecipe) {
      let oneUstensil = ustensil
      arrayUstensils.push(oneUstensil)
    }
    arrayUstensils.forEach(ingr => ALLelements.push(ingr))
  }
  let allElementsUnique = [...new Set(ALLelements)]
  return allElementsUnique
}


// fonction création de chaque li pour chaque ingrédient
function createItem(allElementsUnique, ul) {
  for (let t = 0; t < allElementsUnique.length; t++) {
    const li = new Element('li', 'li', 'dropdown__menu__item').elem
    ul.appendChild(li)
    // li.classList.add('dropdown__menu__item--ingredients')
    li.textContent = `${allElementsUnique[t]}`
  }
}

// fonction pour déterminer le nombre de lignes à afficher sur 3 colonnes
function columnSize(allElementsUnique, ul) {
  const lenghtList = allElementsUnique.length
  const columnSize = Math.ceil(lenghtList / 3)
  ul.style.gridTemplateRows = `repeat(${columnSize}, 1fr)`
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
function closeDropdownIngredients() {
  const ul = document.getElementById('menu-ingredients')
  ingredientsDown.style.display = 'block'
  ingredientsUp.style.display = 'none'
  ul.innerHTML = ''
  ul.style.paddingTop = '0rem'
}
function closeDropdownAppliances() {
  const ul = document.getElementById('menu-appareil')
  applianceDown.style.display = 'block'
  applianceUp.style.display = 'none'
  ul.innerHTML = ''
  ul.style.paddingTop = '0rem'
}
function closeDropdownUstensils() {
  const ul = document.getElementById('menu-ustensiles')
  ustensilsDown.style.display = 'block'
  ustensilsUp.style.display = 'none'
  ul.innerHTML = ''
  ul.style.paddingTop = '0rem'
}


