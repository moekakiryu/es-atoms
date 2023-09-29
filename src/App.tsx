import { MockContainer } from 'components/MockContainer'
import React from 'react'

function App(): React.ReactNode {
  return (
    <MockContainer fillHeight>
      <div>
        Hello, world!
      </div>
    </MockContainer>
  )
}

export default App
