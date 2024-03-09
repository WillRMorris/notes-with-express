const api = require('express').Router();
const { response } = require('express');
const handle = require('../libs/handle');
const helper = handle.helper


//parsers for json and encodedd urls
// api.use(express.json());
// api.use(express.urlencoded({ extended: true }));

api.get('/notes', (req, res) => {
let notes= helper.read();
res.json(notes);

});


api.post('/notes', (req, res) => {
    if(req.body && req.body.title && req.body.text && req.body.id){
        let note = req.body;
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


api.delete('/notes', (req, res) => {
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