import { Element } from './element.js'
//_________________________________________________________________

let allIngredients
let allAppliance
let allUstensils

//_________________________________________________________________
/**
 * @function noDuplicateDropdownsElements
 * fonction de non duplication des éléments dans chaque dropdown
 * @param {Array} param - recettes
 */

function noDuplicateDropdownsElements(param) {
  allIngredients = noDuplicateIngredients(param)
  const ulMenuIngredients = document.getElementById('menu-ingredients')
  ulMenuIngredients.innerHTML = ''
  sortAndDisplayItems(allIngredients, ulMenuIngredients)

  allAppliance = noDuplicateAppliances(param) 
  const ulMenuAppliances = document.getElementById('menu-appareil')
  ulMenuAppliances.innerHTML = ''
  sortAndDisplayItems(allAppliance, ulMenuAppliances)

  allUstensils = noDuplicateUstensils(param) 
  const ulMenuUstensils = document.getElementById('menu-ustensiles')
  ulMenuUstensils.innerHTML = ''
  sortAndDisplayItems(allUstensils, ulMenuUstensils)
}

//_________________________________________________________________
/**
 * @function noDuplicateIngredients
 * fonction liste des ingrédients sans doublons
 * @param {Array} param - recettes
 */

function noDuplicateIngredients(param) {
  let ALLelements = []
  for (let i = 0; i < param.length; i++) {
    const ingredientsRecipe = param[i].ingredients
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

//_________________________________________________________________
/**
 * @function noDuplicateAppliances
 * fonction liste des appareils sans doublons
 * @param {Array} param - recettes
 */

function noDuplicateAppliances(param) {
  let ALLelements = []
  for (let i = 0; i < param.length; i++) {
    const applianceRecipe = param[i].appliance
    ALLelements.push(applianceRecipe)
  }
  let allElementsUnique = [...new Set(ALLelements)]
  return allElementsUnique
}

//_________________________________________________________________
/**
 * @function noDuplicateUstensils
 * fonction liste des ustensiles sans doublons
 * @param {Array} param - recettes
 */

function noDuplicateUstensils(param) {
  let ALLelements = []
  for (let i = 0; i < param.length; i++) {
    const ustensilsRecipe = param[i].ustensils
    let arrayUstensils = []
    for (let ustensil of ustensilsRecipe) {
      let oneUstensil = ustensil
      arrayUstensils.push(oneUstensil)
    }
    arrayUstensils.forEach(ust => ALLelements.push(ust))
  }
  let allElementsUnique = [...new Set(ALLelements)]
  return allElementsUnique
}

//_________________________________________________________________
//_________________________________________________________________
/**
 * @function sortAndDisplayItems
 * fonction tri par ordre alphabétique et affichage en colonnes des éléments
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils
 * @param {HTMLElement} ul - ul conteneur de la liste
 */

function sortAndDisplayItems(elements, ul) {
  titleSort(elements)
  columnSize(elements, ul)
  createItem(elements, ul)
}

//_________________________________________________________________
/**
 * @function titleSort
 * fonction de tri par ordre alphabétique 
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils 
 */

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

//_________________________________________________________________
/**
 * @function columnSize
 * fonction pour déterminer le nombre de lignes à afficher sur 3 colonne
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils 
 * @param {HTMLElement} ul - ul conteneur de la liste 
 */

function columnSize(elements, ul) {
  const lenghtList = elements.length
  const columnSize = Math.ceil(lenghtList / 3)
  ul.style.gridTemplateRows = `repeat(${columnSize}, 1fr)`
}

//_________________________________________________________________
/**
 * @function createItem
 * fonction création de chaque li pour chaque element
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils  
 * @param {HTMLElement} ul - ul conteneur de la liste 
 */

function createItem(elements, ul) {
  for (let t = 0; t < elements.length; t++) {
    const li = new Element('li', 'li', 'dropdown__menu__item').elem
    ul.appendChild(li)
    li.textContent = `${elements[t]}`
    li.tabIndex = '0'
  }
}

//_________________________________________________________________
export { noDuplicateDropdownsElements }