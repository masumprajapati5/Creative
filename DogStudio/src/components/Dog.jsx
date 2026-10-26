import React, { useEffect } from 'react'
import * as THREE from 'three';
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Dog = () => {

  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger);


  const model = useGLTF('/models/dog.drc.glb');

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.55;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  })


  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions['Take 001'].play();
  }, [actions]);


  const [normalMap, sampleMatcap] = (useTexture([
    '/dog_normals.jpg',
    '/matcap/mat-2.png'
  ])).map(texture => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });


  const [branchMap, branchNormalMap] = (useTexture([
    '/branches_diffuse.jpeg',
    '/branches_normals.jpeg'])).map(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    });


  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatcap,
  })


  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  })

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  })

  

  return (
    <>
      <primitive object={model.scene} position={[0.25, -0.55, 0]} rotation={[0, Math.PI / 3.9, 0]} />
      <directionalLight position={[0, 5, 5]} intensity={10} color={0xffffff} />
      <OrbitControls />
    </>
  )
}

export default Dog