import { Center, Environment, Html, Text, Text3D, useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
import { TextureLoader } from 'three';

const Experience = () => {

    const cubeRef = useRef(null);
    // animation
    // useFrame((state, delta) => {
    //     cubeRef.current.rotation.y += delta;
    //     cubeRef.current.rotation.z += delta;
    // })

    // const [texture1, texture2, texture3] = useLoader(TextureLoader, ['https://images.unsplash.com/photo-1696247140045-af2d676c8b4e?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', 'https://plus.unsplash.com/premium_vector-1769957202234-0be3656b2e7e?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', 'https://images.unsplash.com/photo-1566305977571-5666677c6e98?q=80&w=345&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'])

    const { scene } = useGLTF('./newModel.glb')

    return (
        <>

            <mesh ref={cubeRef}>
                <boxGeometry />
                <meshBasicMaterial color={'red'} />


                {/* <Html position={[0, 0, 0]} center >
                    <div className="label">Click me</div>
                </Html> */}

            </mesh>


            {/* <ambientLight intensity={2} color={'white'} />
            <Environment files={'./envMap.hdr'}/>
            <Suspense>
                <primitive object={scene} scale={0.5} />
            </Suspense> */}

            {/* <Text position={[0, 0, 0]} fontSize={0.5} color={'white'}>
                Hello Everyone !
            </Text> */}

            {/* <Center top right>
                <Text3D
                    font="/Satoshi_Regular.json"
                    size={0.5}
                    height={0.1}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.01}
                    bevelSegments={4}
                    curveSegments={12}
                >
                    H3LLO FR!3ND
                    <meshBasicMaterial color="white" />
                </Text3D>
            </Center> */}
        </>
    )
}

export default Experience