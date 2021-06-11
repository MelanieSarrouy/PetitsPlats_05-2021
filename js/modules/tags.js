import { recipesDisplayed, displayResultnumber, allRecipes } from '../index.js'
import { findRecipes } from './findRecipes.js'
import { Element } from './element.js'
import { normalizeAndLowerCase } from './normalize.js'
import { result } from './input.js'
//_________________________________________________________________

/**
 * @function displayElementSelected
 * fonction d'affichage des tags
 */

function displayElementSelected() {
  const target = window.event.target
  const content = target.textContent
  const ulTarget = target.parentNode
  const ulTargetId = ulTarget.id
  const ul = selectUl(ulTargetId)
  const dropdown = ulTarget.parentNode
  const children = dropdown.children
  const form = children[1]
  const formChildren = form.children
  const input = formChildren[1]
  input.value = ''
  const buttonOpen = children[0]
  buttonOpen.style.display = 'flex'
  form.style.display = 'none'
  ulTarget.style.display = 'none'
  dropdown.classList.remove('open')
  const li = new Element('li', 'li', 'elements__item').elem
  ul.appendChild(li)
  li.textContent = content
  li.tabIndex = '0'
  li.focus()
  const icon = new Element('icon', 'i', 'far').elem
  icon.classList.add('fa-times-circle', 'elements__item__icon')
  icon.tabIndex = '0'
  li.appendChild(icon)
  let allLi = ul.children
  twinSearch(allLi, li)
  let allTags = findTagsDisplayed()
  const mainInput = document.getElementById('search')
  const entry = mainInput.value
  const arrayEntry = entry.split(' ')
  arrayEntry.forEach(word => {
    allTags.push(word)
  })
  const section = document.querySelector('.section')
  if (section.style.display === 'grid') {
    result(allTags, allRecipes)
  } else {
    allTags = findTagsDisplayed()
    result(allTags, allRecipes)
    const mainInput = document.getElementById('search')
    mainInput.value = ''
  }
  /**
   * EventListener sur évènements 'click' et 'keydown' des icones de fermeture des tags, 
   * lancement de la @function closeSelectedBloc qui permet
   * de fermer le(s) tag(s)
   */ 
  icon.addEventListener('click', () => closeSelectedBloc())
  icon.addEventListener('keydown', (e) => {
    const keyCode = e.code
    if (keyCode === 'Enter') {
      closeSelectedBloc()
    }
  })

}

//_________________________________________________________________
/**
 * @function findTagsDisplayed
 * fonction permettant de récupérer un array de tous les tags affichés
 * @returns {Array} - array de tous les tags affichés
 */

function findTagsDisplayed() {
  let allTags = []
  const divTags = document.querySelector('.header2__selected')
  const allUl = divTags.children
  const ulIngredientsTags = allUl[0]
  const ulAppliancesTags = allUl[1]
  const ulUstensilsTags = allUl[2]
  const allLiIngredientsTags = ulIngredientsTags.children
  let ingredientsTags = pushTag(allLiIngredientsTags)
  const allLiAppliancesTags = ulAppliancesTags.children
  let appliancesTags = pushTag(allLiAppliancesTags)
  let tempArray = ingredientsTags.concat(appliancesTags)
  const allLiUstensilsTags = ulUstensilsTags.children
  let ustensilsTags = pushTag(allLiUstensilsTags)
  allTags = tempArray.concat(ustensilsTags)
  return allTags
}

//_________________________________________________________________
/**
 * @function pushTag
 * fonction permettant de créer un seul array regroupant 
 * tous les ingrédients, appareil et ustensils présents en tags
 * @param {Array} elements - ingrédients, appareil ou ustensils présents en tags
 * @returns {Array} - array de chaque élément
 */
function pushTag(elements) {
  let allTags = []
  let elementsTags = Array.from(elements)
  elementsTags.forEach(li => {
    let licontent = li.textContent
    let liNormalized = normalizeAndLowerCase(licontent)
    allTags.push(liNormalized)
  })
  return allTags
}

//_________________________________________________________________
/**
 * @function twinSearch
 * Fonction pour éviter les doublons de tags
 * @param {HTMLCollection} allLi - tous les li des tags ingrédients, appareils ou ustensiles
 * @param {HTMLElement} li 
 */

function twinSearch(allLi, li) {
  const liArray = allLi.length - 1
  for (let i = 0; i < liArray; i++) {
    if (allLi[i].textContent == li.textContent) {
      li.remove()
    }
  }
}

//_________________________________________________________________
/**
 * @function selectUl
 * fonction pour retrouver l'ul
 * @param {String} str - id de l'ul de la dropdown
 * @returns {HTMLElement} - ul des tags
 */

function selectUl(str) {
  if (str == 'menu-ingredients') {
    const ul = document.querySelector('.elements--ingredients')
    return ul
  }
  if (str == 'menu-appareil') {
    const ul = document.querySelector('.elements--appareil')
    return ul
  }
  if (str == 'menu-ustensiles') {
    const ul = document.querySelector('.elements--ustensiles')
    return ul
  }
}

//_________________________________________________________________
/**
 * @function closeSelectedBloc
 * fonction de fermeture des tags
 */

function closeSelectedBloc() {
  const target = window.event.target
  const parentTarget = target.parentNode
  parentTarget.remove()
  let allTags = findTagsDisplayed()
  const mainInput = document.getElementById('search')
  const entry = mainInput.value
  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    let arrayEntry = inputText.split(' ')
    arrayEntry.forEach(elem => {
      allTags.push(elem)
    })
  }
  findRecipes(allTags, allRecipes)
  let filteredRecipes = recipesDisplayed()
  displayResultnumber(filteredRecipes)
}


//_________________________________________________________________
export { displayElementSelected, findTagsDisplayed }