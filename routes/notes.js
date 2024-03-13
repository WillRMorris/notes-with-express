const api = require('express').Router();
const handle = require('../libs/handle');
const helper = handle.helper;

api.get('/notes', (req, res) => {
    console.info(`${req.method} request recieved`);
helper.read().then((file)=>{
    console.log(file)
    res.json(file);
})

});


api.post('/notes', (req, res) => {
    console.info(`${req.method} request recieved`);
    if(req.body && req.body.title && req.body.text && req.body.id){
        let note = req.body;
        console.log(note);
        handle.addNote(note);
        response = {
            staus: 'sucess',
            data: note,
        }
    res.status(201).json(response);
    }
    else{
    res.status(400).json('ERROR: missing valid input at post /notes')

    }
});


api.delete('/notes/:id', (req, res) => {
    console.info(`${req.method} request recieved`);
    if (req.params.id){
        handle.delNote(req.params.id);
        response = {
            staus: 'sucess',
            data: `file ${req.params.id} has been marked for deletion`,
        }
        res.status(201).json(response);
    }
    else{
        res.status(400).json('ERROR: missing valid input at delete /notes')
    
        }


});



module.exports = api;