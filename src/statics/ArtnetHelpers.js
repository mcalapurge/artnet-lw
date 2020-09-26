import Artnet from 'artnet';
import colors from '../data/colors.js';
const artnet = new Artnet({refresh: 100, sendAll: true});

export default class ArtnetHelpers {

    host = '192.168.1.117';
    numberOfLamps = 8;
    ledsPerLamp = 8;

    /**
     * 
     * @param {function} callback 
     * Function to be ran after the reset has been done. If not defined, the process will exit.
     */
    resetUniverse(callback){
        let i = [];
        while (i.length < 512){
            i.push(0);
        };
        if (!callback){
            artnet.set(1, i, () => artnet.close());
        } else {
            artnet.set(1, i);
            callback();
        };
        console.log('Universe reset');
    };

    /**
     * 
     * @param {number} hexString hex color code. RGB
     */
    parseHex(hexString){
        let red = parseInt('0x' + hexString.charAt(0) + hexString.charAt(1));
        let blue = parseInt('0x' + hexString.charAt(2) + hexString.charAt(3));
        let green = parseInt('0x' + hexString.charAt(4) + hexString.charAt(5));
        return [red, blue, green]
    }
    
    /**
     * 
     * @param {number} lampNumber fixture number, 0 indexed
     * @param {number} ledNumber led number, 0 indexed
     * @param {string} color color as a hex string
     */
    setLamp(lampNumber, ledNumber, color, intensity){
        intensity = parseInt(intensity);
        let intensityVal;
        if (typeof(intensity) && intensity > 0 && intensity < 256) {
            intensityVal = intensity;
        } else {
            intensityVal = 100;
        }

        let msg;
        let err = 1;
        switch (lampNumber) {
            case lampNumber > this.numberOfLamps:
                msg = `Too many lamps in specified... Argument lampNumber must be less than ${this.numberOfLamps}`;
                break;
            case !lampNumber:
                msg = `No Lamp Number specified`;
                break;
            case ledNumber > this.ledsPerLamp:
                msg = `Too many leds in specified... Argument ledNumber must be less than ${this.ledsPerLamp}`;
                break;
            case !ledNumber:
                msg = `No Led Number specified`;
                break;
            case colors[color]:
                msg = `The specified color does not exist. Ensure you pick a color from ${JSON.stringify(this.colors, null)}`;
                break;
            case !color:
                msg = `No color Specified`;
                break;
            default:
                err = 0;
                break;
        }
        if (err === 1){
            return msg;
        } else {
            let lampType = 8 * 3;
            let startAddr = lampNumber*lampType + ledNumber*3 + 1;
            let colorArray = [];
            colors[color].forEach((channel) => {
                channel = Math.ceil((channel / 100) * intensityVal);
                colorArray.push(channel);
            });
            artnet.set(startAddr, colorArray);
        }
    }

    /**
     * 
     * @param {number} lampNumber fixture number, 0 indexed
     * @param {number} ledNumber led number, 0 indexed
     * @param {string} hexColor name of color as a string
     */
    setLampHex(lampNumber, ledNumber, hexColor){
        let msg;
        let err = 1;
        if ( lampNumber > this.numberOfLamps) {
            msg = `Too many lamps in specified... Argument lampNumber must be less than ${this.numberOfLamps}`;
        } else if (lampNumber === undefined) {
            msg = `No Lamp Number specified`;
        } else if (ledNumber > this.ledsPerLamp) {
            msg = `Too many leds in specified... Argument ledNumber must be less than ${this.ledsPerLamp}`;
        } else if (ledNumber === undefined) {
            msg = `No Led Number specified`;
        } else if (hexColor.length !== 6) {
            msg = `Hex color is not correct`;
        } else if (hexColor === undefined) {
            msg = `No color Specified`;
        } else {
            err = 0;
        }
        if (err === 1){
            return msg;
        } else {
            let lampType = 8 * 3;
            let startAddr = lampNumber*lampType + ledNumber*3 + 1;
            console.log((startAddr >>> 0).toString(2))
            artnet.set(startAddr, this.parseHex(hexColor));
        }
    }
}

