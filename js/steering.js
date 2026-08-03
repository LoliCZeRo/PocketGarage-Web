import * as THREE from "three";
import { state } from "./globals.js";


console.log("steering.js loaded");


// 初期化状態
let initialized = false;


// 基準回転保存

let baseRotation = {

    LF:null,
    RF:null

};



// --------------------
// 初期化
// --------------------

export function initSteering(){


    console.log(
        "initSteering"
    );


    const LF =
        state.parts.tyre.LF;


    const RF =
        state.parts.tyre.RF;



    if(!LF || !RF){

        console.warn(
            "front tyres not found"
        );

        return;

    }



    baseRotation.LF =
        LF.rotation.clone();


    baseRotation.RF =
        RF.rotation.clone();



    initialized = true;


    console.log(
        "steering initialized"
    );


}



// --------------------
// 更新
// --------------------

export function updateSteering(){


    if(!initialized){

        return;

    }



    const angle =
        THREE.MathUtils.degToRad(
            state.setup.steering
        );


    const LF =
        state.parts.tyre.LF;


    const RF =
        state.parts.tyre.RF;



    if(!LF || !RF){

        return;

    }



    /*
    
    左右で逆向き
    
    上から見た場合
    
          前
    
       LF      RF

    左 +   
    右 -

    */



    LF.rotation.y =
        baseRotation.LF.y + angle;



    RF.rotation.y =
        baseRotation.RF.y + angle;



}