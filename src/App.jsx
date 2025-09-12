import React,{ useState } from 'react'

import './App.css'
import MainPage from './Page/MainPage'
import LayOut from './components/LayOut'

function App() {
 

  return (
    <LayOut>
      {<MainPage/>}
    </LayOut>
  )
}

export default App
