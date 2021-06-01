// TAGS // _____ // TAGS // _____ // TAGS // _____ // TAGS // _____ // TAGS // _____ 
import { recipesDisplayed } from '../index.js'
import { recipes } from './recipes.js'
import { normalizeAndLowerCase, findRecipes } from './input.js'
import { Element } from './element.js'
// import { closeDropdown } from './dropdowns.js'


//Fonction affichage des tags sélectionnés
function displayElementSelected() {
  const target = window.event.target
  const content = target.textContent
  const ulTarget = target.parentNode
  const ulTargetId = ulTarget.id
  const ul = selectUl(ulTargetId)
  const dropdown = ulTarget.parentNode
  const children = dropdown.children
  const form = children[0]
  const formChildren = form.children
  const label = formChildren[0]
  label.style.display = 'block'
  const input = formChildren[1]
  input.placeholder = ''
  const buttonOpen = formChildren[2]
  const buttonClose = formChildren[3]
  ulTarget.style.display = 'none'
  buttonOpen.style.display = 'block'
  buttonClose.style.display = 'none'

  const li = new Element('li', 'li', 'elements__item').elem
  ul.appendChild(li)
  li.textContent = content
  const icon = new Element('icon', 'i', 'far').elem
  icon.classList.add('fa-times-circle', 'elements__item__icon')
  li.appendChild(icon)
  let allLi = ul.children
  twinSearch(allLi, li)

  let allTags = findTagsDisplayed()
  let filteredRecipes = recipesDisplayed()

  findRecipes(allTags, filteredRecipes)
  filteredRecipes = recipesDisplayed()

  const result = document.querySelector('.header2__result')
  result.innerHTML = `<span class="header2__result__bold">${filteredRecipes.length}</span> recette(s) trouvée(s)`
  icon.addEventListener('click', () => closeSelectedBloc())

}
function findTagsDisplayed() {
  let allTags = []

  const divTags = document.querySelector('.header2__selected')
  const allUl = divTags.children
  const ulIngredientsTags = allUl[0]
  const ulAppliancesTags = allUl[1]
  const ulUstensilsTags = allUl[2]

  const allLiIngredientsTags = ulIngredientsTags.children
  let ingredientsTags = Array.from(allLiIngredientsTags)
  ingredientsTags.forEach(li => {
    let licontent = li.textContent
    let liNormalized = normalizeAndLowerCase(licontent)
    allTags.push(liNormalized)
  })
  const allLiAppliancesTags = ulAppliancesTags.children
  let appliancesTags = Array.from(allLiAppliancesTags)
  appliancesTags.forEach(li => {
    let licontent = li.textContent
    let liNormalized = normalizeAndLowerCase(licontent)
    allTags.push(liNormalized)
  })
  const allLiUstensilsTags = ulUstensilsTags.children
  let ustensilsTags = Array.from(allLiUstensilsTags)
  ustensilsTags.forEach(li => {
    let licontent = li.textContent
    let liNormalized = normalizeAndLowerCase(licontent)
    allTags.push(liNormalized)
  })
  return allTags
}

//Fonction pour éviter les doublons de tags
function twinSearch(allLi, li) {
  const liArray = allLi.length - 1
  for (let i = 0; i < liArray; i++) {
    if (allLi[i].textContent == li.textContent) {
      li.remove()
    }
  }
}
//Fonction pour retrouver l'ul
function selectUl(elem) {
  if (elem == 'menu-ingredients') {
    const ul = document.querySelector('.elements--ingredients')
    return ul
  }
  if (elem == 'menu-appareil') {
    const ul = document.querySelector('.elements--appareil')
    return ul
  }
  if (elem == 'menu-ustensiles') {
    const ul = document.querySelector('.elements--ustensiles')
    return ul
  }
}
//Fonction de fermeture des tags
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
  findRecipes(allTags, recipes)
  let filteredRecipes = recipesDisplayed()
  const result = document.querySelector('.header2__result')
  result.innerHTML = `<span class="header2__result__bold">${filteredRecipes.length}</span> recette(s) trouvée(s)`
}


export { displayElementSelected, findTagsDisplayed }