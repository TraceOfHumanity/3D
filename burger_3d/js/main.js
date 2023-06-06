// Імпорт бібліотеки THREE.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Створення сцени Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  50,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const loader = new GLTFLoader();
let object;

// Завантаження моделі
loader.load(
  `models/untitled.glb`,
  function (gltf) {
    object = gltf.scene;
    object.position.set(0, 0, 0); // Встановити позицію об'єкта в центрі сцени
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% завантажено");
  },
  function (error) {
    console.error(error);
  }
);

// Розмір рендерера
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Позиціонування камери
camera.position.z = 200;

// Додавання освітлення
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(-2, 2, 5);
topLight.intensity = 1;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// Додавання керування камерою
const controls = new OrbitControls(camera, renderer.domElement);

// Анімація
function animate() {
  requestAnimationFrame(animate);
  object.rotation.z += 0.01;
  // object.rotation.y += 0;
  object.rotation.x = 1.5;
  renderer.render(scene, camera);
}

// Обробник зміни розміру вікна
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Початок рендерингу
animate();
