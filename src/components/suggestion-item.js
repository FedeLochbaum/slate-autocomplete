import React, { Component } from 'react'
import HighlightText from './highlight-text'
import './suggestion-item.css'
import { currentPath, currentText, currentWord } from '../utils/slate-utils'

class SuggestionItem extends Component {
  onClick = event => {
    const { suggestion, callback: { closePortal, onEnter, editor } } = this.props
    event.preventDefault()
    event.stopPropagation()
    if (editor) {
      closePortal()
      onEnter(suggestion, editor)
      editor.focus()
    }
  }
  onMouseEnter = () => this.props.setSelectedIndex(this.props.index)

  currentText = () => {
    const { callback: { editor }, totalText } = this.props
    return editor && currentPath(editor) ? totalText ? currentText(editor).text : currentWord(editor) : ''
  }

  render = () => {
    const { index, selectedIndex, suggestion } = this.props
    return (
      <li
        className={index === selectedIndex ? 'selected' : 'input'}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
      >
        <HighlightText text={suggestion} search={this.currentText()} />
      </li>
    )
  }
}

export default SuggestionItem
