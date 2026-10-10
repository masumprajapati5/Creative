import './style.css'
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const gui = new GUI();

const property = {
    color: "ff0000",
}

const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
    console.log("All Texture Is Loaded")
}

const textureLoader = new THREE.TextureLoader(loadingManager);

const texture = textureLoader.load('https://plus.unsplash.com/premium_vector-1713175694153-2c53d9899744?q=80&w=410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    () => {
        console.log('Texture Loaded')
    }, () => {
        console.log('Progress')
    }, () => {
        console.log('Error')
    }
)

texture.minFilter = THREE.LinearFilter
texture.magFilter = THREE.NearestFilter


const rockTextureColor = textureLoader.load('./marble_cliff_01_diff_1k.jpg')

rockTextureColor.colorSpace = THREE.SRGBColorSpace

const matcapTexture = textureLoader.load('./image.png')

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

let mixer;

const gltfLoader = new GLTFLoader();

gltfLoader.load('./newModel.glb', (gltf) => {
    const model = gltf.scene

    model.scale.set(0.5,0.5,0.5)

    if (gltf.animations && gltf.animations.length) {
        console.log("Animations", gltf.animations);
        mixer = new THREE.AnimationMixer(model);

        const action = mixer.clipAction(gltf.animations[0])
        // action.play()

        const danceAnimation = THREE.AnimationClip.findByName(gltf.animations, "Dance")

        if (danceAnimation) {
            const deathAction = mixer.clipAction(danceAnimation)
            deathAction.play()
        }
    }

    console.log(gltf)
    scene.add(model);
}, () => {
    console.log("Model is loading.....")
}, () => {
    console.log("Model Error")
})

// scene
const scene = new THREE.Scene();

// const clock = new THREE.Clock()

const timer = new THREE.Timer();

// Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-2, 3, 1)
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

// const pointLight = new THREE.PointLight(0x00ff00, 300, 5);
// pointLight.position.set(1,2,3);
// scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight,1)
// scene.add(pointLightHelper)

// const spotLight = new THREE.SpotLight('#0000ff', 100, 10, Math.PI * 0.2, 0.3, 2)
// spotLight.position.set(0, 2, 1)
// scene.add(spotLight)

// spotLight.target.position.set(0, 0, 0)
// scene.add(spotLight.target)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper)

// const hemisphereLight = new THREE.HemisphereLight(0x2222ff, 0x22ff22, 5)
// scene.add(hemisphereLight)

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.3);
// scene.add(hemisphereLightHelper)

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
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });


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

// scene.add(cube);

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
    // spotLightHelper.update()
    controls.update()
    const delta = timer.getDelta()

    if (mixer) {
        mixer.update(delta)
    }

    // cube.rotation.x += delta
    // cube.rotation.y += delta

    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}

animate();