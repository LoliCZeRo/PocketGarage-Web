import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log("app.js start");
console.log("Three.js revision:", THREE.REVISION);


// シーン
const scene = new THREE.Scene();

scene.background = new THREE.Color(
    0x303030
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

renderer.shadowMap.enabled = true;

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


// --------------------
// 背景・地面
// --------------------

// 地面
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(
        20,
        20
    ),
    new THREE.MeshStandardMaterial({
        color: 0x202020
    })
);

floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;

floor.receiveShadow = true;

scene.add(
    floor
);


// --------------------
// ライト
// --------------------

// 環境光
scene.add(
    new THREE.AmbientLight(
        0xffffff,
        1.5
    )
);


// カメラ固定ライト
const cameraLight = new THREE.DirectionalLight(
    0xffffff,
    2.5
);

cameraLight.position.set(
    0,
    0,
    5
);

cameraLight.castShadow = true;


// カメラの子にする
camera.add(
    cameraLight
);

scene.add(
    camera
);


// 補助ライト（弱い固定光）
const fillLight = new THREE.DirectionalLight(
    0xffffff,
    0.5
);

fillLight.position.set(
    -5,
    5,
    -5
);

scene.add(
    fillLight
);


// --------------------
// 車
// --------------------

let car = null;

window.car = null;


let tyreLF = null;
let tyreRF = null;
let tyreLR = null;
let tyreRR = null;


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


        car.traverse(
            (child)=>{

                console.log(
                    child.name,
                    child.type
                );

                if(child.isMesh){

                    child.castShadow = true;

                }

            }
        );


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


        const box = new THREE.Box3()
            .setFromObject(car);


        const center = box.getCenter(
            new THREE.Vector3()
        );


        controls.target.copy(
            center
        );

        controls.update();


        console.log(
            "TYRES:",
            tyreLF,
            tyreRF,
            tyreLR,
            tyreRR
        );

    },


    (xhr)=>{

        console.log(
            `progress ${xhr.loaded}/${xhr.total}`
        );

    },


    (error)=>{

        console.error(
            "ERROR",
            error
        );

    }

);



// アニメーション
function animate(){

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



// リサイズ
window.addEventListener(
    "resize",
    ()=>{

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