import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
console.log("app.js start");
// Three.jsの基本的なセットアップ
const scene = new THREE.Scene();

// 背景色（真っ黒回避）
scene.background = new THREE.Color(0x202020);

// カメラの設定
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 10);

// レンダラーの設定
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);


// 環境光
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambientLight);


// 指向性ライト
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

directionalLight.position.set(
    5,
    5,
    5
);

scene.add(directionalLight);


// 車モデル
let car = null;

const loader = new GLTFLoader();

loader.load(
    "models/cap.glb",

    function (gltf) {

        car = gltf.scene;

        console.log("car loaded:", car);


        // サイズ調整
        car.scale.set(
            0.01,
            0.01,
            0.01
        );


        // 位置調整
        car.position.set(
            0,
            0,
            0
        );


        scene.add(car);


        // サイズ確認
        const box = new THREE.Box3().setFromObject(car);

        const size = box.getSize(
            new THREE.Vector3()
        );

        console.log("car size:", size);

    },

    function (progress) {
        console.log(
            "loading:",
            progress
        );
    },

    function (error) {
        console.error(
            "GLB load error:",
            error
        );
    }
);


// アニメーションループ
function animate() {

    requestAnimationFrame(animate);


    if (car) {

        car.rotation.y += 0.01;

    }


    renderer.render(
        scene,
        camera
    );

}


animate();


// 画面サイズ変更対応
window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);