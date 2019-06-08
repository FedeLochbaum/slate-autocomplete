import React from 'react'
import { Editor } from 'slate'
import countriesAutoCompletePlugin from '../../example/countries-auto-complete-plugin'
import { compose, withState, withHandlers } from 'recompose'
import { handlers } from '../../example/handlers'
import { prop } from 'ramda'

const plugins = [countriesAutoCompletePlugin]

const Example = ({ value, onChange }) => (
  <React.Fragment>
    <Editor
      value={value}
      plugins={plugins}
      onChange={onChange}
    />
    {plugins.filter(({ component }) => !!component).map(({ component: Comp }, index) => <Comp key={index} />)}
  </React.Fragment>
)

export default compose(withState('value', 'setValue', prop('value')), withHandlers(handlers))(Example)
