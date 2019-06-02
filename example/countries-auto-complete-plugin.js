import AutocompletePlugin from '../src/auto-complete'
import { replaceCurrentText } from '../src/utils/slate-utils'

const suggestions = [
  "Afganistán",
  "Albania",
  "Argentina",
  "España",
  "Estonia",
  "India",
  "Israel",
  "Portugal",
  "Singapur",
  "Turquía",
  "Ucrania",
]

export default AutocompletePlugin({
  suggestions,
  resultSize: 5,
  shouldHandleNode: (editor, currentNode) => true,
  onEnter: (suggestion, editor) => {
    replaceCurrentText(editor, suggestion)
  }
})
