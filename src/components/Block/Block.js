import React from 'react'

import './Block.css'

export default ({ attributes, children }) =>
  (<div {...attributes} className="block">{children}</div>)

