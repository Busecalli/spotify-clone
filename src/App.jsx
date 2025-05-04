import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Player from './components/Player'

function App() {
  return (
    <div className="app">
      <div className="main-container">
        <Sidebar />
        <MainContent />
      </div>
      <Player />
    </div>
  )
}

export default App
