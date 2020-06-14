import ArtnetHelpers from './src/ArtnetHelpers.js';
import express from 'express';

const helpers = new ArtnetHelpers();
const app = new express();
const port = 80

helpers.resetUniverse(()=>{


    app.get('/', (req, res) => {
        res.send('Hello World!');
    });


    app.get('/setcolor', (req, res) => {
        let msg = JSON.stringify(req.query, null, 2);
        if (req.query.color && req.query.led && req.query.lamp) {
            helpers.setLamp(req.query.lamp, req.query.led, req.query.color)
        } else {
            mgs = msg + '\nParams not provided for request.'
        }
        res.send(JSON.stringify(req.query), null, 2);
    });


    app.get('/sethexcolor', (req, res) => {
        let msg = JSON.stringify(req.query, null, 2);
        if (req.query.hex && req.query.led && req.query.lamp) {
            helpers.setLampHex(req.query.lamp, req.query.led, req.query.hex)
        } else {
            mgs = msg + '\nParams not provided for request.'
        }
        res.send(JSON.stringify(req.query), null, 2);
    });


    app.get('/reset', (req, res) => {
        helpers.resetUniverse(()=>{
            res.send('Universe reset');
        });
    });
    
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
});

