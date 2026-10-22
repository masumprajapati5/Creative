import { Center, Environment, Html, Text, Text3D, useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
import { DoubleSide, TextureLoader } from 'three';
import { useControls } from 'leva';

const Experience = () => {

    const cubeRef = useRef(null);

    const materialRef = useRef(null);

    // animation
    useFrame((state, delta) => {
        if (materialRef) {
            materialRef.current.uniforms.uTime.value += delta;
        }
        // cubeRef.current.rotation.y += delta;
        // cubeRef.current.rotation.z += delta;
    })

    // const [texture1, texture2, texture3] = useLoader(TextureLoader, ['https://images.unsplash.com/photo-1696247140045-af2d676c8b4e?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', 'https://plus.unsplash.com/premium_vector-1769957202234-0be3656b2e7e?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', 'https://images.unsplash.com/photo-1566305977571-5666677c6e98?q=80&w=345&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'])

    const { scene } = useGLTF('./newModel.glb')

    // const { x, y, z } = useControls("Position", {
    //     x: { value: 0, min: -5, max: 5, step: 0.01 },
    //     y: { value: 0, min: -5, max: 5, step: 0.01 },
    //     z: { value: 0, min: -5, max: 5, step: 0.01 }
    // })

    return (
        <>

            <mesh >
                <planeGeometry />
                <shaderMaterial side={DoubleSide} ref={materialRef}
                    vertexShader={`

                    uniform float uTime;

                    void main(){
                        vec3 pos = position;
                        // water wave effect
                        pos.z += sin(pos.y * 5.0 + uTime) * 0.1;
                        pos.z += sin(pos.x * 5.0 + uTime) * 0.1;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);                    }
                    `}
                    fragmentShader={`
                        void main(){
                            gl_FragColor = vec4(0.0,0.0,1.0,1.0);
                        }
                        `}

                    uniforms={{
                        uTime: { value: 0 }
                    }}
                />


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