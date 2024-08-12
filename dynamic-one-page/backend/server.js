const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mahesh@123',
    database: 'bannerDB',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Endpoint to get all banner settings
app.get('/banners', (req, res) => {
    const query = 'SELECT * FROM bannerSettings ORDER BY createdAt DESC';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Endpoint to add a new banner setting
app.post('/banner', (req, res) => {
    const { description, timer, link, showBanner } = req.body;
    const query = `
        INSERT INTO bannerSettings (description, timer, link, showBanner, createdAt)
        VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(query, [description, timer, link, showBanner], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Banner settings added successfully' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
