import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import {
    state
} from "./globals.js";


import {
    initSuspension
} from "./suspension.js";


import {
    initSteering
} from "./steering.js";



export function loadCar(){

    console.log(
        "loadCar"
    );


    return new Promise(
        (resolve, reject)=>{


            const loader =
                new GLTFLoader();



            loader.load(


                "./models/cap.glb",



                (gltf)=>{


                    console.log(
                        "GLB SUCCESS"
                    );



                    const car =
                        gltf.scene;



                    state.scene.add(
                        car
                    );



                    state.car =
                        car;



                    car.traverse(

                        (child)=>{


                            console.log(

                                child.name,
                                child.type

                            );



                            if(
                                child.isMesh
                            ){

                                child.castShadow =
                                    true;

                            }


                        }

                    );




                    // --------------------
                    // Body
                    // --------------------


                    state.parts.body =

                        car.getObjectByName(

                            "body"

                        );





                    // --------------------
                    // Tyres
                    // --------------------


                    state.parts.tyre.LF =

                        car.getObjectByName(

                            "TYRE_LF"

                        );



                    state.parts.tyre.RF =

                        car.getObjectByName(

                            "TYRE_RF"

                        );



                    state.parts.tyre.LR =

                        car.getObjectByName(

                            "TYRE_LR"

                        );



                    state.parts.tyre.RR =

                        car.getObjectByName(

                            "TYRE_RR"

                        );





                    console.log(

                        "PARTS",

                        state.parts

                    );





                    // --------------------
                    // Base Position
                    // --------------------


                    state.base.position = {


                        LF:

                        state.parts.tyre.LF.position.clone(),



                        RF:

                        state.parts.tyre.RF.position.clone(),



                        LR:

                        state.parts.tyre.LR.position.clone(),



                        RR:

                        state.parts.tyre.RR.position.clone()


                    };





                    // --------------------
                    // Base Rotation
                    // --------------------


                    state.base.rotation = {



                        LF:

                        state.parts.tyre.LF.rotation.clone(),



                        RF:

                        state.parts.tyre.RF.rotation.clone(),



                        LR:

                        state.parts.tyre.LR.rotation.clone(),



                        RR:

                        state.parts.tyre.RR.rotation.clone()


                    };






                    // --------------------
                    // Initialize Systems
                    // --------------------


                    initSuspension();


                    initSteering();





                    resolve();



                },



                undefined,



                (error)=>{


                    console.error(

                        "GLB ERROR",

                        error

                    );



                    reject(error);



                }



            );



        }

    );

}