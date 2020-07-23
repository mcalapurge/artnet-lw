import ArtnetHelpers from './src/statics/ArtnetHelpers.js';
import GeneralStatics from './src/statics/GeneralStatics.js';
import express from 'express';

import argv from 'yargs';

const Argv = argv.argv;
const artnetHelpers = new ArtnetHelpers();
// const statics = new GeneralStatics();
const app = new express();
const port = Argv.dev ? 8080 : 80;

const frontEndDir = './src/frontend/';


artnetHelpers.resetUniverse(() => {

    /** serve static site components */
    app.use(express.static(frontEndDir));

    app.get('/setcolor', (req, res) => {
        let msg = JSON.stringify(req.query, null, 2);
        if (req.params.color && req.query.led && req.query.lamp) {
            artnetHelpers.setLamp(req.query.lamp, req.query.led, req.query.color)
        } else {
            mgs = msg + '\nParams not provided for request.'
        }
        res.send(JSON.stringify(req.query), null, 2);
    });
      

    app.get('/sethexcolor', (req, res) => {
        let msg = JSON.stringify(req.query, null, 2);
        if (req.query.hex && req.query.led && req.query.lamp) {
            artnetHelpers.setLampHex(req.query.lamp, req.query.led, req.query.hex)
        } else {
            mgs = msg + '\nParams not provided for request.'
        }
        res.send(JSON.stringify(req.query), null, 2);
    });


    app.get(['/reset', '/lightsout', '/lightsoff', '/blackout'], (req, res) => {
        artnetHelpers.resetUniverse(()=>{
            res.send({"msg": "Universe reset"});
        });
    });
    
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
});

