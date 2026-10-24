import { useEffect, useMemo, useRef, useState } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'

const IMAGE_URL = [
  "https://images.unsplash.com/photo-1774606570918-aa9d70b2932b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1774523195578-121a2d1da490?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773772255047-74744067601e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1749303544314-cb8ec06223d5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1775119221769-6b0af28704ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1775563655673-c28ac3802166?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

const TOTAL_CARD = IMAGE_URL.length
const LERP_RATIO = 0.06

const Card = ({
  index,
  texture,
  scrollSpeedRef,
  radius,
  cardW,
  cardH,
  interactionRef,
}) => {
  const navigate = useNavigate()
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const angle = (index / TOTAL_CARD) * 2 * Math.PI
  const position = useMemo(() => {
    const x = radius * Math.sin(angle)
    const z = radius * Math.cos(angle)
    return [x, 0, z]
  }, [angle, radius])

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uScrollSpeed: { value: 0 },
    }),
    [texture]
  )

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'default'
    }
  }, [])

  useFrame(() => {
    if (!materialRef.current) return
    const clampedSpeed = THREE.MathUtils.clamp(
      scrollSpeedRef.current,
      -0.2,
      0.2
    )
    materialRef.current.uniforms.uScrollSpeed.value = clampedSpeed

    if (meshRef.current) {
      const targetScale = hovered ? 1.05 : 1.0
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, 1.0),
        0.1
      )
    }
  })

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerLeave = () => {
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  const handleClick = (e) => {
    e.stopPropagation()
    // Do not navigate if user was actively dragging
    if (interactionRef.current.hasDragged) return
    document.body.style.cursor = 'default'
    navigate(`/project/${index}`)
  }

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      position={position}
      rotation={[0, angle, 0]}
    >
      <planeGeometry args={[cardW, cardH, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

const Experience = () => {
  const textures = useTexture(IMAGE_URL)
  const groupRef = useRef(null)
  const { gl, viewport } = useThree()

  const currentRotationRef = useRef(0)
  const targetRotationRef = useRef(0)

  const scrollSpeedRef = useRef(0)
  const targetScrollSpeedRef = useRef(0)

  const mouseMoveRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })

  const interactionRef = useRef({
    isDown: false,
    startX: 0,
    lastX: 0,
    hasDragged: false,
  })

  // Responsive radius and dimensions based on viewport width
  const isMobile = viewport.width < 5.5
  const radius = isMobile ? 2.3 : 3.2
  const cardW = isMobile ? 2.5 : 2.0
  const cardH = isMobile ? 1.0 : 1.2

  // Optimize textures
  useEffect(() => {
    textures.forEach((tex) => {
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.colorSpace = THREE.SRGBColorSpace
      tex.needsUpdate = true
    })
  }, [textures])

  // Wheel listener
  useEffect(() => {
    const canvas = gl.domElement
    if (!canvas) return

    const handleWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY * 0.00035
      targetRotationRef.current += delta
      targetScrollSpeedRef.current += delta
    }

    canvas.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      canvas.removeEventListener('wheel', handleWheel)
    }
  }, [gl])

  // Pointer drag and touch listener
  useEffect(() => {
    const canvas = gl.domElement
    if (!canvas) return

    const handlePointerDown = (e) => {
      interactionRef.current.isDown = true
      interactionRef.current.startX = e.clientX
      interactionRef.current.lastX = e.clientX
      interactionRef.current.hasDragged = false
    }

    const handlePointerMove = (e) => {
      if (!interactionRef.current.isDown) return
      const deltaX = e.clientX - interactionRef.current.lastX
      const totalMoved = Math.abs(e.clientX - interactionRef.current.startX)

      if (totalMoved > 6) {
        interactionRef.current.hasDragged = true
      }

      const rotationDelta = deltaX * 0.0035
      targetRotationRef.current -= rotationDelta
      targetScrollSpeedRef.current -= rotationDelta
      interactionRef.current.lastX = e.clientX
    }

    const handlePointerUp = () => {
      interactionRef.current.isDown = false
      setTimeout(() => {
        interactionRef.current.hasDragged = false
      }, 50)
    }

    canvas.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [gl])

  // Parallax tilt listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Animation frame loop
  useFrame(() => {
    if (!groupRef.current) return

    // Subtle idle drift if not dragging
    if (!interactionRef.current.isDown && Math.abs(targetScrollSpeedRef.current) < 0.001) {
      targetRotationRef.current += 0.0006
    }

    // Smooth rotation lerp
    currentRotationRef.current +=
      (targetRotationRef.current - currentRotationRef.current) * LERP_RATIO
    scrollSpeedRef.current +=
      (targetScrollSpeedRef.current - scrollSpeedRef.current) * LERP_RATIO

    groupRef.current.rotation.y = currentRotationRef.current

    // Smooth parallax mouse tilt
    mouseMoveRef.current.x +=
      (targetMouseRef.current.x - mouseMoveRef.current.x) * 0.05
    mouseMoveRef.current.y +=
      (targetMouseRef.current.y - mouseMoveRef.current.y) * 0.05

    groupRef.current.rotation.x = -mouseMoveRef.current.y * 0.12
    groupRef.current.rotation.z = mouseMoveRef.current.x * 0.06

    // Dampen scroll speed
    targetScrollSpeedRef.current *= 0.8
  })

  return (
    <group ref={groupRef}>
      {textures.map((texture, idx) => (
        <Card
          key={idx}
          index={idx}
          texture={texture}
          scrollSpeedRef={scrollSpeedRef}
          radius={radius}
          cardW={cardW}
          cardH={cardH}
          interactionRef={interactionRef}
        />
      ))}
    </group>
  )
}

export default Experience