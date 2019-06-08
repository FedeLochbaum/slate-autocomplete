export const nodeByPath = (editor, path) => editor.value.document.getNode(path)
export const currentNode = editor => nodeByPath(editor, parentPath(currentPath(editor)))
export const currentPath = editor => editor.value.selection.focus.path
export const parentPath = path => path.slice(0, -1)
export const currentText = editor => nodeByPath(editor, currentPath(editor))
export const selectInRanges = (editor, start, end) => {
  editor.moveAnchorTo(start)
  editor.moveFocusTo(end)
}
export const replaceCurrentText = (editor, textValue) => {
  const { text } = currentText(editor)
  selectInRanges(editor, 0, text.length)
  editor.insertText(textValue)
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
