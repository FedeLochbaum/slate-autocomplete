import React from 'react'
import Portal from './suggestion-portal'
import { mount } from 'enzyme'
import { Value, Editor } from 'slate'
import { replaceCurrentText, currentText } from '../utils/slate-utils'
import { Key } from '../utils/constants'

const editorWithValue = value => new Editor({
  onChange: jest.fn(),
  readOnly: false,
  value: Value.fromJSON(value)
})

describe('SuggestionPortal', () => {
  const onEnter = (suggestion, editor) => {
    replaceCurrentText(editor, suggestion)
  }

  const state = Value.fromJSON({})
  const editor = editorWithValue({})
  const callback = { onEnter, editor }
  const suggestions = ['one', 'two', 'three']
  const shouldHandleNode = () => true
  const props = {
    callback,
    suggestions,
    shouldHandleNode,
    state,
  }

  const wrapped = mount(<Portal {...props} />)

  describe('#setCallbackSuggestion', () => {
    const instance = wrapped.instance()
    instance.setCallbackSuggestion(1)
    it('should update the current suggestion', () => {
      const { suggestion } = instance.props.callback
      expect(suggestion).toEqual('two')
    })
  })

  describe('#getFilteredSuggestions', () => {
    const instance = wrapped.instance()
    const nEditor = editorWithValue('tw')
    it('should return an array of new suggestions', () => {
      expect(instance.getFilteredSuggestions(nEditor)).toEqual(['two'])
    })
  })

  describe('#nextDownIndex', () => {
    describe('when the current index is first one', () => {
      const instance = wrapped.instance()
      it('should update the index to next one', () => {
        instance.setState({
          selectedIndex: 0,
        })
        expect(instance.nextDownIndex()).toEqual(1)
      })
    })

    describe('when the current index is last one', () => {
      const instance = wrapped.instance()
      it('should update the index to first one', () => {
        instance.setState({
          selectedIndex: suggestions.length - 1,
        })
        expect(instance.nextDownIndex()).toEqual(0)
      })
    })
  })

  describe('#nextUpIndex', () => {
    describe('when the current index is last one', () => {
      const instance = wrapped.instance()
      it('should update the index to next one', () => {
        instance.setState({
          selectedIndex: suggestions.length - 1,
        })
        const { selectedIndex } = instance.state
        expect(instance.nextUpIndex()).toEqual(selectedIndex - 1)
      })
    })

    describe('when the current index is first one', () => {
      const instance = wrapped.instance()
      it('should update the index to first one', () => {
        instance.setState({
          selectedIndex: 0,
        })
        expect(instance.nextUpIndex()).toEqual(suggestions.length - 1)
      })
    })
  })

  describe('#matchTrigger', () => {
    describe('when the current node is a actor name', () => {
      const instance = wrapped.instance()
      it('should return true', () => {
        expect(instance.matchTrigger()).toEqual(true)
      })
    })

    describe('when the current node is not a actor name', () => {
      it('should return false', () => {
        const newState = Value.fromJSON({})
        const newWrapped = mount(<Portal {...props} />)
        const instance = newWrapped.instance()
        expect(instance.matchTrigger()).toEqual(false)
      })
    })
  })

  describe('#onKeyDown', () => {
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() }
    const next = jest.fn()
    const instance = wrapped.instance()
    const nEditor = editorWithValue('tw')
    describe('when press UP key', () => {
      it('should update the selectedIndex', () => {
        instance.setState({
          filteredSuggestions: suggestions,
          selectedIndex: 1,
        })
        instance.onKeyDown({ ...event, keyCode: Key.UP }, nEditor, next)
        expect(instance.state.selectedIndex).toEqual(0)
      })
    })
    describe('when press DOWN key', () => {
      it('should update the selectedIndex', () => {
        instance.setState({
          filteredSuggestions: suggestions,
          selectedIndex: 0,
        })
        instance.onKeyDown({ ...event, keyCode: Key.DOWN }, nEditor, next)
        expect(instance.state.selectedIndex).toEqual(1)
      })
    })
    describe('when press ENTER key', () => {
      it('should update the current actor name with suggestion', () => {
        instance.setState({
          filteredSuggestions: suggestions,
          selectedIndex: 0,
        })
        const { callback: { suggestion } } = instance.props
        instance.onKeyDown({ ...event, keyCode: Key.ENTER }, nEditor, next)
        expect(currentText(nEditor).text).toEqual(suggestion)
      })
    })

    describe('when press TAB key', () => {
      it('should update the current actor name with suggestion', () => {
        instance.setState({
          filteredSuggestions: suggestions,
          selectedIndex: 0,
        })
        const { callback: { suggestion } } = instance.props
        instance.onKeyDown({ ...event, keyCode: Key.TAB }, nEditor, next)
        expect(currentText(nEditor).text).toEqual(suggestion)
      })
    })
  })
})
