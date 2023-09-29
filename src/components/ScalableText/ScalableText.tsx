import React from 'react'
import cx from 'classnames'

import type { ScalableTextProps } from './ScalableText.types'
import styles from './ScalableText.scss'
import { useScalableText } from './hooks'

function ScalableText({
  text,
  wrap = false,
  minFontSize = undefined,
}: ScalableTextProps): React.ReactNode {
  const [
    containerRef,
    contentRef,
    scaleValue,
  ] = useScalableText<HTMLDivElement, HTMLSpanElement>(text, { minFontSize })

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      <span
        ref={contentRef}
        className={cx(styles.content, {
          [styles.nowrap]: !wrap,
        })}
        style={{
          transform: `scale(${scaleValue.toString()})`,
        }}
      >
        {text}
      </span>
    </div>
  )
}

export default ScalableText
