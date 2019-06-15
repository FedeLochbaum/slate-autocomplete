import React from 'react'
import Block from '../components/Block/Block'
import { NODE_TYPES } from '../utils/slate-utils'

export const handlers = {
  onChange: ({ setValue, onChange }) => ({ value }) => {
    setValue(value)
    if (onChange) { onChange(value) }
  },
  renderNode: () => (props, editor, next) => {
    const { type } = props.node
    const Component = componentsByNodeType[type]
    return Component ? <Component {...props} /> : next()
  },
}

const componentsByNodeType = {
  [NODE_TYPES.BLOCK1]: Block
}
