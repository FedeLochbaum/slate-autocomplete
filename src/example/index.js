import React from 'react'
import { Editor } from 'slate-react'
import { compose, withState, withHandlers } from 'recompose'
import { handlers } from './handlers'
import { Value } from 'slate'
import './editor.css'

const Example = ({ plugins, value, onChange, renderNode }) => (
  <React.Fragment>
    <Editor
      className="editor"
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
