import { Element } from './element.js'
import { normalizeAndLowerCase } from './input.js'
import { displayElementSelected } from './tags.js'
// OUVERTURE ET FERMETURE DES DROPDOWNS // _____ // OUVERTURE ET FERMETURE DES DROPDOWNS //

// fonction ouverture des dropdowns
function openDropdown(event) {
  event.preventDefault
  const target = window.event.target
  let form, buttonOpen, children
  if (target.tagName == 'I') {
    buttonOpen = target.parentNode
    form = buttonOpen.parentNode
    children = form.children
  } else {
    form = target.parentNode
    children = form.children
    buttonOpen = children[2]
  }
  const buttonClose = children[3]
  let id = searchNodeId(buttonOpen)
  placeholder(id)
  const ul = document.getElementById(id)
  const label = children[0]
  const dropdown = form.parentNode
  dropdown.width = 'auto'
  label.style.display = 'none'
  buttonClose.style.display = 'block'
  buttonOpen.style.display = 'none'
  ul.style.display = 'grid'
  ul.classList.add('open')
  const allDropdowns = document.querySelectorAll('.dropdown')
  console.log(allDropdowns)
  const formChildren = form.children
  const input = formChildren[1]
  input.addEventListener('input', (event) => {
    dynamicChoices(event)
  })

}
// fonction fermeture des dropdowns
function closeDropdown() {
  const target = window.event.target
  const buttonClose = target.parentNode
  const form = buttonClose.parentNode
  const children = form.children
  const buttonOpen = children[2]
  const label = children[0]
  const input = children[1]
  label.style.display = 'block'
  input.placeholder = ''
  let id = searchNodeId(buttonClose)
  const ul = document.getElementById(id)
  buttonOpen.style.display = 'block'
  buttonClose.style.display = 'none'
  ul.style.display = 'none'
  ul.classList.remove('open')

}

// Fonction pour afficher le placeholder à l'ouverture de la dropdown
function placeholder(id) {
  let input
  if (id == 'menu-ingredients') {
    input = document.getElementById('ingredients')
    input.placeholder = 'Rechercher un ingrédient'
  }
  if (id == 'menu-appareil') {
    input = document.getElementById('appareil')
    input.placeholder = 'Rechercher un appareil'
  }
  if (id == 'menu-ustensiles') {
    input = document.getElementById('ustensiles')
    input.placeholder = 'Rechercher un ustensile'
  }
}

//Fonction pour retrouver l'id
function searchNodeId(element) {
  if (element.id == 'iconUp-ingredients' || element.id == 'iconDown-ingredients') {
    let id = 'menu-ingredients'
    return id
  } 
  if (element.id == 'iconUp-appareil' || element.id == 'iconDown-appareil') {
    let id = 'menu-appareil'
    return id
  } 
  if (element.id == 'iconUp-ustensiles' || element.id == 'iconDown-ustensiles') {
    let id = 'menu-ustensiles'
    return id
  } 
}

// ACTUALISATION DU CONTENU DES DROPDOWNS // _____ // ACTUALISATION DU CONTENU DES DROPDOWNS // 
let allIngredients
let allAppliance
let allUstensils

// fonction liste des ingrédients sans doublons
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

// fonction liste des appareils sans doublons
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

// fonction liste des ustensiles sans doublons
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

//Fonction tri par ordre alphabétique et affichage en colonnes des éléments
function sortAndDisplayItems(elements, ul) {
  titleSort(elements)
  columnSize(elements, ul)
  createItem(elements, ul)
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

// fonction pour déterminer le nombre de lignes à afficher sur 3 colonnes
function columnSize(elements, ul) {
  const lenghtList = elements.length
  const columnSize = Math.ceil(lenghtList / 3)
  ul.style.gridTemplateRows = `repeat(${columnSize}, 1fr)`
}
// fonction création de chaque li pour chaque element
function createItem(elements, ul) {
  for (let t = 0; t < elements.length; t++) {
    const li = new Element('li', 'li', 'dropdown__menu__item').elem
    ul.appendChild(li)
    li.textContent = `${elements[t]}`
    li.addEventListener('click', () => displayElementSelected())
  }
}

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

function adjustDropdownDisplay(elements, ul, entry) {
  if (entry.length >= 1) {
    let inputText = normalizeAndLowerCase(entry)
    let relatedItems = compareElementsAndEntry(inputText, elements)
    ul.innerHTML = ''
    sortAndDisplayItems(relatedItems, ul)
  } else {
    sortAndDisplayItems(elements, ul)
  }
}

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

export { openDropdown, closeDropdown, noDuplicateIngredients, noDuplicateAppliances, noDuplicateUstensils }