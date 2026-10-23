import React from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const Dog = () => {

  const model = useGLTF('/models/dog.drc.glb');

  useThree(({camera, scene, gl}) => {
    console.log(camera.position)
    camera.position.z = 0.55; 
  })

  return (
    <>
      <primitive object={model.scene} position={[0.25, -0.55, 0]} rotation={[0, Math.PI/3.9, 0]} />
      <directionalLight position={[0, 5, 5]} intensity={10} color={0xffffff} />
      <OrbitControls />
    </>
  )
}

export default Dog