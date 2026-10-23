import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import React from 'react'
import { OrbitControls } from '@react-three/drei';

const Three = () => {
    return (
        <div className='fixed top-0 left-0 z-[60] w-full h-screen'>
            <Canvas>
                {/* <OrbitControls/> */}
                <Experience/>
            </Canvas>
        </div>
    )
}

export default Three