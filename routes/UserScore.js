const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.post('/update-score', async (req, res) => {
    const { userID, score } = req.body;

    try {
        const user = await User.findOneAndUpdate({ uniqueId: userID }, { score }, { new: true });
        if (user) {
            res.status(200).send({ message: 'Score updated successfully!', user });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating score', error });
    }
});

module.exports = router;
