import React from 'react'

import styles from './Block1.scss'

export const Block1 = ({ attributes, children }) =>
  (<div {...attributes} className={styles.block1}>{children}</div>)

