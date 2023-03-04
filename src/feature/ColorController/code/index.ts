import { Board, Led } from "johnny-five";
import { EtherPortClient } from 'light-controller-etherport-client';

import Color from './color';

const board = new Board({
    port: new EtherPortClient({
        host: '192.168.1.156',
        port: 3030
    }),
    repl: false
});

const redPin = 4, greenPin = 12, bluePin = 5;

let currentColor: Color = {
    red: 255,
    green: 255,
    blue: 255
};

const setCurrentColor = (color: Color) => currentColor = color;

board.on('ready', () => {
    const redLeds = new Led(redPin);
    const blueLeds = new Led(bluePin);
    const greenLeds = new Led(greenPin);

    redLeds.on();
    blueLeds.on();
    greenLeds.on();

    const colorClamp = 255;

    board.loop(200, () => {
        redLeds.brightness(currentColor.red);
        greenLeds.brightness(currentColor.green);
        blueLeds.brightness(currentColor.blue);
    });
});

export { setCurrentColor };