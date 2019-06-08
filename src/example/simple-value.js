/** @jsx h */

import h from 'slate-hyperscript'
import { NODE_TYPES } from '../utils/slate-utils'

export default (
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
