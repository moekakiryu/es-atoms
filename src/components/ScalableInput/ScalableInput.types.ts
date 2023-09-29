import type React from 'react'

export interface ScalableInputProps {
  id: string
  name: string
  label: string

  placeholder?: string

  minFontSize?: number
  /**
   * This function should accept the new value of the input field and either
   * return a string or undefined.
   *
   * Return values:
   *  * undefined: input is valid
   *  * empty string: input is invalid, but do not show an error message
   *  * <string>: Show <string> as an error message to the user
   */
  validate?: (value: string) => string | undefined
  onKeyDown?: React.EventHandler<React.KeyboardEvent>
}
