import React from 'react'
import Editor from '../example/index'
import { storiesOf } from '@storybook/react'
import AutocompletePlugin from '../auto-complete'
import { replaceCurrentWord, currentText, OBJECT_TYPES, currentPath, NODE_TYPES } from '../utils/slate-utils'
import { Set } from 'immutable'

storiesOf('Slate Dynamic autocomplete', module)
    .add('For each word in the text', () =>
    <Editor
    object={{
      object: 'value',
      isVoid: false,
      document: {
        object: 'document',
        nodes: [
          {
            object: OBJECT_TYPES.block,
            type: NODE_TYPES.BLOCK1,
            nodes: [
              {
                object: 'text',
                text: 'some text'
              }
            ]
          }
        ]
      }
    }}
    plugins={[
      AutocompletePlugin({
        renderPortal: (Portal, props) => {
          const { callback: { editor } } = props
          return editor && currentText(editor) ?
            <Portal {...props} suggestions={[...Array.from(new Set(currentText(editor).text.split(' ')))]} /> :
            <Portal {...props} suggestions={[]} /> },
        resultSize: 3,
        totalText: false,
        shouldHandleNode: () => true,
        onEnter: (suggestion, editor) => {
          replaceCurrentWord(editor, suggestion)
        }
      })
    ]}
    />
  )
