import React from 'react'
import { compose, withProps } from 'recompose'
import classNames from 'classnames'
import { splitMatching } from '../utils/string'

import styles from './highlight-text.scss'

const HighlightText = ({ tokens }) => (tokens ? (
  <div>
    {tokens.map((part, i) => (
      <span key={i} className={classNames({ [styles.matchingToken]: part.isMatch })} >{part.token}</span>
    ))}
  </div>
) : null)

export default compose(
  withProps(({ text, search }) => ({
    tokens: text ? splitMatching(text, search) : undefined
  }))
)(HighlightText)
