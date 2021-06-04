import { displayElementSelected } from './tags.js'
import { normalizeAndLowerCase } from './normalize.js'
import { Element } from './element.js'
//_________________________________________________________________

let allIngredients
let allAppliance
let allUstensils

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
  allIngredients = allElementsUnique
  const ul = document.getElementById('menu-ingredients')
  ul.innerHTML = ''
  sortAndDisplayItems(allIngredients, ul)
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
  allAppliance = allElementsUnique
  const ul = document.getElementById('menu-appareil')
  ul.innerHTML = ''
  sortAndDisplayItems(allAppliance, ul)
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
    arrayUstensils.forEach(ingr => ALLelements.push(ingr))
  }
  let allElementsUnique = [...new Set(ALLelements)]
  allUstensils = allElementsUnique
  const ul = document.getElementById('menu-ustensiles')
  ul.innerHTML = ''
  sortAndDisplayItems(allUstensils, ul)
}

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
  const tags = document.querySelectorAll('.elements__item')
  const arrayTags = Array.from(tags)
  for (let t = 0; t < elements.length; t++) {
    const li = new Element('li', 'li', 'dropdown__menu__item').elem
    ul.appendChild(li)
    li.textContent = `${elements[t]}`
    li.addEventListener('click', () => displayElementSelected())
    arrayTags.forEach(tag => {
      if (tag.textContent == li.textContent) {
        li.style.color = 'rgba(255, 255, 255, 0.4)'
        li.style.textDecoration = 'line-through'
      }
    })
  }
}

//_________________________________________________________________
/**
 * @function dynamicChoices
 * fonction d'affichage des éléments en fonction de la saisie dans les inputs des dropdowns
 */

function dynamicChoices() {
  const input = window.event.target
  const entry = input.value
  if (input.id == 'ingredients') {
    const ul = document.getElementById('menu-ingredients')
    adjustDropdownDisplay(allIngredients, ul, entry)
  }
  if (input.id == 'appareil') {
    const ul = document.getElementById('menu-appareil')
    adjustDropdownDisplay(allAppliance, ul, entry)
  }
  if (input.id == 'ustensiles') {
    const ul = document.getElementById('menu-ustensiles')
    adjustDropdownDisplay(allUstensils, ul, entry)
  }
}

//_________________________________________________________________
/**
 * @function adjustDropdownDisplay
 * 
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils   
 * @param {HTMLElement} ul - ul conteneur de la liste  
 * @param {String} entry - saisie dans les inputs dropdown
 */

function adjustDropdownDisplay(elements, ul, entry) {
  if (entry.length >= 1) {
    let inputText = normalizeAndLowerCase(entry)
    let relatedItems = compareElementsAndEntry(inputText, elements)
    ul.innerHTML = ''
    sortAndDisplayItems(relatedItems, ul)
  } else {
    ul.innerHTML = ''
    sortAndDisplayItems(elements, ul)
  }
}

//_________________________________________________________________
/**
 * @function compareElementsAndEntry
 * fonction permettant de n'afficher que les éléments correspondants à la saisie
 * @param {String} entry - saisie dans les inputs dropdown
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils   
 * @returns {Array} - array des éléments correspondants à la saisie
 */

function compareElementsAndEntry(entry, elements) {
  let relatedItems = []
  for (let i = 0; i < elements.length; i++) {
    let ingredient = normalizeAndLowerCase(elements[i])
    if (ingredient.search(entry) != -1) {
      relatedItems.push(elements[i])
    }
  }
  return relatedItems
}

// EXPORTS // _____ // EXPORTS //  _____ // EXPORTS //  ___________
export { noDuplicateIngredients, noDuplicateAppliances, noDuplicateUstensils, dynamicChoices }