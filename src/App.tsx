import { MockContainer } from 'components/MockContainer'
import { ScalableInput } from 'components/ScalableInput'
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

  console.log(Object.fromEntries(data.entries()))
}

function App(): React.ReactNode {
  return (
    <MockContainer fillHeight>
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
      <div>
        Hello, world!
      </div>
    </MockContainer>
  )
}

export default App
