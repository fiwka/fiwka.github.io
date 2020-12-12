import * as THREE from './three.module.min.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const loader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x3aa5d6)
renderer.outputEncoding = THREE.sRGBEncoding

const video = document.querySelector('video')
video.play()
video.playbackRate = 0.3

const texture = new THREE.VideoTexture(video)
scene.background = texture

window.addEventListener('resize', _ => {
  renderer.setSize(window.innerWidth, window.innerHeight)

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

document.body.appendChild(renderer.domElement)

var model = null

loader.load('models/computer/scene.gltf', gltf => {
  model = gltf.scene

  model.position.y = -2
  model.position.z = -15
  model.rotation.x = 0.5
  model.rotation.y = 1

  const texture = textureLoader.load(
    'models/computer/textures/Material_baseColor.png'
  )
  texture.encoding = THREE.sRGBEncoding
  texture.flipY = false

  model.material = new THREE.MeshPhongMaterial({
    color: 0xff00ff
  })

  scene.add(model)
})

function animate () {
  if (model) model.rotation.y += 0.02
  texture.update()

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}
animate()
