//file containing all handle logic for deleting, adding, reading and writing to db.json
const fs = require('fs');

const helper = {
//reads db file and returns the file parsed into json.
    async read() {
        return new Promise((resolve) => {
             fs.readFile('./db/db.json', (err, data)=> {
                if (err){
                    console.log(err)
                } else {
                    let file =JSON.parse(data);
                    resolve(file);
                    
                }
            })

        })
    },
//writes file with info to the db file
    async write(file) {
        return new Promise((resolve) => {
            fs.writeFile('./db/db.json', JSON.stringify(file), (err, data)=> {
                if (err){
                    console.log(err)
                } else {
                    console.log('file written')
                    resolve(true);

                    
                }
            })

        })
    },
//locates an object by an id being equal to a specific value in a obj in an array. returns the index
    locateobj (array, value) {
        let index = 0;
        for (index ; index < array.length; index++){
            if(array[index].id == value){
                return index;
            }
        }
        return undefined;
    }

}

//reads the file, grabs the index of the obj with the correct body value, removes that obj and rewrites the file
async function delNote(noteID) {
  let file =  await helper.read();
  let index = helper.locateobj(file, noteID);
  file.splice(index, 1);
  let written= await helper.write(file);
  console.log (`file ${noteID} has been deleted`)
  return written;

    
}
//reads the file, pushes the new note into the object then rewrites the file
async function addNote(note) {
    let file =  await helper.read();
    file = (file);
    file.push(note);
    let written= await helper.write(file);
    console.log (`file ${note.id} has been added to the database`)
    return written;
}

//rewrites file to a blank string. don't know if this is needed but I thought it would be good to have
async function clearNotes() {
    helper.write('');
}


// addNote();
module.exports = {
    delNote,
    addNote,
    clearNotes,
    helper

}