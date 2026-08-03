export const state = {

    scene: null,
    camera: null,
    renderer: null,
    controls: null,

    car: null,

    parts: {

        body: null,

        tyre: {
            LF: null,
            RF: null,
            LR: null,
            RR: null
        }

    },

    base: {

        position: {},

        rotation: {}

    },

    setup: {

        frontTrack: 0,
        rearTrack: 0,

        frontCamber: 0,
        rearCamber: 0,

        frontRideHeight: 0,
        rearRideHeight: 0,

        steering: 0

    }

};

// 開発用
window.state = state;