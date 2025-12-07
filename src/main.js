import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



const canvas = document.querySelector("canvas.webgl")

const sizes = {
    w:window.innerWidth,
    h:window.innerHeight
}
const clock = new THREE.Clock()
const parameters = {
    count: 100000,
} 

const camera = new THREE.PerspectiveCamera(75,sizes.w/sizes.h,0.1,100)
camera.position.y = 5 

const scene = new THREE.Scene()

const bufferGeometry = new THREE.BufferGeometry()
const material = new THREE.PointsMaterial({
    size: 0.01,
    sizeAttenuation:true,
    depthWrite:false,
    blending:THREE.AdditiveBlending,
    vertexColors:true
})

const pointArray = new Float32Array(parameters.count*3)
const colours = new Float32Array(parameters.count * 3)

const insideColor1 = '#ff6030'
const outsideColor1 = '#0077ff'

const insideColor = new THREE.Color(insideColor1)
const outsideColor = new THREE.Color(outsideColor1)
console.log(insideColor)
for(let i = 0; i< parameters.count; i++){
const i3 = i * 3

const radius = Math.random() * 5
const angle =  (i % 3) / 3 * Math.PI * 2 

const randomX = (Math.pow(Math.random(),3)) * (Math.random() <0.5 ? 1 : -1) *  0.25 * radius 
const randomY = (Math.pow(Math.random(),3)) * (Math.random() <0.5 ? 1 : -1)*  2 * Math.log(Math.random(),2) * radius 
const randomZ = (Math.pow(Math.random(),3)) * (Math.random() <0.5 ? 1 : -1)*  0.25 * radius 


pointArray[i3 + 0] =  Math.cos(angle + radius) * radius +  randomZ 
pointArray[i3+  1] =  randomY
pointArray[i3 + 2] =  Math.sin(angle + radius) * radius + randomX


const mixedColor = insideColor.clone()
mixedColor.lerp(outsideColor,radius/5)

colours[i3 + 0] =  mixedColor.r
colours[i3+  1] =  mixedColor.g
colours[i3 + 2] =  mixedColor.b
}

bufferGeometry.setAttribute('position',new THREE.BufferAttribute(pointArray,3))
bufferGeometry.setAttribute('color',new THREE.BufferAttribute(colours, 3))

const points = new THREE.Points(bufferGeometry,material)

scene.add(points)
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.setSize(sizes.w,sizes.h)

window.addEventListener('resize', () => {
sizes.w = window.innerWidth
sizes.h = window.innerHeight

camera.aspect = sizes.w/sizes.h
camera.updateProjectionMatrix()

renderer.setSize(sizes.w,sizes.h)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
}) 


const tick = () => {
const elapsedTime = clock.getDelta()
controls.update()
renderer.render(scene,camera)
requestAnimationFrame(tick)
}
tick()