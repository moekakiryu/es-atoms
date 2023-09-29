import { MockContainer } from 'components/MockContainer'
import { ScalableInput } from 'components/ScalableInput'
import { ScalableText } from 'components/ScalableText'
import React from 'react'

const allowedCharacters = Array.from('abcdefghijklmnopqrstuvwxyz -_1234567890')

// Example of validation function
const validateTeamName = (name: string): string | undefined => {
  const cleanedName = Array.from(name.trim().toLowerCase())
  const isValid = cleanedName.every(char => allowedCharacters.includes(char))

  if (!isValid) return 'Team names can only include numbers and letters'
}

const handleSubit = (evt: React.FormEvent<HTMLFormElement>): void => {
  evt.preventDefault()
  const data = new FormData(evt.target as HTMLFormElement)

  // eslint-disable-next-line no-console
  console.log(Object.fromEntries(data.entries()))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const longText = (
  'This is some very long text that should hopefully not wrap but instead scale to a smaller size'
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockupForm = (
  <form
    onSubmit={handleSubit}
  >
    <ScalableInput
      id="teamName"
      label="teamName"
      name="teamName"
      placeholder="Enter team name"
      validate={validateTeamName}
    />
    <button>Submit</button>
  </form>
)

const pStyle = {
  marginBottom: 4,
  paddingBottom: 2,
  borderBottom: '1px solid #888',
  fontWeight: 'bold',
  color: '#888',
}

function App(): React.ReactNode {
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
        <p style={pStyle}>Normal</p>
        <ScalableText
          text={'team_name'}
        />
        <p style={pStyle}>Multiline</p>
        <ScalableText
          text={'There\'s a squirrellongername in my pants'}
          wrap
          // minFontSize={16}
        />

        <p style={pStyle}>Shrink (short text)</p>
        <ScalableText
          text={'Completed Levels: 0'}
          minFontSize={16}
        />

        <p style={pStyle}>Shrink (long text)</p>
        <ScalableText
          text={'Completed Levels: 99997'}
        />

        <p style={pStyle}>Shrink (min font size)</p>
        <ScalableText
          text={'Completed Levels: 99997'}
          minFontSize={20}
        />
      </div>
      <div
        style={{
          background: '#686',
          flexGrow: 1,
          margin: 30,
        }}
      >
        Hello, world!
      </div>
    </MockContainer>
  )
}

export default App
