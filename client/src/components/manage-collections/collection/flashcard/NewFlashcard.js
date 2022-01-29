import { NEW_FLASHCARD_INPUTS } from '../../../../static';

import '../../../../styles/newFlashcard.scss';
import { Input, Button, Box } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

const NewFlashcard = ({ setFlashCardsCollection }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const flashcardValues = {
            id: uuidv4(),
            question: e.target.elements.question.value,
            answerA: e.target.elements['answer-a'].value,
            answerB: e.target.elements['answer-b'].value,
            answerC: e.target.elements['answer-c'].value,
            answerD: e.target.elements['answer-d'].value,
            correctAnswer: e.target.elements['correct-answer'].value,
        };

        setFlashCardsCollection((prevState) => [...prevState, flashcardValues]);
    };

    return (
        <form
            className='new-flashcard'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit}
        >
            {NEW_FLASHCARD_INPUTS.map((input) => (
                <Input
                    className={`new-flashcard__${input.class}`}
                    key={input.id}
                    type='text'
                    placeholder={input.placeholder}
                    name={input.name}
                />
            ))}
            <Box display='flex' justifyContent='end' mt={1}>
                <Button
                    className='new-flashcard__submit-btn'
                    variant='contained'
                    size='large'
                    color='secondary'
                    type='submit'
                >
                    Add
                </Button>
            </Box>
        </form>
    );
};

export default NewFlashcard;
