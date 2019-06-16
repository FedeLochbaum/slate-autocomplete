import { pipe, when, split, test } from 'ramda'

import { toArray } from './object'
import escapeStringRegEx from 'escape-string-regexp'

export const dotSplit = pipe(when(test(/\./), split('.')), toArray)
export const dotSplitTail = str => {
  const idx = str.lastIndexOf('.')
  return str.lastIndexOf('.') > -1 ? str.substring(idx + 1) : str
}

export const NEW_LINE = '\n'

export const containsIgnoreCase = (string, token) => !!string && string.toLowerCase().indexOf(token.toLowerCase()) >= 0

export const splitMatching = (text, searchText) => {
  return text.split(new RegExp(`(${escapeStringRegEx(searchText)})`, 'ig'))
    .filter(part => part !== '')
    .map(part => ({
      token: part,
      isMatch: equalsIgnoreCase(part, searchText)
    }))
}

export const equalsIgnoreCase = (a, b) => a.toUpperCase() === b.toUpperCase()

export const getCurrentWord = (text, index, initialIndex) => {
  if (text[index] === " " || text[index] === undefined) return ""
  if (index < initialIndex) {
    return getCurrentWord(text, index - 1, initialIndex) + text[index]
  }
  if (index > initialIndex) {
    return text[index] + getCurrentWord(text, index + 1, initialIndex)
  }
  return getCurrentWord(text, index - 1, initialIndex) + text[index] + getCurrentWord(text, index + 1, initialIndex)
}
