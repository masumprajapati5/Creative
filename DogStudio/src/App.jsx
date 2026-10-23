import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Dog from './components/Dog'
import { Canvas } from '@react-three/fiber'

function App() {

  return (
    <>
      <Canvas>
        <Dog />
      </Canvas>
    </>
  )
}

export default App
