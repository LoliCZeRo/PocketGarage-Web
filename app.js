import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

console.log("app.js start");


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

camera.position.set(0, 3, 15);
camera.lookAt(0, 0, 0);


// Console操作用
window.camera = camera;


// レンダラー
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
    3
);

directionalLight.position.set(
    5,
    10,
    5
);

scene.add(directionalLight);


// デバッグ用グリッド
const grid = new THREE.GridHelper(
    20,
    20
);

scene.add(grid);


// デバッグ用軸
const axes = new THREE.AxesHelper(
    5
);

scene.add(axes);


// 車モデル
let car = null;

const loader = new GLTFLoader();


console.log("before glb load");


loader.load(

    "models/cap.glb",


    function (gltf) {

        console.log("GLB LOAD SUCCESS");


        car = gltf.scene;


        // Console操作用
        window.car = car;


        console.log(
            "car object:",
            car
        );


        // サイズ調整
        car.scale.set(
            0.01,
            0.01,
            0.01
        );


        car.position.set(
            0,
            0,
            0
        );


        scene.add(car);


        // サイズ確認
        const box = new THREE.Box3()
            .setFromObject(car);


        const size = box.getSize(
            new THREE.Vector3()
        );


        const center = box.getCenter(
            new THREE.Vector3()
        );


        console.log(
            "car size:",
            size
        );


        console.log(
            "car center:",
            center
        );


        camera.lookAt(
            center
        );

    },


    function (xhr) {

        console.log(
            "GLB loading:",
            xhr.loaded,
            "/",
            xhr.total
        );

    },


    function (error) {

        console.error(
            "GLB LOAD ERROR:",
            error
        );

    }

);



// アニメーション
function animate() {

    requestAnimationFrame(
        animate
    );


    if (car) {

        // デバッグ後に有効化
        // car.rotation.y += 0.01;

    }


    renderer.render(
        scene,
        camera
    );

}


animate();


// リサイズ対応
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