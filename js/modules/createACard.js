// import { recipes } from './recipes.js'
import { Element } from './element.js'
function createACard(param) {
  const section = document.querySelector('.section')
  section.style.display = 'grid'
  section.style.justifyContent = 'space-between'

  for (let i = 0; i < param.length; i++) {
    const article = new Element('article', 'article', 'article').elem
    section.appendChild(article)
    article.id = `article-${param[i].id}`
    const anchor = new Element('anchor', 'a', 'article__anchor').elem
    article.appendChild(anchor)
    anchor.href = '#'
    const background = new Element('background', 'div', 'bg').elem
    anchor.appendChild(background)
    const divDescription = new Element('divDescription', 'div', 'description').elem
    anchor.appendChild(divDescription)
    const divTitle = new Element('divTitle', 'div', 'description__title').elem
    divDescription.appendChild(divTitle)
    const title = new Element('title', 'h3', 'description__title__h3').elem
    divTitle.appendChild(title)
    title.textContent = `${param[i].name}`
    const divTime = new Element('divTime', 'div', 'description__title__time').elem
    divTitle.appendChild(divTime)
    const iconTime = new Element('iconTime', 'i', 'far').elem
    divTime.appendChild(iconTime)
    iconTime.classList.add('fa-clock')
    const time = new Element('time', 'p', 'description__title__time__txt').elem
    divTime.appendChild(time)
    time.textContent = `${param[i].time} min`
    const divdescriptionContent = new Element('divdescriptionContent', 'div', 'description__content').elem
    divDescription.appendChild(divdescriptionContent)
    const ulIngredients = new Element('ulIngredients', 'ul', 'ingredientsList').elem
    divdescriptionContent.appendChild(ulIngredients)
    displayIngredients(param[i].ingredients, ulIngredients)
    const description = new Element('description', 'p', 'description__description').elem
    divdescriptionContent.appendChild(description)
    description.textContent = `${param[i].description}`
  }
}
function displayIngredients(ingredients, ulIngredients) {
  for (let ingredient of ingredients) {
    const liIngredient = new Element('liIngredient', 'li', 'ingredientsList__item').elem
    ulIngredients.appendChild(liIngredient)
    const ingredientName = new Element('ingredientName', 'p', 'ingredientsList__item__name').elem
    liIngredient.appendChild(ingredientName)
    ingredientName.innerHTML = `${ingredient.ingredient}`
    const quantity = new Element('quantity', 'p', 'ingredientsList__item__quantity').elem
    liIngredient.appendChild(quantity)
    if (ingredient.quantity != undefined) {
      quantity.innerHTML = '&nbsp' + ':' + ' ' + `${ingredient.quantity}`
    }
    const quantityStr = `${ingredient.quantity}`
    const quantityNb = parseInt(quantityStr)
    const unit = `${ingredient.unit}`
    displayUnit(unit, quantityNb, quantity)
  }
}

function displayUnit(unit, quantityNb, quantity) {
  if (quantityNb <= 1) {
    switch (unit) {
    case ('verres'):
      quantity.innerHTML += ' ' + 'verre'
      break
    case ('sachets'):
      quantity.innerHTML += ' ' + 'sachet'
      break
    case ('gousses'):
      quantity.innerHTML += ' ' + 'gousse'
      break
    case ('tranches'):
      quantity.innerHTML += ' ' + 'tranche'
      break
    case ('pincées'):
      quantity.innerHTML += ' ' + 'pincée'
      break
    case ('feuilles'):
      quantity.innerHTML += ' ' + 'feuille'
      break
    case ('boites'):
      quantity.innerHTML += ' ' + 'boite'
      break
    case ('barquettes'):
      quantity.innerHTML += ' ' + 'barquette'
      break
    case ('tasses'):
      quantity.innerHTML += ' ' + 'tasse'
      break
    case ('tiges'):
      quantity.innerHTML += ' ' + 'tige'
      break
    case ('cuillère à soupe'):
      quantity.innerHTML += ' ' + 'c à s'
      break
    case ('cuillère à café'):
      quantity.innerHTML += ' ' + 'c à c'
      break
    case ('litre'):
      quantity.innerHTML += ' ' + 'L'
      break
    }
  } else {
    switch (unit) {
    case ('grammes'):
      quantity.innerHTML += ' ' + 'gr'
      break
    case ('cuillères à soupe'):
      quantity.innerHTML += ' ' + 'c à s'
      break
    case ('cuillères à café'):
      quantity.innerHTML += ' ' + 'c à c'
      break
    case ('litres'):
      quantity.innerHTML += ' ' + 'L'
      break
    case ('undefined'):
      quantity.innerHTML += ' '
      break
    default:
      quantity.innerHTML += ' ' + ` ${unit}`
    }
  }
}

export { createACard }