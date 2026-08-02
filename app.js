import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

console.log("app.js start");
console.log("Three.js revision:", THREE.REVISION);
console.log("GLTFLoader:", GLTFLoader);

// シーン
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// カメラ
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 5);

// レンダラー
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ライト
scene.add(new THREE.AmbientLight(0xffffff, 2));

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

// デバッグ表示
scene.add(new THREE.GridHelper(10, 10));
scene.add(new THREE.AxesHelper(5));

let car = null;

const loader = new GLTFLoader();

console.log("before loader.load");

loader.load(

    "./models/cap.glb",

    (gltf) => {

        console.log("SUCCESS");

        car = gltf.scene;

        scene.add(car);

        console.log(car);

    },

    (xhr) => {

        console.log(
            `progress ${xhr.loaded}/${xhr.total}`
        );

    },

    (error) => {

        console.error("ERROR");
        console.error(error);

    }

);

function animate() {

    requestAnimationFrame(animate);

    if (car) {

        car.rotation.y += 0.01;

    }

    renderer.render(scene, camera);

}

animate();

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});