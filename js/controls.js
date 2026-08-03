import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import {
    state
} from "./globals.js";


export function initControls(){

    console.log("initControls");


    state.controls =
        new OrbitControls(

            state.camera,

            state.renderer.domElement

        );


    state.controls.enableDamping =
        true;


    state.controls.target.set(

        0,
        0.5,
        0

    );


    state.controls.minDistance =
        2;


    state.controls.maxDistance =
        10;


    state.controls.enablePan =
        false;


    state.controls.update();



    console.log(
        "controls initialized"
    );

}