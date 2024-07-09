const mongoose = require('mongoose');
const {Friends, HIMYM, Office} = require('./models/Movie'); // Adjust the path to your model
const dorenv = require('dotenv')

dorenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const newMovieOne = new Friends({
            question: "Who pees on Monica's leg when she gets stung by a jellyfish?",
            choice: ['Chandler', 'Joey', "Ross", "Rachel"],
            correct_answer: "Chandler"
        });
        const newMovieTwo = new HIMYM({
            question: "Who does Barney end up marrying?",
            choice: ["Quinn", "Nora", 'Robin', 'Patrice'],
            correct_answer: "Robin"
        });
        const newMovieThree = new Office({
            question: 'What is the secret code that Jim uses to get into the building during "The Alliance" episode?',
            choice: ['1-2-3-4', " 9-3-2-2", '7-2-1-9', " 8-6-7-5"],
            correct_answer: " 9-3-2-2"
        });

        await newMovieOne.save();
        await newMovieTwo.save();
        await newMovieThree.save();
        console.log('Movie saved successfully!');
    } catch (error) {
        console.error('Failed to connect to MongoDB or save movie', error);
    } 
}

run();