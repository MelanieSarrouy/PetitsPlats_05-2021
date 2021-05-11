import { recipes } from './recipes.js'

import { Element } from './element.js'

createACard()

function createACard() {
  const section = document.querySelector('.section')
  for (let i = 0; i < recipes.length; i++) {
    const article = new Element('article', 'article', 'article').elem
    section.appendChild(article)
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
    title.textContent = `${recipes[i].name}`
    const divTime = new Element('divTime', 'div', 'description__title__time').elem
    divTitle.appendChild(divTime)
    const iconTime = new Element('iconTime', 'i', 'far').elem
    divTime.appendChild(iconTime)
    iconTime.classList.add('fa-clock')
    const time = new Element('time', 'p', 'description__title__time__txt').elem
    divTime.appendChild(time)
    time.textContent = `${recipes[i].time} min`
    const divdescriptionContent = new Element('divdescriptionContent', 'div', 'description__content').elem
    divDescription.appendChild(divdescriptionContent)
    const ulIngredients = new Element('ulIngredients', 'ul', 'ingredientsList').elem
    divdescriptionContent.appendChild(ulIngredients)
    displayIngredients(recipes[i].ingredients, ulIngredients)
    const description = new Element('description', 'p', 'description__description').elem
    divdescriptionContent.appendChild(description)
    description.textContent = `${recipes[i].description}`
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
    if (ingredient.unit != undefined) {
      quantity.innerHTML += ' ' + ` ${ingredient.unit}`
    }

    // if (ingredient.unit == 'grammes') {
    //   quantity.replace('grammes', 'g')
    // }

  }
}