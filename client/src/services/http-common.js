import axios from 'axios';

export default axios.create({
    /* baseURL: 'http://localhost:4000/api/v1/flashcards', for dev */
    baseURL: 'https://kadeu.herokuapp.com/api/v1/flashcards',  
    headers: {
        'Content-type': 'application/json',
    },
});
