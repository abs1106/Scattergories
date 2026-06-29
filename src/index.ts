const express = require("express");
const app = express();
const PORT = 5432;

app.use(express.json());

//Generating the random room code for the rooms with thec help of copilot 

function generateRoomCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let code = "";

    //The Room code format will be ABCD123 etc 

    for(let i = 0; i < 4; i ++) {
        code+= letters[Math.floor(Math.random() * letters.length)];
    }

    for(let i = 0; i < 3; i++) {
      code+= numbers[Math.floor(Math.random() * numbers.length)];
    }

    return code;

}

//Generates a random letter for the topic

function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}

//generates a random topic
function getTopic(){
const topics = [
  "Countries",
  "Animals",
  "Foods",
  "Things in a Kitchen",
  "Names",
  "TV Shows",
  "Occupations",
  "Movies",
  "Video Games",
  "Books",
  "Company Names",
  "Clothing",
  "Drinks",
  "Musical Instruments",
  "Things in an Office",
  "Things in a School",
  "Types of Jewelry",
  "Candy"
];

return topics[Math.floor(Math.random() * topics.length)]


}





app.post('/start', async (req, res) => {
    const roomCode = generateRoomCode();
    const letter = getRandomLetter;
    res.json ({
        message: "Room created.",
        roomCode: roomCode, 
        letter: letter
    });
});

app.listen(5432);
