import { state } from "./globals.js";

export function createUI() {

    console.log("createUI");

    const panel = document.createElement("div");

    panel.style.position = "fixed";
    panel.style.top = "10px";
    panel.style.right = "10px";
    panel.style.width = "260px";
    panel.style.padding = "12px";
    panel.style.background = "rgba(0,0,0,0.6)";
    panel.style.color = "white";
    panel.style.fontFamily = "sans-serif";
    panel.style.fontSize = "14px";
    panel.style.borderRadius = "8px";
    panel.style.userSelect = "none";
    panel.style.zIndex = "1000";

    document.body.appendChild(panel);


    createSlider(
        panel,
        "Front Track",
        -0.20,
        0.50,
        0.01,
        state.setup.frontTrack,
        value => {

            state.setup.frontTrack = value;

        }
    );


    createSlider(
        panel,
        "Rear Track",
        -0.20,
        0.50,
        0.01,
        state.setup.rearTrack,
        value => {

            state.setup.rearTrack = value;

        }
    );


    createSlider(
        panel,
        "Front Camber",
        -0.50,
        0.50,
        0.01,
        state.setup.frontCamber,
        value => {

            state.setup.frontCamber = value;

        }
    );


    createSlider(
        panel,
        "Rear Camber",
        -0.50,
        0.50,
        0.01,
        state.setup.rearCamber,
        value => {

            state.setup.rearCamber = value;

        }
    );


    createSlider(
        panel,
        "Front Ride Height",
        -0.20,
        0.20,
        0.005,
        state.setup.frontRideHeight,
        value => {

            state.setup.frontRideHeight = value;

        }
    );


    createSlider(
        panel,
        "Rear Ride Height",
        -0.20,
        0.20,
        0.005,
        state.setup.rearRideHeight,
        value => {

            state.setup.rearRideHeight = value;

        }
    );


    createSlider(
        panel,
        "Steering",
        -45,
        45,
        1,
        state.setup.steering,
        value => {

            state.setup.steering = value;

        }
    );

}



function createSlider(

    parent,
    label,
    min,
    max,
    step,
    value,
    callback

) {

    const row = document.createElement("div");

    row.style.marginBottom = "10px";


    const title = document.createElement("div");

    title.textContent = label;


    const valueLabel = document.createElement("span");

    valueLabel.style.float = "right";
    valueLabel.textContent = value;


    title.appendChild(valueLabel);


    const slider = document.createElement("input");

    slider.type = "range";

    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = value;

    slider.style.width = "100%";


    slider.addEventListener("input", () => {

        const v = Number(slider.value);

        valueLabel.textContent = v.toFixed(2);

        callback(v);

    });


    row.appendChild(title);
    row.appendChild(slider);

    parent.appendChild(row);

}