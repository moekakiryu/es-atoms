import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import type { scalableTextType, useScalableTextOptions } from './ScalableText.types'

// eslint-disable-next-line max-len
export const useScalableText: scalableTextType = <containerType extends HTMLElement, contentType extends HTMLElement>(
  text: string,
  {
    minFontSize = undefined,
  }: useScalableTextOptions = {},
) => {
  const [scaleValue, setScaleValue] = useState(1)

  const containerRef = useRef<containerType>(null)
  const contentRef = useRef<contentType>(null)

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

  // Also resize the element if the window changes size (which could resize the container)
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

  return [containerRef, contentRef, scaleValue]
}
