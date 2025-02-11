import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.145.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.145.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.145.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Classroom (Cube)
const classroomMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.BackSide });
const classroomGeometry = new THREE.BoxGeometry(10, 6, 10);
const classroom = new THREE.Mesh(classroomGeometry, classroomMaterial);
scene.add(classroom);

// Camera Position
camera.position.set(0, 2, 5);
camera.lookAt(0, 2, 0);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Load Models
const loader = new GLTFLoader();
function loadModel(url, position, rotation, scale) {
    loader.load(url, (gltf) => {
        const model = gltf.scene;
        model.position.set(...position);
        model.rotation.set(...rotation);
        model.scale.set(...scale);
        scene.add(model);
    });
}

// Load desks and chairs
const deskPositions = [[-3, 0, 2], [3, 0, 2]];
const chairOffsets = [[-0.5, 0, -0.5], [0.5, 0, -0.5], [-0.5, 0, 0.5], [0.5, 0, 0.5]];

deskPositions.forEach((deskPos) => {
    loadModel('models/school_desk/desk.gltf', deskPos, [0, 0, 0], [0.5, 0.5, 0.5]);
    chairOffsets.forEach((offset) => {
        loadModel('models/school_chair/chair.gltf', [deskPos[0] + offset[0], 0, deskPos[2] + offset[2]], [0, 0, 0], [0.5, 0.5, 0.5]);
    });
});

// Load window model
loadModel('models/window/window.gltf', [0, 3, -5], [0, 0, 0], [1, 1, 1]);

// Sky texture for background view
const textureLoader = new THREE.TextureLoader();
const skyTexture = textureLoader.load('textures/sky.jpeg');
const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture });
const skyGeometry = new THREE.PlaneGeometry(10, 6);
const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
skyMesh.position.set(0, 3, -5.1);
scene.add(skyMesh);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
