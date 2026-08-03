import { state } from "./globals.js";


console.log("suspension.js loaded");


// 初期状態保存
let initialized = false;


let base = {

    bodyPosition:null,

    tyre:{
        LF:null,
        RF:null,
        LR:null,
        RR:null
    }

};



// --------------------
// 初期化
// --------------------

export function initSuspension(){

    console.log("initSuspension");


    const car = state.car;


    if(!car){

        console.warn(
            "car not loaded"
        );

        return;

    }



    // ボディ基準位置

    if(state.parts.body){

        base.bodyPosition =
            state.parts.body.position.clone();

    }
    else{

        base.bodyPosition =
            car.position.clone();

    }



    // タイヤ基準位置保存

    base.tyre.LF =
        state.parts.tyre.LF.position.clone();


    base.tyre.RF =
        state.parts.tyre.RF.position.clone();


    base.tyre.LR =
        state.parts.tyre.LR.position.clone();


    base.tyre.RR =
        state.parts.tyre.RR.position.clone();



    initialized = true;


    console.log(
        "suspension initialized"
    );

}



// --------------------
// 更新
// --------------------

export function updateSuspension(){


    if(!initialized){

        return;

    }



    updateTrack();


    updateCamber();


    updateRideHeight();


}



// --------------------
// トレッド幅
// --------------------

function updateTrack(){


    const front =
        state.setup.frontTrack;


    const rear =
        state.setup.rearTrack;



    const LF =
        state.parts.tyre.LF;


    const RF =
        state.parts.tyre.RF;


    const LR =
        state.parts.tyre.LR;


    const RR =
        state.parts.tyre.RR;



    if(LF){

        LF.position.x =
            base.tyre.LF.x + front;

    }


    if(RF){

        RF.position.x =
            base.tyre.RF.x - front;

    }



    if(LR){

        LR.position.x =
            base.tyre.LR.x + rear;

    }


    if(RR){

        RR.position.x =
            base.tyre.RR.x - rear;

    }


}



// --------------------
// キャンバー
// --------------------

function updateCamber(){


    const front =
        state.setup.frontCamber;


    const rear =
        state.setup.rearCamber;



    const LF =
        state.parts.tyre.LF;


    const RF =
        state.parts.tyre.RF;


    const LR =
        state.parts.tyre.LR;


    const RR =
        state.parts.tyre.RR;



    if(LF){

        LF.rotation.z =
            front;

    }


    if(RF){

        RF.rotation.z =
            -front;

    }


    if(LR){

        LR.rotation.z =
            rear;

    }


    if(RR){

        RR.rotation.z =
            -rear;

    }


}



// --------------------
// 車高
// --------------------

function updateRideHeight(){


    const front =
        state.setup.frontRideHeight;


    const rear =
        state.setup.rearRideHeight;



    const body =
        state.parts.body;



    if(!body){

        return;

    }



    // 前後別車高用
    //
    // 現段階では
    // 車体全体上下のみ
    //
    // 後でサスペンションダミーを
    // 追加すると前後別化可能



    const height =
        (front + rear) / 2;



    body.position.y =
        base.bodyPosition.y + height;


}



// --------------------
// 状態取得
// --------------------

export function getSuspensionBase(){

    return base;

}