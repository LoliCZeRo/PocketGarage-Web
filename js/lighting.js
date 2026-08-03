import * as THREE from "three";

import {
    state
} from "./globals.js";


export function initLights(){

    console.log("initLights");


    // 環境光
    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            2
        );


    state.scene.add(
        ambient
    );



    // カメラ固定ライト
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


    state.camera.add(
        cameraLight
    );


    state.scene.add(
        state.camera
    );



    // 補助ライト
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


    state.scene.add(
        fillLight
    );


    console.log(
        "lights initialized"
    );

}