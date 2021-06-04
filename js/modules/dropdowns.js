import { dynamicChoices } from './contentsOfDropdowns.js'
//_________________________________________________________________

/**
 * @function openDropdown
 * fonction d'ouverture des dropdowns
 * @param {MouseEvent} event 
 */

function openDropdown(event) {
  event.preventDefault
  const target = window.event.target
  let form, buttonOpen
  if (target.tagName == 'I') {
    buttonOpen = target.parentNode
  } else {
    buttonOpen = target
  }
  let dropdown = buttonOpen.parentNode
  let dropdownChildren = dropdown.children
  form = dropdownChildren[1]
  let id = searchNodeId(buttonOpen)
  placeholder(id)
  const ul = document.getElementById(id)
  buttonOpen.style.display = 'none'
  form.style.display = 'flex'
  ul.style.display = 'grid'
  const formChildren = form.children
  const input = formChildren[1]
  dynamicChoices()

  input.addEventListener('input', (event) => {
    dynamicChoices(event)
  })
  
  onlyOneDropdownOpen(buttonOpen)
}

//_________________________________________________________________
/**
 * @function onlyOneDropdownOpen
 * fonction permettant de n'avoir qu'une seule dropdown ouverte à la fois
 * @param {HTMLElement} elem 
 */

function onlyOneDropdownOpen(elem) {
  const buttonOpen = elem
  const dropdownTarget = buttonOpen.parentNode
  dropdownTarget.classList.add('open')
  const filters = dropdownTarget.parentNode
  const dropdowns = filters.children
  const arrayDropdowns = Array.from(dropdowns)
  arrayDropdowns.forEach(dropdown => {
    if (dropdown != dropdownTarget) {
      if (dropdown.classList.contains('open') == true) {
        let children = dropdown.children
        let form = children[1]
        let formChildren = form.children
        let divClose = formChildren[2]
        let divCloseChild = divClose.children
        let chevronUp = divCloseChild[0]
        close(chevronUp)
      }
    }
  })
}

//_________________________________________________________________
/**
 * @function closeDropdown
 * fonction de fermeture des dropdowns
 */

function closeDropdown() {
  const target = window.event.target
  close(target)
}

/**
 * @function close
 * fonction de fermeture des dropdowns en fonctions de target
 * @param {HTMLElement} target 
 */

function close(target) {
  let buttonClose
  if (target.tagName == 'I') {
    buttonClose = target.parentNode
  } else {
    buttonClose = target
  }
  const form = buttonClose.parentNode
  const dropdown = form.parentNode
  const dropdownChildren = dropdown.children
  const buttonOpen = dropdownChildren[0]
  form.style.display = 'none'
  let id = searchNodeId(buttonClose)
  const ul = document.getElementById(id)
  buttonOpen.style.display = 'flex'
  ul.style.display = 'none'
  dropdown.classList.remove('open')
}

//_________________________________________________________________
/**
 * @function searchNodeId
 * fonction pour récupérer l'id de l'élément
 * @param {HTMLElement} element 
 * @returns 
 */

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

//_________________________________________________________________
/**
 * @function placeholder
 * fonction pour afficher le bon placeholder à l'ouverture de la dropdown
 * @param {String} id 
 */

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

// EXPORTS // _____ // EXPORTS //  _____ // EXPORTS //  ___________
export { openDropdown, closeDropdown }