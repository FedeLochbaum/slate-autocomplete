import React from 'react'

import { storiesOf } from '@storybook/react'
import SlateEditor from '../example/index'

storiesOf('Autocomplete/countries', module)
.add('plain text suggestions', () => (
  <SlateEditor />
))
