import {
    state
} from "./globals.js";


import {
    updateSuspension
} from "./suspension.js";


import {
    updateSteering
} from "./steering.js";



export function startAnimation(){

    console.log(
        "animation"
    );



    function loop(){


        requestAnimationFrame(
            loop
        );



        // --------------------
        // Vehicle Update
        // --------------------


        updateSuspension();


        updateSteering();





        // --------------------
        // Render
        // --------------------


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