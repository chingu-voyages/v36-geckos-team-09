export const NAVBAR_BUTTONS = [
    { id: 0, text: 'home', link: '/' },
    { id: 1, text: 'play', link: '/play' },
    { id: 2, text: 'about us', link: '/about' },
    { id: 3, text: 'manage collections', link: '/manage-collections' },
];

export const ANSWER_PREFIX = ['A', 'B', 'C', 'D'];

export const NEW_FLASHCARD_INPUTS = [
    { id: 0, placeholder: 'Question *', name: 'question', class: 'question' },
    { id: 1, placeholder: 'Answer A *', name: 'answerA', class: 'answer' },
    { id: 2, placeholder: 'Answer B *', name: 'answerB', class: 'answer' },
    {
        id: 3,
        placeholder: 'Answer C *',
        name: 'answerC',
        class: 'answer',
    },
    {
        id: 4,
        placeholder: 'Answer D *',
        name: 'answerD',
        class: 'answer',
    },
    {
        id: 5,
        placeholder: 'Correct Answer (A, B, C, D) *',
        name: 'correctAnswer',
        class: 'answer',
    },
];

// The function iterates through array of objects and throws out duplicates based on the passed key
export const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
};
