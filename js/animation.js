import {
    state
} from "./globals.js";


export function startAnimation(){

    console.log(
        "animation"
    );


    function loop(){

        requestAnimationFrame(
            loop
        );


        if(
            state.renderer &&
            state.scene &&
            state.camera
        ){

            state.renderer.render(

                state.scene,

                state.camera

            );

        }

    }


    loop();

}