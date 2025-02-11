import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Ground
const groundGeometry = new THREE.PlaneGeometry(30, 30);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Building at the bottom
const buildingGeometry = new THREE.BoxGeometry(6, 3, 2);
const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0x4444ff });
const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
building.position.set(0, 1.5, -7);
scene.add(building);

// Roads
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide });

// Horizontal road in front of the building (wider road)
const roadHorizontal = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), roadMaterial); // Increased width from 2 to 4
roadHorizontal.rotation.x = -Math.PI / 2;
roadHorizontal.position.set(0, 0.01, -5);
scene.add(roadHorizontal);

// Vertical road going up from the roundabout (wider road)
const roadVertical = new THREE.Mesh(new THREE.PlaneGeometry(4, 8), roadMaterial); // Increased width from 2 to 4
roadVertical.rotation.x = -Math.PI / 2;
roadVertical.position.set(0, 0.01, -1);
scene.add(roadVertical);

// Roundabout (center of the intersection)
const roundaboutGeometry = new THREE.CircleGeometry(0.7, 32); // Reduced the radius from 1 to 0.7
const roundaboutMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
const roundabout = new THREE.Mesh(roundaboutGeometry, roundaboutMaterial);
roundabout.rotation.x = -Math.PI / 2;
roundabout.position.set(0, 0.02, -4);
scene.add(roundabout);

// Moving Sphere (Car simulation)
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Start sphere at the bottom and move it up along the vertical road
sphere.position.set(0, 0.3, -6);
scene.add(sphere);

// Animation (Car moving along the vertical road)
gsap.to(sphere.position, {
    z: 2, // Moves upwards
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// Set camera position
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Render loop
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
animate();
