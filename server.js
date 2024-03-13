const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes/notes');
const PORT = process.env.PORT || 3001;

const app = express();

//parsers for json and encodedd urls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//grab static files from public
app.use(express.static('public'));

//grabbing route for notes
app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));


});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));


});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);