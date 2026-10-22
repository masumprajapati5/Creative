import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import React from 'react'
import { OrbitControls } from '@react-three/drei';

const Three = () => {
    return (
        <div className='w-full bg-[#ebebeb] h-screen'>
            <Canvas>
                {/* <OrbitControls/> */}
                <Experience/>
            </Canvas>
        </div>
    )
}

export default Three