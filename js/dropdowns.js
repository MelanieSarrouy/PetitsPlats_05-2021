import { recipes } from './recipes.js'
import { Element } from './element.js'

// fonction ouverture des dropdowns
function openDropdown() {
  const target = window.event.target
  const buttonOpen = target.parentNode
  const nextParentTarget = buttonOpen.nextSibling
  const buttonClose = nextParentTarget.nextSibling
  let id = searchNodeId(buttonOpen)
  const ul = document.getElementById(id)
  buttonClose.style.display = 'block'
  buttonOpen.style.display = 'none'
  ul.style.paddingTop = '1rem'
  ul.innerHTML = ''
  if (id == 'menu-ingredients') {
    const allElementsUnique = noDuplicateIngredients()
    sortAndDisplayItems(allElementsUnique, ul)
  }
  if (id == 'menu-appareil') {
    const allElementsUnique = noDuplicateAppliances()
    sortAndDisplayItems(allElementsUnique, ul)
  }
  if (id == 'menu-ustensiles') {
    const allElementsUnique = noDuplicateUstensils()
    sortAndDisplayItems(allElementsUnique, ul)
  }
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

function sortAndDisplayItems(allElementsUnique, ul) {
  titleSort(allElementsUnique)
  columnSize(allElementsUnique, ul)
  createItem(allElementsUnique, ul)
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
function columnSize(allElementsUnique, ul) {
  const lenghtList = allElementsUnique.length
  const columnSize = Math.ceil(lenghtList / 3)
  ul.style.gridTemplateRows = `repeat(${columnSize}, 1fr)`
}

// fonction création de chaque li pour chaque element
function createItem(allElementsUnique, ul) {
  for (let t = 0; t < allElementsUnique.length; t++) {
    const li = new Element('li', 'li', 'dropdown__menu__item').elem
    li.id = `item-${[t]}`
    ul.appendChild(li)
    li.textContent = `${allElementsUnique[t]}`
    li.addEventListener('click', () => displayElementSelected())
  }
}

// fonction fermeture des dropdowns
function closeDropdown() {
  const target = window.event.target
  const buttonClose = target.parentNode
  const previousParentTarget = buttonClose.previousSibling
  const buttonOpen = previousParentTarget.previousSibling
  let id = searchNodeId(buttonClose)
  const ul = document.getElementById(id)
  buttonOpen.style.display = 'block'
  buttonClose.style.display = 'none'
  ul.innerHTML = ''
  ul.style.paddingTop = '0rem'
}

function searchNodeId(button) {
  if (button.id == 'iconUp-ingredients' || button.id == 'iconDown-ingredients') {
    let id = 'menu-ingredients'
    return id
  } 
  if (button.id == 'iconUp-appareil' || button.id == 'iconDown-appareil') {
    let id = 'menu-appareil'
    return id
  } 
  if (button.id == 'iconUp-ustensiles' || button.id == 'iconDown-ustensiles') {
    let id = 'menu-ustensiles'
    return id
  } 

}

function displayElementSelected() {
  const target = window.event.target
  const content = target.textContent
  const ulTarget = target.parentNode
  const ulTargetId = ulTarget.id
  let ul = selectUl(ulTargetId)
  const li = new Element('li', 'li', 'elements__item').elem
  ul.appendChild(li)
  ul.style.paddingBottom = '0.5rem'
  li.id = `element-${target.id}`
  li.textContent = content
  const icon = new Element('icon', 'i', 'far').elem
  icon.classList.add('fa-times-circle', 'elements__item__icon')
  li.appendChild(icon)
  icon.addEventListener('click', () => closeSelectedBloc())

}

function selectUl(ulTargetId) {
  if (ulTargetId == 'menu-ingredients') {
    const ul = document.querySelector('.elements--ingredients')
    return ul
  }
  if (ulTargetId == 'menu-appareil') {
    const ul = document.querySelector('.elements--appareil')
    return ul
  }
  if (ulTargetId == 'menu-ustensiles') {
    const ul = document.querySelector('.elements--ustensiles')
    return ul
  }
}

function closeSelectedBloc() {
  const target = window.event.target
  const parentTarget = target.parentNode
  parentTarget.style.display = 'none'
}

export { openDropdown, closeDropdown }