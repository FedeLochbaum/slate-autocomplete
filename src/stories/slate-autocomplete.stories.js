import React from 'react'
import Editor from '../example/index'
import { storiesOf } from '@storybook/react'
import simpleValue from '../example/simple-value'
import countriesAutoCompletePlugin from './../example/countries-auto-complete-plugin'
import AutocompletePlugin from '../auto-complete'
import { replaceCurrentWord, replaceCurrentText, NODE_TYPES, OBJECT_TYPES } from '../utils/slate-utils'

const titleValue = {
  object: 'value',
  isVoid: false,
  document: {
    object: 'document',
    nodes: [
      {
        object: OBJECT_TYPES.block,
        type: NODE_TYPES.TITLE,
        nodes: [
          {
            object: 'text',
            text: 'Title'
          }
        ]
      },
      {
        object: OBJECT_TYPES.block,
        type: NODE_TYPES.BLOCK1,
        nodes: [
          {
            object: 'text',
            text: 'hi'
          }
        ]
      }
    ]
  }
}

storiesOf('Slate Autocomplete', module)
  .add('A simple countries autocomplete', () =>
    <Editor
    object={simpleValue}
    plugins={[countriesAutoCompletePlugin]}
    />
  )
  .add('A simple autocomplete for each word in the text', () =>
    <Editor
    object={simpleValue}
    plugins={[
      AutocompletePlugin({
        suggestions: [
          "Hi!",
          "guys",
          "Hola!",
          "como estan",
          "how are you"
        ],
        resultSize: 2, // at most 2 suggestions
        totalText: false, // will be applied to each word
        shouldHandleNode: (editor, currentNode) => true,
        onEnter: (suggestion, editor) => {
          replaceCurrentWord(editor, suggestion)
        }
      })
    ]}
    />
  )
  .add('Autocomplete only for title blocks', () => (
    <Editor
    object={titleValue}
    plugins={[
      AutocompletePlugin({
        suggestions: [
          "Title1",
          "Title2",
          "Title3",
          "Titulo1",
          "Titulo2",
          "Titulo3"
        ],
        resultSize: 3,
        totalText: true,
        shouldHandleNode: (editor, { type }) => type === NODE_TYPES.TITLE,
        onEnter: (suggestion, editor) => {
          replaceCurrentText(editor, suggestion)
        }
      })
    ]}
    />
  ))
