import * as THREE from "three";

import {
    state
} from "./globals.js";


export function initFloor(){

    console.log("initFloor");


    const floor =
        new THREE.Mesh(

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


    state.scene.add(
        floor
    );


    console.log(
        "floor initialized"
    );

}