/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component } from 'react'
import { isEmpty, isEmptyObject } from '../utils/object.js'
import { Portal } from 'react-portal'
import { Key } from '../utils/constants'
import position from '../utils/caret-position'
import SuggestionItem from './suggestion-item'

import styles from './suggestion-portal.scss'
import { currentPath, currentText, currentNode } from '../utils/slate-utils.js'

const VISIBLE = 'visible'
const HIDDEN = 'hidden'

const isSelectKey = keyCode => keyCode === Key.ENTER || keyCode === Key.TAB

class SuggestionPortal extends Component {
  contentRef = React.createRef()

  state = { filteredSuggestions: [] }

  componentDidMount = () => { this.adjustPosition() }
  componentDidUpdate = () => { this.adjustPosition() }

  constructor(props) {
    super()
    const { callback, suggestions, filterSuggestions } = props
    callback.onKeyDown = this.onKeyDown
    callback.isOpen = this.isOpen
    callback.closePortal = this.closePortal
    callback.updateFilteredSuggestion = this.updateFilteredSuggestion
    this.state = {
      selectedIndex: 0,
      filteredSuggestions: (filterSuggestions ? filterSuggestions(suggestions) : suggestions).slice(0, callback.resultSize),
    }
    callback.suggestion = this.state.filteredSuggestions[this.state.selectedIndex]
  }

  setCallbackSuggestion = newIndex => {
    const { callback } = this.props
    const { filteredSuggestions } = this.state
    callback.suggestion = filteredSuggestions.length ? filteredSuggestions[newIndex] : undefined
  }

  setFilteredSuggestions = filteredSuggestions => {
    this.setState({ filteredSuggestions })
    this.setCallbackSuggestion(this.state.selectedIndex)
  }

  nextDownIndex = () => {
    const { filteredSuggestions, selectedIndex } = this.state
    return selectedIndex + 1 === filteredSuggestions.length ? 0 : selectedIndex + 1
  }

  nextUpIndex = () => {
    const { filteredSuggestions, selectedIndex } = this.state
    return (selectedIndex === 0 ? filteredSuggestions.length : selectedIndex) - 1
  }

  updateSelection = newIndex => {
    this.setState({ selectedIndex: newIndex })
    this.setCallbackSuggestion(newIndex)
  }

  updateFilteredSuggestion = editor => {
    this.setState({ selectedIndex: 0 })
    this.setFilteredSuggestions(this.getFilteredSuggestions(editor))
  }

  onEnter = (onEnter, next, suggestion, editor) => {
    if (suggestion) {
      onEnter(suggestion, editor)
    } else { next() }
  }

  onKeyDown = (event, editor, next) => {
    const { keyCode } = event
    const { callback: { suggestion, onEnter } } = this.props
    const { filteredSuggestions } = this.state

    if (this.isOpen() && !isEmpty(filteredSuggestions)) {
      if (keyCode === Key.DOWN) {
        event.preventDefault()
        this.updateSelection(this.nextDownIndex())
      } else if (keyCode === Key.UP) {
        event.preventDefault()
        this.updateSelection(this.nextUpIndex())
      } else if (isSelectKey(keyCode)) {
        event.preventDefault()
        this.closePortal()
        return this.onEnter(onEnter, next, suggestion, editor)
      }
    }

    this.closePortal()
    return next()
  }

  getFilteredSuggestions = editor => {
    const { callback: { resultSize }, suggestions, filterSuggestions } = this.props
    const lowerCaseWord = currentText(editor).text.toLowerCase()

    const currentSuggestions = (suggestions.filter(suggestion => suggestion.toLowerCase().indexOf(lowerCaseWord) !== -1 && suggestion.toLowerCase() !== lowerCaseWord))
    return (filterSuggestions ? filterSuggestions(currentSuggestions) : currentSuggestions).slice(0, resultSize)
  }

  matchTrigger = () => {
    const { callback: { editor }, shouldHandleNode } = this.props
    return !isEmptyObject(editor) && !isEmptyObject(currentPath(editor)) && shouldHandleNode(editor, currentNode(editor))
  }

  isOpen = () => this.contentRef.current.style.visibility === VISIBLE

  adjustPosition = () => {
    const menu = this.contentRef.current

    if (this.matchTrigger()) {
      const pos = position()
      const { scrollX, scrollY } = window
      this.openPortal()
      menu.style.opacity = 1
      menu.style.top = `${pos.top + scrollY}px`
      menu.style.left = `${pos.left + scrollX}px`
    } else {
      this.closePortal()
    }
  }
  openPortal = () => {
    const menu = this.contentRef.current
    menu.style.visibility = VISIBLE
  }
  closePortal = () => {
    const menu = this.contentRef.current
    menu.style.visibility = HIDDEN
  }

  render = () => {
    const { filteredSuggestions, selectedIndex } = this.state
    return (
      <Portal isOpened>
        <div ref={this.contentRef} className={styles.suggestionPortal}>
          <ul>
            {filteredSuggestions.map((suggestion, index) =>
              (<SuggestionItem
                key={suggestion}
                index={index}
                suggestion={suggestion}
                selectedIndex={selectedIndex}
                setSelectedIndex={this.updateSelection}
                callback={this.props.callback}
              />)
            )}
          </ul>
        </div>
      </Portal>
    )
  }
}

export default SuggestionPortal
