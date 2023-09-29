import React from 'react'
import ReactDOM from 'react-dom/client'

import './root.css'
import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  React.createElement(
    React.StrictMode,
    {},
    React.createElement(App),
  ),
)
