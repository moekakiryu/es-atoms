import React from 'react'
import cx from 'classnames'

import type { MockContainerProps } from './MockContainer.types'
import styles from './MockContainer.scss'

function MockContainer({
  fillHeight,
  children,
}: MockContainerProps): React.ReactNode {
  return (
    <div
      className={cx(styles.mockContainer, {
        [styles.fill]: fillHeight,
      })}
    >
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default MockContainer
