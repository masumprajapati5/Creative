import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

const Three = () => {
  return (
    <div className="absolute inset-0 z-20 w-full h-full touch-none select-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 4.9], fov: 75 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <Experience />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Three