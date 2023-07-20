const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const PORT = process.env.PORT;
const app = express();
app.use(cors());

// --------------------------deployment------------------------------

if (process.env.NODE_ENV === 'production') {
    console.log(path.join(__dirname, '..', 'dist/index.html'));
    app.use(express.static(path.join(__dirname, '..', 'dist')));
    app.get('/myserver', (req, res) => {
        res.json({
            server: process.env.PORT,
            Real_IP: req.headers['x-real-ip'],
            'X-Forwarded-For': req.headers['x-forwarded-for'],
        });
    });
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist/index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('API is running..');
    });
}

// --------------------------deployment------------------------------

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
