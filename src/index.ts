import "dotenv/config";
import express, { Request, Response } from "express";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

app.use(express.json());
const PORT = 5432;

app.use(express.json());

//Generating the random room code for the rooms with thec help of copilot 

function getRoomCode() {
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

app.post('/games', async (req: Request, res: Response) => {
  try {
    const {roomCode} = req.body;
    const existingGame = await prisma.game.findUnique ({
      where: {
        room_code: roomCode,
      },
    });
    if (existingGame) {
      return res.status(409).json ({
        error: "Room code already exists. Please try again with a different code.",
      });
    }

    /* const roomCode = getRoomCode(); */
    const letter = getRandomLetter();
    const topic = getTopic()

    const game = await prisma.game.create({
      data: {
        room_code: roomCode,
        letter,
        topic,
      },
    });

      return res.status(201).json ({
        roomCode: game.room_code,
        letter: game.letter,
        topic: game.topic,
      });
    } catch (error) {
      return res.status(500).json ({
        error: "Failed to creat room.",
      });
    }
});

app.listen(PORT, () => {
  console.log('App is running on port ${PORT}');
});
