import React from 'react'

import { MockContainer } from 'components/MockContainer'
import { ScalableInput } from 'components/ScalableInput'
import { ScalableText } from 'components/ScalableText'

import type { validatorFactory } from './ScalableDemo.types'
import { allowedCharacters } from './ScalableDemo.data'
import styles from './ScalableDemo.scss'

function ScalableDemo(): React.ReactNode {
  const getValidator: validatorFactory = (errorMessage) => (value) => {
    const cleanedName = Array.from(value.trim().toLowerCase())
    const isValid = cleanedName.every(char => allowedCharacters.includes(char))

    if (!isValid) return errorMessage
  }

  const handleSubit: React.EventHandler<React.FormEvent> = (evt) => {
    evt.preventDefault()
    const data = new FormData(evt.target as HTMLFormElement)

    // eslint-disable-next-line no-console
    console.log(Object.fromEntries(data.entries()))
  }

  const resizableTextDemoContent = (
    <>
      <p className={styles.label}>Normal</p>
      <ScalableText
        text={'team_name'}
      />

      <p className={styles.label}>Multiline</p>
      <ScalableText
        text={'There\'s a squirrellongername in my pants'}
        wrap
      />

      <p className={styles.label}>Shrink (short text)</p>
      <ScalableText
        text={'Completed Levels: 0'}
        minFontSize={16}
      />

      <p className={styles.label}>Shrink (long text)</p>
      <ScalableText
        text={'Completed Levels: 99997'}
      />

      <p className={styles.label}>Shrink (min font size)</p>
      <ScalableText
        text={'Completed Levels: 99997'}
        minFontSize={20}
      />
    </>
  )

  const scalableInputDemoContent = (
    <>
      <form
        onSubmit={handleSubit}
      >
        <ScalableInput
          id="teamName"
          label="teamName"
          name="teamName"
          placeholder="Enter team name"
          validate={getValidator('asd')}
        />
        <button>Submit</button>
      </form>
    </>
  )

  return (
    <MockContainer
      fillHeight
      flex
    >
      <div
        style={{
          width: 170,
        }}
      >
        {resizableTextDemoContent}
      </div>
      <div
        style={{
          width: 200,
          background: '#686',
          flexGrow: 1,
          margin: 30,
        }}
      >
        {scalableInputDemoContent}
        <ScalableInput
          id="foo"
          name="foo"
          label="foo"
          placeholder="enter team name"
        />
      </div>
    </MockContainer>
  )
}

export default ScalableDemo
