import * as THREE from "three";

import {
    state
} from "./globals.js";


export function initScene(){


    console.log(
        "initScene"
    );


    state.scene =
        new THREE.Scene();


    state.scene.background =
        new THREE.Color(
            0x505050
        );



    state.camera =
        new THREE.PerspectiveCamera(

            75,

            window.innerWidth /
            window.innerHeight,

            0.1,

            1000

        );



    state.camera.position.set(

        0,
        2,
        5

    );


    state.camera.lookAt(

        0,
        0,
        0

    );



    state.renderer =
        new THREE.WebGLRenderer({

            antialias:true

        });



    state.renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );



    state.renderer.shadowMap.enabled =
        true;



    document.body.appendChild(

        state.renderer.domElement

    );



    console.log(
        "scene initialized"
    );

}