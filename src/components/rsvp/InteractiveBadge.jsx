import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import tagTextureUrl from '@/assets/images/tag_texture.png'

extend({ MeshLineGeometry, MeshLineMaterial })

const segmentProps = {
  type: 'dynamic',
  canSleep: true,
  colliders: false,
  angularDamping: 2,
  linearDamping: 2,
}

// ── Card proportions, tuned to match the tall/narrow badge in the Vercel
//    reference image (roughly a 0.65 width:height ratio) instead of the
//    wider default. Everything below derives from these two numbers so
//    the visual mesh, its collider, and its lanyard attach point all stay
//    in sync — changing only CARD_SCALE_X/Y is enough to retune further.
const CARD_SCALE_X = 3.85
const CARD_SCALE_Y = 3.85
const CARD_HALF_WIDTH = 0.8 * (CARD_SCALE_X / 2.25)
const CARD_HALF_HEIGHT = 1.125 * (CARD_SCALE_Y / 2.25)
const CARD_GROUP_Y_OFFSET = -0.2 * (CARD_SCALE_Y / 2.25)
const CARD_JOINT_Y_OFFSET = 1.45 * (CARD_SCALE_Y / 2.25)

// ── Band length, scaled as one unit so the anchor height, each rope
//    segment's max length, and the initial seed spacing all shrink
//    together — changing them independently would either leave slack
//    in the rope or start the sim from a mismatched pose.
const BAND_LENGTH_SCALE = 0.6
const BAND_ANCHOR_Y = 4.6 * BAND_LENGTH_SCALE
const BAND_SEGMENT_SPACING = 0.5 * BAND_LENGTH_SCALE
const BAND_ROPE_MAX_LENGTH = 1 * BAND_LENGTH_SCALE

function BadgeBand() {
  const bandRef = useRef(null)
  const fixedRef = useRef(null)
  const jointOneRef = useRef(null)
  const jointTwoRef = useRef(null)
  const jointThreeRef = useRef(null)
  const cardRef = useRef(null)
  const [dragged, setDragged] = useState(false)
  const [hovered, setHovered] = useState(false)
  const dragOffset = useRef(new THREE.Vector3())
  const pointerPosition = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const angularVelocity = useRef(new THREE.Vector3())
  const rotation = useRef(new THREE.Vector3())
  const tagTexture = useTexture(tagTextureUrl)
  const curve = useRef(new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ])).current
  const { nodes } = useGLTF('/assets/3d/card.glb')

  useRopeJoint(fixedRef, jointOneRef, [[0, 0, 0], [0, 0, 0], BAND_ROPE_MAX_LENGTH])
  useRopeJoint(jointOneRef, jointTwoRef, [[0, 0, 0], [0, 0, 0], BAND_ROPE_MAX_LENGTH])
  useRopeJoint(jointTwoRef, jointThreeRef, [[0, 0, 0], [0, 0, 0], BAND_ROPE_MAX_LENGTH])
  useSphericalJoint(jointThreeRef, cardRef, [[0, 0, 0], [0, CARD_JOINT_Y_OFFSET, 0]])

  useEffect(() => {
    document.body.style.cursor = hovered ? (dragged ? 'grabbing' : 'grab') : 'auto'
    return () => { document.body.style.cursor = 'auto' }
  }, [dragged, hovered])

  useFrame((state, delta) => {
    if (!fixedRef.current || !jointOneRef.current || !jointTwoRef.current || !jointThreeRef.current || !bandRef.current || !cardRef.current) return

    if (dragged) {
      pointerPosition.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      direction.current.copy(pointerPosition.current).sub(state.camera.position).normalize()
      pointerPosition.current.add(direction.current.multiplyScalar(state.camera.position.length()))
      ;[cardRef, jointOneRef, jointTwoRef, jointThreeRef, fixedRef].forEach((ref) => ref.current?.wakeUp())
      cardRef.current.setNextKinematicTranslation({
        x: pointerPosition.current.x - dragOffset.current.x,
        y: pointerPosition.current.y - dragOffset.current.y,
        z: pointerPosition.current.z - dragOffset.current.z,
      })
    }

    const lerpJoint = (ref) => {
      const current = new THREE.Vector3().copy(ref.current.translation())
      return current.lerp(ref.current.translation(), delta * 30)
    }
    curve.points[0].copy(jointThreeRef.current.translation())
    curve.points[1].copy(lerpJoint(jointTwoRef))
    curve.points[2].copy(lerpJoint(jointOneRef))
    curve.points[3].copy(fixedRef.current.translation())
    bandRef.current.geometry.setPoints(curve.getPoints(32))

    angularVelocity.current.copy(cardRef.current.angvel())
    rotation.current.copy(cardRef.current.rotation())
    cardRef.current.setAngvel({
      x: angularVelocity.current.x,
      y: angularVelocity.current.y - rotation.current.y * 0.25,
      z: angularVelocity.current.z,
    }, false)
  })

  curve.curveType = 'chordal'
  tagTexture.wrapS = tagTexture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, BAND_ANCHOR_Y, 0]}>
        <RigidBody ref={fixedRef} {...segmentProps} type="fixed" />
        <RigidBody position={[BAND_SEGMENT_SPACING, 0, 0]} ref={jointOneRef} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[BAND_SEGMENT_SPACING * 2, 0, 0]} ref={jointTwoRef} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[BAND_SEGMENT_SPACING * 3, 0, 0]} ref={jointThreeRef} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[BAND_SEGMENT_SPACING * 4, 0, 0]} ref={cardRef} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[CARD_HALF_WIDTH, CARD_HALF_HEIGHT, 0.01]} />
          <group
            scale={[CARD_SCALE_X, CARD_SCALE_Y, 2.25]}
            position={[0, CARD_GROUP_Y_OFFSET, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={(event) => {
              event.stopPropagation()
              event.target.setPointerCapture(event.pointerId)
              dragOffset.current.copy(event.point).sub(new THREE.Vector3().copy(cardRef.current.translation()))
              setDragged(true)
            }}
            onPointerUp={(event) => {
              event.target.releasePointerCapture(event.pointerId)
              setDragged(false)
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial color="#20262b" clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh geometry={nodes.clip.geometry}>
              <meshStandardMaterial color="#b9c3c5" metalness={0.9} roughness={0.28} />
            </mesh>
            <mesh geometry={nodes.clamp.geometry}>
              <meshStandardMaterial color="#b9c3c5" metalness={0.9} roughness={0.28} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={bandRef}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={new THREE.Vector2(2, 1)}
          useMap={1}
          map={tagTexture}
          repeat={new THREE.Vector2(-3, 1)}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

export default function InteractiveBadge() {
  return (
    <div className="h-full min-h-105 w-full sm:min-h-125 lg:min-h-0">
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }} dpr={[1, 2]}>
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <BadgeBand />
        </Physics>
        <Environment background={false}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/assets/3d/card.glb')