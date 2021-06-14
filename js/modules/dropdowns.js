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
  const ul = document.getElementById(id)
  buttonOpen.style.display = 'none'
  form.style.display = 'flex'
  ul.style.display = 'grid'
  ul.style.transform = 'scaleY(1)'
  const formChildren = form.children
  const input = formChildren[1]
  const buttonClose = formChildren[2]
  input.focus()
  onlyOneDropdownOpen(buttonOpen)
  /**
   * EventListener sur évènement 'keydown' des dropdowns, 
   * si keyCode = 'Escape', alors
   * lancement de la @function close qui ferme la dropdown
   */ 
  dropdown.addEventListener('keydown', (e) => {
    const keyCode = e.code
    if (keyCode === 'Escape') {
      close(buttonClose)
    }
  })
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
        const children = dropdown.children
        const form = children[1]
        const formChildren = form.children
        const divClose = formChildren[2]
        const divCloseChild = divClose.children
        const chevronUp = divCloseChild[0]
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
export { openDropdown, closeDropdown }