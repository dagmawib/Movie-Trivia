const mongoose = require('mongoose');
const User = require('./models/User'); 
const dorenv = require('dotenv')

dorenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.USER_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const newUser = new User({
            username: "Dagi",
            email: "dagibelay1430@gmail.com"
        });

        await newUser.save();
        console.log('User saved successfully!');
    } catch (error) {
        console.error('Failed to connect to MongoDB or save user', error);
    } 
}

run();