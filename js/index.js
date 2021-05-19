import { createACard } from './createACard.js'
import { openDropdown, closeDropdown } from './dropdowns.js'

createACard()

const iconDown = document.querySelectorAll('.iconDown')
iconDown.forEach(icon => {
  icon.addEventListener('click', (event) => {
    openDropdown(event)
  })
})

const iconUp = document.querySelectorAll('.iconUp')
iconUp.forEach(icon => {
  icon.addEventListener('click', (event) => {
    closeDropdown(event)
  })
})




