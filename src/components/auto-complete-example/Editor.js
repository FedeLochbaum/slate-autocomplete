import React from 'react'
import { Editor } from 'slate'
import countriesAutoCompletePlugin from '../../example/countries-auto-complete-plugin'
import { handlers } from '../../example/handlers'
import initialValue from '../../example/simple-value'

const plugins = [countriesAutoCompletePlugin]

export default () => (
  <React.Fragment>
    <Editor
      value={initialValue}
      plugins={plugins}
      handlers={handlers}
    />
    {plugins.filter(({ component }) => !!component).map(({ component: Comp }, index) => <Comp key={index} />)}
  </React.Fragment>
)
