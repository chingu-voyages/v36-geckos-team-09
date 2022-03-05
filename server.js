import express from 'express';
import cors from 'cors';
import flashcards from './api/flashcards.route.js';
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/flashcards', flashcards);

//server static assets
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    })
}
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
