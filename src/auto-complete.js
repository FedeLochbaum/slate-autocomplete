import React from 'react'
import Portal from './components/suggestion-portal'
import { currentNode, currentPath } from './utils/slate-utils'

const matchTrigger = (editor, shouldHandleNode) =>
  currentPath(editor) && shouldHandleNode(editor, currentNode(editor))

const autocompletePluginCreator = opts => {
  const { shouldHandleNode, onEnter, renderPortal } = opts
  const callback = { onEnter }

  const shouldNodeComponentUpdate = (previousProps, props, editor, next) => {
    if (matchTrigger(editor, shouldHandleNode)) {
      callback.updateFilteredSuggestion(editor)
    }
    return next()
  }

  const onChange = (editor, next) => {
    callback.editor = editor
    next()
  }

  const onKeyDown = (event, editor, next) => {
    const { closePortal, isOpen } = callback
    if (matchTrigger(editor, shouldHandleNode)) {
      return callback.onKeyDown(event, editor, next)
    } else if (isOpen()) {
      closePortal()
    }

    return next()
  }

  return {
    shouldNodeComponentUpdate,
    onKeyDown,
    component: props => (
      renderPortal ?
        renderPortal(Portal, { ...props, ...opts, callback }) :
        (<Portal {...props} {...opts} callback={callback} />)
    )
  }
}

export default autocompletePluginCreator
