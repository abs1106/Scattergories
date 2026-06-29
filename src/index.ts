const express = require("express");
const app = express();
const PORT = 5432;

app.use(express.json());

app.post('/start', async (req, res) => {


    res.send("Root Route");
});
