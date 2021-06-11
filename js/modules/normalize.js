//_________________________________________________________________

/**
 * @function normalizeAndLowerCase
 * transforme la string : minuscules, sans accents
 * @param {String} param 
 * @returns {String}
 */
function normalizeAndLowerCase(param) {
  let a = param.normalize('NFD')
  a = replacements(a)
  let b = a.toLowerCase()
  return b
}
function replacements(str) {
  let a = str.replace(/[\u0300-\u036f]/g, '')
  let b = a.replace(/[œ]/g , 'oe')
  let c = b.replace(/[ÈÉÊË]/g,'E')
  return c
}

//_________________________________________________________________
/**
 * @function clean
 * exclue certains 'petits' mots inutiles pour la recherche dans le tableau des mots-clés/tags
 * @param {Array} array 
 * @returns {Array}
 */
function clean(array) {
  const wordsToExclude = ['et', 'd\'', 'au', 'de', 'la', 'le', 'du', 'en', 'ou', 'l\'', 'a', 'un', 'une', 'avec']
  let arrayEntry = array.filter(x => !wordsToExclude.includes(x))
  return arrayEntry
}


//_________________________________________________________________
export { normalizeAndLowerCase, clean }
