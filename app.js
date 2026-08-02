import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log("app.js start");
console.log("Three.js revision:", THREE.REVISION);
console.log("GLTFLoader:", GLTFLoader);


// シーン
const scene = new THREE.Scene();

scene.background = new THREE.Color(
    0x202020
);


// カメラ
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(
    0,
    2,
    5
);

camera.lookAt(
    0,
    0,
    0
);

window.camera = camera;


// レンダラー
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(
    renderer.domElement
);


// OrbitControls
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.target.set(
    0,
    0.5,
    0
);

controls.minDistance = 2;
controls.maxDistance = 10;

controls.enablePan = false;

controls.update();

window.controls = controls;


// ライト
scene.add(
    new THREE.AmbientLight(
        0xffffff,
        2
    )
);


const light = new THREE.DirectionalLight(
    0xffffff,
    3
);

light.position.set(
    5,
    5,
    5
);

scene.add(light);


// デバッグ表示
scene.add(
    new THREE.GridHelper(
        10,
        10
    )
);

scene.add(
    new THREE.AxesHelper(
        5
    )
);


// 車
let car = null;

window.car = null;


// タイヤ
let tyreLF = null;
let tyreRF = null;
let tyreLR = null;
let tyreRR = null;


// Console用
window.tyreLF = null;
window.tyreRF = null;
window.tyreLR = null;
window.tyreRR = null;


const loader = new GLTFLoader();

console.log(
    "before loader.load"
);


loader.load(

    "./models/cap.glb",

    (gltf) => {

        console.log(
            "SUCCESS"
        );


        car = gltf.scene;


        scene.add(
            car
        );


        window.car = car;


        console.log(
            "car:",
            car
        );


        // オブジェクト一覧
        car.traverse(
            (child) => {

                console.log(
                    child.name,
                    child.type
                );

            }
        );


        // タイヤ取得
        tyreLF = car.getObjectByName(
            "TYRE_LF"
        );

        tyreRF = car.getObjectByName(
            "TYRE_RF"
        );

        tyreLR = car.getObjectByName(
            "TYRE_LR"
        );

        tyreRR = car.getObjectByName(
            "TYRE_RR"
        );


        window.tyreLF = tyreLF;
        window.tyreRF = tyreRF;
        window.tyreLR = tyreLR;
        window.tyreRR = tyreRR;


        console.log(
            "TYRES:",
            tyreLF,
            tyreRF,
            tyreLR,
            tyreRR
        );


        // モデル中心へ注視点調整
        const box = new THREE.Box3()
            .setFromObject(car);

        const center = box.getCenter(
            new THREE.Vector3()
        );

        controls.target.copy(
            center
        );

        controls.update();

    },


    (xhr) => {

        console.log(
            `progress ${xhr.loaded}/${xhr.total}`
        );

    },


    (error) => {

        console.error(
            "ERROR"
        );

        console.error(
            error
        );

    }

);



function animate() {

    requestAnimationFrame(
        animate
    );


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


animate();



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