/** @jsx h */

import h from 'slate-hyperscript'
import { NODE_TYPES } from '../src/utils/slate-utils'

const initialValue = (
  <value>
    <document>
      <block type={NODE_TYPES.BLOCK1}>
          <text>Hello everybody!</text>
      </block>
      <block type={NODE_TYPES.BLOCK2}>
          <text>Autocomplete text</text>
      </block>
    </document>
  </value>
)

export default initialValue
