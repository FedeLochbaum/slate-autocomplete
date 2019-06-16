import React from 'react'
import { Editor } from 'slate-react'
import { compose, withState, withHandlers } from 'recompose'
import { handlers } from './handlers'
import { Value } from 'slate'
import countriesAutoCompletePlugin from './countries-auto-complete-plugin'

const plugins = [countriesAutoCompletePlugin]

const Example = ({ value, onChange, renderNode }) => (
  <React.Fragment>
    <Editor
      value={value}
      plugins={plugins}
      onChange={onChange}
      renderNode={renderNode}
    />
    {plugins.filter(({ component }) => !!component).map(({ component: Comp }, index) => <Comp key={index} />)}
  </React.Fragment>
)

export default compose(
  withState('value', 'setValue', ({ object }) => Value.fromJSON(object)),
  withHandlers(handlers))(Example)
