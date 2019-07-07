import React from 'react'
import Editor from '../example/index'
import { storiesOf } from '@storybook/react'
import simpleValue from '../example/simple-value'
import countriesAutoCompletePlugin from './../example/countries-auto-complete-plugin'
import AutocompletePlugin from '../auto-complete'
import { replaceCurrentWord } from '../utils/slate-utils'

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
