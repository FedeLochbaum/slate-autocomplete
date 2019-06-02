export const nodeByPath = (editor, path) => editor.value.document.getNode(path)
export const currentNode = editor => nodeByPath(editor, parentPath(currentPath(editor)))
export const currentPath = editor => editor.value.selection.focus.path
export const parentPath = path => path.slice(0, -1)
