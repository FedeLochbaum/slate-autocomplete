import React from 'react'
import { Block1 } from '../components/Block1/Block1'

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
  block1: Block1
}
