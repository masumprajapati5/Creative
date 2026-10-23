import React, { useEffect, useRef } from 'react'
import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import fragmentShader from '../shaders/fragment.glsl';
import vertexShader from '../shaders/vertex.glsl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
gsap.registerPlugin(useGSAP);

const IMAGE_URL = [
    "https://images.unsplash.com/photo-1774606570918-aa9d70b2932b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1774523195578-121a2d1da490?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1773772255047-74744067601e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1749303544314-cb8ec06223d5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1775119221769-6b0af28704ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1775563655673-c28ac3802166?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const CARD_H = 1.1;
const CARD_W = 2;
const RADIUS = 3;
const TOTAL_CARD = IMAGE_URL.length;
const LERP_RATIO = 0.05;


const Card = ({ index, texture, scrollSpeedRef }) => {

    const angle = (index / TOTAL_CARD) * 2 * Math.PI;
    const position = useMemo(() => {
        const x = RADIUS * Math.sin(angle);
        const z = RADIUS * Math.cos(angle);

        return [x, 0, z];
    })

    const uniforms = {
        uTexture: { value: texture },
        uScrollSpeed: { value: 0 },
    }

    const materialRef = useRef(null);

    useFrame(() => {
        if (!materialRef.current) return;

        materialRef.current.uniforms.uScrollSpeed.value = scrollSpeedRef.current;
    })

    return (
        <mesh position={position} rotation={[0, angle, 0]}>
            <planeGeometry args={[CARD_W, CARD_H, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                side={THREE.DoubleSide}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader} />
        </mesh>
    )
}


const Experience = () => {

    const textures = useTexture(IMAGE_URL);

    const groupRef = useRef(null);

    const currentRotationRef = useRef(0);
    const targetRotationRef = useRef(0);

    const scrollSpeedRef = useRef(0);
    const targetScrollSpeedRef = useRef(0);

    const mouseMoveRef = useRef({ x: 0, y: 0 });
    const targetMouseRef = useRef({ x: 0, y: 0 });

    const { gl } = useThree();



    useEffect(() => {

        const canvas = gl.domElement;

        const handleScroll = (e) => {
            e.preventDefault();
            targetRotationRef.current += e.deltaY * 0.0003;
            targetScrollSpeedRef.current = e.deltaY * 0.0003;
        }

        canvas.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            canvas.removeEventListener('wheel', handleScroll);
        }
    }, [gl])


    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        })
    })


    useGSAP(() => {
        gsap.to(mouseMoveRef.current, {
            x: targetMouseRef.current.x * 0.05,
            y: targetMouseRef.current.y * 0.05,
            duration: 0.6,
            ease: 'power2.out'
        })
    })


    useFrame(() => {
        if (!groupRef.current) return;

        currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * LERP_RATIO;

        scrollSpeedRef.current += (targetScrollSpeedRef.current - scrollSpeedRef.current) * LERP_RATIO;

        groupRef.current.rotation.y = currentRotationRef.current;

        groupRef.current.rotation.x += (-targetMouseRef.current.x * 0.3 - groupRef.current.rotation.x) * 0.5;

        groupRef.current.rotation.z += (targetMouseRef.current.y * 0.3 - groupRef.current.rotation.z) * 0.3;

        targetScrollSpeedRef.current *= 0.8;
    })


    useMemo(() => {
        textures.forEach((tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.colorSpace = THREE.SRGBColorSpace;
        })
    }, [textures])

    return <>

        <group ref={groupRef}>
            {textures.map((texture, idx) => {
                return <Card scrollSpeedRef={scrollSpeedRef} index={idx} texture={texture} />;
            })}
        </group>

    </>

}

export default Experience