import type React from 'react'

export interface useScalableTextOptions {
  minFontSize?: number
}

export type useScalableTextType = (
  <containerType extends HTMLElement, contentType extends HTMLElement>(
    text: string,
    options?: useScalableTextOptions
  ) => [
    React.RefObject<containerType>,
    React.RefObject<contentType>,
    number
  ]
)

export interface ScalableTextProps {
  text: string
  minFontSize?: number
  wrap?: boolean
  className?: string
}
