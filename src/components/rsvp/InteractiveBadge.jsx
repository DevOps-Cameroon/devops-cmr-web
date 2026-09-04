import { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF, useTexture, RenderTexture, Text } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import tagTextureUrl from '@/assets/images/tag_texture.png'
import cardTextureUrl from '@/assets/images/cardtexture.png'

extend({ MeshLineGeometry, MeshLineMaterial })

const segmentProps = {
  type: 'dynamic',
  canSleep: true,
  colliders: false,
  angularDamping: 2,
  linearDamping: 2,
}

const CARD_SCALE_X = 3.85
const CARD_SCALE_Y = 3.85
const CARD_HALF_WIDTH = 0.8 * (CARD_SCALE_X / 2.25)
const CARD_HALF_HEIGHT = 1.125 * (CARD_SCALE_Y / 2.25)
const CARD_MODEL_CLIP_LOCAL_Y = 1.2
const CARD_GROUP_Y_OFFSET = -0.2 * (CARD_SCALE_Y / 2.25)
const CARD_JOINT_Y_OFFSET = CARD_GROUP_Y_OFFSET + CARD_MODEL_CLIP_LOCAL_Y * CARD_SCALE_Y

const BAND_LENGTH_SCALE = 0.2
const BAND_ANCHOR_Y = 3.2
const BAND_SEGMENT_SPACING = 0.5 * BAND_LENGTH_SCALE
const BAND_ROPE_MAX_LENGTH = 1 * BAND_LENGTH_SCALE


function BadgeTextLayer({ date, title, name, location }) {
  return (
    <>
      <Text
        position={[1.55 , 2.35, 0.02]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {date}
      </Text>

      <Text
        position={[-2.72, 1.9, 0.02]}
        fontSize={0.25}
        color="white"
        anchorX="left"
        anchorY="middle"
        maxWidth={3.5}
      >
        {title}
      </Text>

      <Text
        position={[-2.72, -0.92, 0.02]}
        fontSize={0.5}
        color="#3ddc84"
        anchorX="left"
        anchorY="middle"
        maxWidth={3.5}
      >
        {name}
      </Text>

      <Text
        position={[-2.72, -2.0, 0.02]}
        fontSize={0.17}
        color="white"
        anchorX="left"
        anchorY="middle"
        maxWidth={3.5}
      >
        {location}
      </Text>
    </>
  )
}

function DynamicBadgeOverlay({
  geometry,
  date,
  title,
  name,
  location,
}) {
  geometry.computeBoundingBox()

  const box = geometry.boundingBox

  const cardWidth = box.max.x - box.min.x
  const cardHeight = box.max.y - box.min.y

  const centerX = (box.min.x + box.max.x) / 2
  const centerY = (box.min.y + box.max.y) / 2

  // Put the overlay slightly in front of the actual card surface.
  const z = box.max.z + 0.003

  return (
    // <group position={[centerX, centerY, z]}>
      <mesh 
        position={[
          centerX,
          centerY,
          box.max.z + 0.01,
        ]}
      >
        <planeGeometry
          args={[cardWidth, cardHeight]}
        />

        <meshBasicMaterial
          // color="red"
          // opacity={0.5}
          transparent
          depthWrite={false}
          toneMapped={false}
        >
          <RenderTexture
            attach="map"
            width={786}
            height={1008}
            transparent
          >

          {/* NORMALIZED RENDER SPACE */}
          <orthographicCamera
            makeDefault
            position={[0, 0, 10]}
            left={-1}
            right={1}
            top={1}
            bottom={-1}
            near={0.1}
            far={100}
          />

            {/* DEBUG TEXT */}
          {/* <Text
            position={[0, 0, 0]}
            fontSize={0.5}
            color="red"
            anchorX="center"
            anchorY="middle"
          >
            TEST
          </Text> */}

            <BadgeTextLayer
              date={date}
              title={title}
              name={name}
              location={location}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
  )
}

// ── Controller to keep the camera view responsive on screen resize ──────
function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const aspect = size.width / size.height
    // Dynamically expand FOV when screen width decreases to prevent badge clipping
    if (aspect < 1) {
      camera.fov = 25 / aspect
    } else {
      camera.fov = 25
    }
    camera.updateProjectionMatrix()
  }, [size, camera])

  return null
}

function BadgeBand({ date, title, name, location }) {
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
  const cardTexture = useTexture(cardTextureUrl)
  const curve = useRef(new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ])).current
  cardTexture.colorSpace = THREE.SRGBColorSpace
  cardTexture.flipY = false 
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
        <RigidBody position={[0, -BAND_SEGMENT_SPACING, 0]} ref={jointOneRef} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[0, -BAND_SEGMENT_SPACING * 2, 0]} ref={jointTwoRef} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[0, -BAND_SEGMENT_SPACING * 3, 0]} ref={jointThreeRef} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[0, -BAND_SEGMENT_SPACING * 4, 0]} ref={cardRef} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
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
              <meshStandardMaterial
                map={cardTexture}
                roughness={0.4}
                metalness={0.1}
              />
            </mesh>
            <DynamicBadgeOverlay
              geometry={nodes.card.geometry}
              date={date}
              title={title}
              name={name}
              location={location}
            />
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

export default function InteractiveBadge({ event, attendeeName }) {
  const badgeData = {
    date: new Date(event.dateISO).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
    title: event.title.toUpperCase(),
    name: attendeeName.toUpperCase(),
    location: event.venue.toUpperCase(),
  }
  return (
    <div className="h-full min-h-105 w-full sm:min-h-125 lg:min-h-0">
      <Canvas camera={{ position: [0, 1, 13], fov: 25 }} dpr={[1, 2]}>
        <ResponsiveCamera />
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <BadgeBand { ...badgeData } />
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