import { getCurrentWord } from "./string"

export const nodeByPath = (editor, path) => editor.value.document.getNode(path)
export const currentNode = editor => nodeByPath(editor, parentPath(currentPath(editor)))
export const currentFocus = editor => editor.value.selection.focus
export const currentPath = editor => editor.value.selection.focus.path
export const parentPath = path => path.slice(0, -1)
export const currentText = editor => nodeByPath(editor, currentPath(editor))
export const selectInRanges = (editor, start, end) => {
  editor.moveAnchorTo(start)
  editor.moveFocusTo(end)
}

export const currentWord = editor => {
  const { offset } = currentFocus(editor)
  return getCurrentWord(currentText(editor).text, offset - 1, offset - 1)
}

export const replaceCurrentText = (editor, textValue) => {
  const { text } = currentText(editor)
  selectInRanges(editor, 0, text.length)
  editor.insertText(textValue)
}

const expandSelectionLeftWhile = (editor, func) => {
  while (func() && editor.value.selection.start.offset > 0) {
    editor.moveStartTo(editor.value.selection.start.offset - 1)
  }
}

const expandSelectionRightWhile = (editor, func) => {
  const { text } = currentText(editor)
  while (func() && editor.value.selection.end.offset < text.length) {
    editor.moveEndTo(editor.value.selection.end.offset + 1)
  }
}

export const expandStartToNextSpace = editor => {
  const func = () => {
    const { text } = currentText(editor)
    const { offset } = editor.value.selection.start
    return text[offset] !== ' '
  }
  expandSelectionLeftWhile(editor, func)
  const { offset: currentOffset } = editor.value.selection.start
  if (currentOffset !== 0) { editor.moveStartTo(currentOffset + 1) }
}

export const expandEndToNextSpace = editor => {
  const func = () => {
    const { text } = currentText(editor)
    const { offset } = editor.value.selection.end
    return text[offset] !== ' '
  }
  expandSelectionRightWhile(editor, func)
}

export const expandSelectionToSpaces = editor => {
  expandStartToNextSpace(editor)
  expandEndToNextSpace(editor)
}

export const replaceCurrentWord = (editor, suggestion) => {
  expandSelectionToSpaces(editor)
  editor.insertText(suggestion)
}

export const NODE_TYPES = {
  BLOCK1: 'block1',
  BLOCK2: 'block2'
}

export const OBJECT_TYPES = {
  block: 'block',
  inline: 'inline',
  text: 'text',
  leaf: 'leaf',
  document: 'document',
  value: 'value',
}
