import React, { useState } from 'react'
import cx from 'classnames'

import { useScalableText } from 'components/ScalableText'

import type { ScalableInputProps } from './ScalableInput.types'
import styles from './ScalableInput.scss'

const transformScaleFunc = (scale: string): string => `scale(${scale})`

function ScalableInput({
  id,
  name,
  label,
  placeholder = '',
  minFontSize = undefined,
  validate = (value) => undefined,
  onKeyDown,
}: ScalableInputProps): React.ReactNode {
  const [value, setValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [hasPlaceholder, setHasPlaceholder] = useState<boolean>(placeholder !== '')

  const [
    containerRef,
    contentRef,
    scaleValue,
  ] = useScalableText<HTMLDivElement, HTMLSpanElement>(value, { minFontSize })

  const handleFocus = (): void => {
    contentRef.current?.focus()
  }

  // Handle user entry for the mock input field
  const handleInput = (evt: React.FormEvent<HTMLSpanElement>): void => {
    const target = evt.target as HTMLSpanElement
    const newValue = target.textContent?.trim() ?? ''

    setValue(newValue)
    setHasPlaceholder(placeholder !== '' && newValue === '')
  }

  // Handle validation so only allowed characters can be entered
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLSpanElement>): void => {
    const target = evt.target as HTMLSpanElement
    const newValue = target.textContent?.trim() ?? ''

    const isPrintable = evt.key.length === 1
    let validationError

    switch (evt.key) {
      // Some control characters are able to clear validation messages
      case 'Backspace':
        setErrorMessage('')
        break
      // Don't allow newlines
      case 'Enter':
        evt.preventDefault()
        break
      default:
        // Don't filter out control keys
        if (isPrintable) {
          validationError = validate(newValue + evt.key)
          if (validationError === undefined) {
            setErrorMessage('')
          } else {
            evt.preventDefault()
            setErrorMessage(validationError)
          }
        }
    }

    // Pass through any key listener from props
    onKeyDown && onKeyDown(evt)
  }

  const mockId = `${id}-mock`
  const errorId = `${id}-errormessage`
  const inputId = id

  return (
    <div
      ref={containerRef}
      className={styles.scalableInput}
      onClick={handleFocus}
      onFocus={handleFocus}
    >
      <span
        ref={contentRef}
        contentEditable
        className={cx(styles.mockInputField, {
          [styles.hasPlaceholder]: hasPlaceholder,
        })}
        style={{
          transform: transformScaleFunc(scaleValue.toString()),
        }}
        id={mockId}
        tabIndex={0}
        role="textbox"
        aria-invalid={errorMessage !== ''}
        aria-errormessage={errorId}
        data-placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />

      {errorMessage !== '' && (
        <span
          className={styles.errorMessage}
          id={errorId}
        >
            {errorMessage}
        </span>
      )}

      <label className={styles.visuallyHidden}>
        {label}
        <input
          className={styles.trueInputField}
          id={inputId}
          name={name}
          defaultValue={value}
        />
      </label>
    </div>
  )
}

export default ScalableInput
