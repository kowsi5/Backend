    // const express = require('express');
    // const bodyParser = require('body-parser');
    // const cors = require('cors');
   

    // const app = express();
    // app.use(bodyParser.json());
    // app.use(cors());
    

    

   

    // let rounds = 0;
    // let player1Score = 0;
    // let player2Score = 0;

    // app.post('/play', (req, res) => {
    //     const { player1Choice, player2Choice } = req.body;

    //     if (rounds >= 6) {
    //         return res.status(400).json({ message: "Game over! No more rounds allowed." });
    //     }

    //     if (!['stone', 'paper', 'scissors'].includes(player1Choice) || !['stone', 'paper', 'scissors'].includes(player2Choice)) {
    //         return res.status(400).json({ message: "Invalid choice. Must be 'stone', 'paper', or 'scissors'." });
    //     }

    //     if (player1Choice === player2Choice) {
    //         rounds++;
    //         return res.json({ result: "It's a tie!", player1Score, player2Score, rounds });
    //     }

    //     const rules = {
    //         stone: { beats: 'scissors' },
    //         scissors: { beats: 'paper' },
    //         paper: { beats: 'stone' }
    //     };

    //     if (rules[player1Choice].beats === player2Choice) {
    //         player1Score++;
    //     } else {
    //         player2Score++;
    //     }

    //     rounds++;
    //     return res.json({ result: `Player ${player1Score > player2Score ? 1 : 2} wins!`, player1Score, player2Score, rounds });
    // });

    // app.listen(3001, () => console.log('Server started '));

    // ============================================

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/gameData', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const gameSchema = new mongoose.Schema({
    player1Name: String,
    player2Name: String,
    player1Choice: String,
    player2Choice: String,
    result: String,
    rounds: Number,
    player1Score: Number,
    player2Score: Number
});

const Game = mongoose.model('Game', gameSchema);

app.post('/play', async (req, res) => {
    const { player1Name, player2Name, player1Choice, player2Choice } = req.body;

    // Your game logic here

    const game = new Game({
        player1Name,
        player2Name,
        player1Choice,
        player2Choice,
        result: "Game result", // Replace with actual game result
        rounds: 1, // Replace with actual rounds
        player1Score: 1, // Replace with actual scores
        player2Score: 1 // Replace with actual scores
    });

    await game.save();

    res.json(game);
});

app.get('/game-data', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(3001, () => console.log('Server started'));
//===================================================

// server.js
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const GameData = require('./models/Gamedata');

// const app = express();
// const PORT = 3001;

// mongoose.connect('mongodb://localhost:27017/gameDataDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(bodyParser.json());
// app.use(cors());

// app.post('/game-data', async (req, res) => {
//   try {
//     const { player1, player2, rounds } = req.body;
//     const newGameData = new GameData({ player1, player2, rounds });
//     await newGameData.save();
//     res.status(201).json({ message: 'Game data saved successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

