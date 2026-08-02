import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


console.log("app.js start");
console.log("Three.js revision:", THREE.REVISION);


// --------------------
// Scene
// --------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(
    0x505050
);


// --------------------
// Camera
// --------------------

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



// --------------------
// Renderer
// --------------------

const renderer = new THREE.WebGLRenderer({
    antialias:true
});


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.shadowMap.enabled = true;


document.body.appendChild(
    renderer.domElement
);



// --------------------
// OrbitControls
// --------------------

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
// Floor
// --------------------

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(
        20,
        20
    ),
    new THREE.MeshStandardMaterial({
        color:0x303030
    })
);


floor.rotation.x =
    -Math.PI / 2;


floor.receiveShadow = true;


scene.add(
    floor
);




// --------------------
// Light
// --------------------

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        2
    )
);



const cameraLight =
new THREE.DirectionalLight(
    0xffffff,
    3
);


cameraLight.position.set(
    0,
    0,
    5
);


cameraLight.castShadow = true;


camera.add(
    cameraLight
);


scene.add(
    camera
);




const fillLight =
new THREE.DirectionalLight(
    0xffffff,
    0.8
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
// Car
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





// 基準値

let base = {

    LF:null,
    RF:null,
    LR:null,
    RR:null

};



// 回転基準

let baseRotation = {

    LF:null,
    RF:null,
    LR:null,
    RR:null

};



// キャンバー軸設定
// 必要ならここだけ変更

const camberAxis = {

    LF:"z",
    RF:"z",
    LR:"z",
    RR:"z"

};





const loader = new GLTFLoader();



loader.load(

    "./models/cap.glb",


    (gltf)=>{


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



        tyreLF =
        car.getObjectByName(
            "TYRE_LF"
        );


        tyreRF =
        car.getObjectByName(
            "TYRE_RF"
        );


        tyreLR =
        car.getObjectByName(
            "TYRE_LR"
        );


        tyreRR =
        car.getObjectByName(
            "TYRE_RR"
        );



        window.tyreLF = tyreLF;
        window.tyreRF = tyreRF;
        window.tyreLR = tyreLR;
        window.tyreRR = tyreRR;



        base.LF =
        tyreLF.position.clone();

        base.RF =
        tyreRF.position.clone();

        base.LR =
        tyreLR.position.clone();

        base.RR =
        tyreRR.position.clone();




        baseRotation.LF =
        tyreLF.rotation.clone();

        baseRotation.RF =
        tyreRF.rotation.clone();

        baseRotation.LR =
        tyreLR.rotation.clone();

        baseRotation.RR =
        tyreRR.rotation.clone();



        console.log(
            "TYRES",
            tyreLF,
            tyreRF,
            tyreLR,
            tyreRR
        );



        const box =
        new THREE.Box3()
        .setFromObject(car);



        const center =
        box.getCenter(
            new THREE.Vector3()
        );


        controls.target.copy(
            center
        );


        controls.update();



        createUI();



    },


    undefined,


    (error)=>{

        console.error(
            "ERROR",
            error
        );

    }

);
// --------------------
// UI
// --------------------

function createUI(){


    const panel =
    document.createElement(
        "div"
    );


    panel.style.position =
        "fixed";

    panel.style.right =
        "10px";

    panel.style.top =
        "10px";

    panel.style.padding =
        "10px";

    panel.style.background =
        "rgba(0,0,0,0.5)";

    panel.style.color =
        "white";

    panel.style.fontFamily =
        "sans-serif";

    panel.style.fontSize =
        "14px";



    panel.innerHTML = `


    <div>
    Front Track
    <input id="frontTrack"
    type="range"
    min="-0.2"
    max="0.5"
    step="0.01"
    value="0">
    </div>


    <div>
    Rear Track
    <input id="rearTrack"
    type="range"
    min="-0.2"
    max="0.5"
    step="0.01"
    value="0">
    </div>



    <div>
    Front Camber
    <input id="frontCamber"
    type="range"
    min="-0.5"
    max="0.5"
    step="0.01"
    value="0">
    </div>



    <div>
    Rear Camber
    <input id="rearCamber"
    type="range"
    min="-0.5"
    max="0.5"
    step="0.01"
    value="0">
    </div>



    <div>
    Ride Height
    <input id="rideHeight"
    type="range"
    min="-0.2"
    max="0.2"
    step="0.005"
    value="0">
    </div>


    `;



    document.body.appendChild(
        panel
    );





    // --------------------
    // Track
    // --------------------


    document.getElementById(
        "frontTrack"
    ).oninput = (e)=>{


        const v =
        Number(
            e.target.value
        );


        tyreLF.position.x =
        base.LF.x + v;


        tyreRF.position.x =
        base.RF.x - v;


    };





    document.getElementById(
        "rearTrack"
    ).oninput = (e)=>{


        const v =
        Number(
            e.target.value
        );



        tyreLR.position.x =
        base.LR.x + v;


        tyreRR.position.x =
        base.RR.x - v;


    };







    // --------------------
    // Camber
    // --------------------


    document.getElementById(
        "frontCamber"
    ).oninput = (e)=>{


        const v =
        Number(
            e.target.value
        );


        setCamber(
            tyreLF,
            "LF",
            v
        );


        setCamber(
            tyreRF,
            "RF",
            -v
        );


    };





    document.getElementById(
        "rearCamber"
    ).oninput = (e)=>{


        const v =
        Number(
            e.target.value
        );



        setCamber(
            tyreLR,
            "LR",
            v
        );


        setCamber(
            tyreRR,
            "RR",
            -v
        );


    };






    // --------------------
    // Ride Height
    // --------------------


    document.getElementById(
        "rideHeight"
    ).oninput = (e)=>{


        const v =
        Number(
            e.target.value
        );



        tyreLF.position.y =
        base.LF.y + v;


        tyreRF.position.y =
        base.RF.y + v;


        tyreLR.position.y =
        base.LR.y + v;


        tyreRR.position.y =
        base.RR.y + v;


    };


}





// --------------------
// Camber function
// --------------------

function setCamber(
    tyre,
    name,
    value
){


    if(!tyre){
        return;
    }



    // 一旦基準へ戻す

    tyre.rotation.copy(
        baseRotation[name]
    );



    const axis =
    camberAxis[name];



    tyre.rotation[axis] +=
        value;


}






// --------------------
// Animation
// --------------------

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





// --------------------
// Resize
// --------------------

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