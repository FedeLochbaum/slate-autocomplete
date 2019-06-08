import React from 'react'
import Editor from '../example/index'
import { storiesOf } from '@storybook/react'
import simpleValue from '../example/simple-value'

storiesOf('Slate Autocomplete', module)
  .add('A simple countries autocomplete', () => <Editor value={simpleValue} />)
