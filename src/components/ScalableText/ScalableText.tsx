import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import cx from 'classnames'

import type { ScalableTextProps } from './ScalableText.types'
import styles from './ScalableText.scss'

function ScalableText({
  text,
  wrap = false,
  minFontSize = undefined,
}: ScalableTextProps): React.ReactNode {
  const [scaleValue, setScaleValue] = useState(1)

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)

  const resizeText = (): void => {
    if (!containerRef.current || !contentRef.current) return

    // Get the container's padding values
    const containerStyle = getComputedStyle(containerRef.current)
    const horizontalPadding = (
      parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight)
    )

    // Get content font size to ensure it never gets too small
    const contentStyle = getComputedStyle(contentRef.current)
    const contentFontSize = parseFloat(contentStyle.fontSize)

    // Get the width of the content box if the container has any padding
    const containerWidth = (containerRef.current.clientWidth - horizontalPadding)
    const contentWidth = contentRef.current.clientWidth

    // Calculate the scale values based on element width and font size
    const minScale = minFontSize !== undefined ? (minFontSize / contentFontSize) : 0

    if (contentWidth > containerWidth) {
      setScaleValue(Math.max(containerWidth / contentWidth, minScale))
      return
    }

    setScaleValue(1)
  }

  useEffect(() => {
    const resizeListener = (): void => {
      resizeText()
    }

    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  useLayoutEffect(() => {
    resizeText()
  }, [
    text,
  ])

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
