// backend/routes/user.js
const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const router = express.Router();

router.post('/register', (req, res) => {
    const { name, username, password, phone, email } = req.body;

    const userData = {
        user: {
            name,
            username,
            password,
            phone,
            email,
        },
    };

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(userData);

    fs.writeFile('Test.xml', xml, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving data to XML file.' });
        }
        res.status(201).json({ message: 'User registered and saved to XML.' });
    });
});

module.exports = router;
