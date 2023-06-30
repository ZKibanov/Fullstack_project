/** Возвращает ключ объекта по значению до 2го уровня вложенности. 
 * @param {string} object - объект, в котором ищем.
 * @param {string} path - дополнительный путь вложенности, необязательно.
 * @param {string} value - значение, по которому ищем.
*/

function getKeyByValue(object, path, value) {
    return path 
    ? Object.keys(object).find(key => object[key][path] === value)
    : Object.keys(object).find(key => object[key] === value)
  }

module.exports = {getKeyByValue}