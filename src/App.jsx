import React, { useState } from 'react'
import './App.css'

import data from 'https://raw.githubusercontent.com/RuckusLabs/dylandimaggio.com/refs/heads/main/public/database.json';

function App() {

  return (
    <>
      <h1>Data List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
