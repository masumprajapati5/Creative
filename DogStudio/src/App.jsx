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
      <main>
        <Canvas style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundImage: "url('/background-l.png')", backgroundSize: 'cover', backgroundrepeat: 'no-repeat'}}>
          <Dog />
        </Canvas>
        <section id='section-1'></section>
        <section id='section-2'></section>
        <section id='section-3'></section>
      </main>
    </>
  )
}

export default App
