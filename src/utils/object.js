export const isEmpty = array => !array || array.length === 0
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0
export const emptyObjectToArray = obj => (isEmptyObject(obj) ? [] : obj)
export const toArray = o => (Array.isArray(o) ? o : [o])
