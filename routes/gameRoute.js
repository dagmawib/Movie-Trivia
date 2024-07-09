const express = require('express');
const router = express.Router();
const { Friends, HIMYM, Office } = require('../models/Movie');

router.use(express.json());

// Route to fetch Friends questions

router.get('/trivia/:movieType', async (req, res) => {
    const { movieType } = req.params;
    try {
        let triviaQuestions = [];
        if (movieType === 'friends') {
            triviaQuestions = await Friends.find({});
        } else if (movieType === 'how-i-met-your-mother') {
            triviaQuestions = await HIMYM.find({});
        } else if (movieType === 'the-office') {
            triviaQuestions = await Office.find({});
        }
        res.json({ title: `${movieType.replace(/-/g, ' ')} Trivia`, questions: triviaQuestions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;