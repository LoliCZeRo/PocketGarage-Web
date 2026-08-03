console.log("APP.JS LOAD");

import { initScene } from "./js/scene.js";
import { initLights } from "./js/lighting.js";
import { initFloor } from "./js/floor.js";
import { initControls } from "./js/controls.js";
import { loadCar } from "./js/loader.js";
import { createUI } from "./js/ui.js";
import { startAnimation } from "./js/animation.js";
import { initResize } from "./js/resize.js";


async function main(){

    console.log("PocketGarage start");


    initScene();


    initFloor();


    initLights();


    initControls();


    await loadCar();


    createUI();


    startAnimation();


    initResize();


}


console.log("before main");

main();

console.log("after main");