import './style.css'
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { color } from 'three/tsl';

const gui = new GUI();

const property = {
    color: "ff0000",
}

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// scene
const scene = new THREE.Scene();

// const clock = new THREE.Clock()

const timer = new THREE.Timer();

// 3d object - mesh
// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.SphereGeometry(15, 32, 16);
// const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

// custom geometry
// const geometry = new THREE.BufferGeometry();
// const count = 50;
// const positionArray = new Float32Array(count * 3 * 3)

// for (let i = 0; i < count * 3 * 3; i++) {
//     positionArray[i] = (Math.random() - 0.5) * 4
// }

// geometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3))

// material 
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });


const cube = new THREE.Mesh(geometry, material);

// cube.rotation.set(Math.PI / 5, Math.PI / 9, Math.PI / 3)

// gui.add(cube.position, 'x').min(-3).max(3).step(0.01).name('Position X')
// gui.add(cube.position, 'y').min(-3).max(3).step(0.01).name('Position Y')
// gui.add(cube.position, 'z').min(-3).max(3).step(0.01).name('Position Z')

// gui.add(cube, "visible")
// gui.add(material, "wireframe")
// gui.addColor(property, 'color').onChange(() => {
//     material.color.set(property.color)
// })

const positionFolder = gui.addFolder('Position')
const rotationFolder = gui.addFolder('Rotation')

positionFolder.add(cube.position, 'x').min(-3).max(3).step(0.01).name('Position X')
positionFolder.add(cube.position, 'y').min(-3).max(3).step(0.01).name('Position Y')
positionFolder.add(cube.position, 'z').min(-3).max(3).step(0.01).name('Position Z')

rotationFolder.add(cube.rotation, 'x').min(-3).max(3).step(0.01).name('Position X')
rotationFolder.add(cube.rotation, 'y').min(-3).max(3).step(0.01).name('Position Y')
rotationFolder.add(cube.rotation, 'z').min(-3).max(3).step(0.01).name('Position Z')

scene.add(cube);

// camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);

// const camera = new THREE.OrthographicCamera(-2,2,2,-2,0.1,100)

camera.position.z = 3;
camera.lookAt(0, 0, 0)

//renderer

const canvas = document.querySelector("#webgl");

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.1;

window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height);

})

// renderer on

function animate() {
    timer.update()
    controls.update()
    const delta = timer.getDelta()
    // cube.rotation.x += delta
    // cube.rotation.y += delta

    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}

animate();