export const state = {

    scene:null,

    camera:null,

    renderer:null,

    controls:null,


    parts:{

        body:null,

        tyre:{

            LF:null,
            RF:null,
            LR:null,
            RR:null

        }

    },


    base:{

        position:{},

        rotation:{}

    },


    setup:{

        frontTrack:0,
        rearTrack:0,

        frontCamber:0,
        rearCamber:0,

        frontRideHeight:0,
        rearRideHeight:0,

        steering:0

    }

};

export let camera = null;

export let renderer = null;

export let controls = null;


export const parts = {

    body:null,

    tyre:{
        LF:null,
        RF:null,
        LR:null,
        RR:null
    }

};


export const base = {

    position:{},

    rotation:{}

};


export const setup = {

    frontTrack:0,
    rearTrack:0,

    frontCamber:0,
    rearCamber:0,

    frontRideHeight:0,
    rearRideHeight:0,

    steering:0

};