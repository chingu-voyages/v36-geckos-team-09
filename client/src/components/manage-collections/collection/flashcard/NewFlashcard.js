import { NEW_FLASHCARD_INPUTS } from '../../../../static';

import '../../../../styles/newFlashcard.scss';
import { Input, Button, Box, Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { newFlashcardSchema } from '../../../../utils';

const NewFlashcard = ({ setFlashCardsCollection, handleClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(newFlashcardSchema),
    });

    const submitForm = (data) => {
        const flashcardValues = {
            id: uuidv4(),
            question: data.question,
            answerA: data.answerA,
            answerB: data.answerB,
            answerC: data.answerC,
            answerD: data.answerD,
            correctAnswer: data.correctAnswer,
        };

        setFlashCardsCollection((prevState) => [...prevState, flashcardValues]);

        handleClose();
    };

    return (
        <form
            className='new-flashcard'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(submitForm)}
        >
            <Box width='500px'>
                {NEW_FLASHCARD_INPUTS.map((input) => {
                    if (input.id === 5) {
                        return (
                            <Box key={input.id}>
                                <Input
                                    className={`new-flashcard__${input.class}`}
                                    type='text'
                                    placeholder={input.placeholder}
                                    name={input.name}
                                    {...register(`${input.name}`)}
                                />
                                <Typography className='new-flashcard__error'>
                                    {errors[`${input.name}`] &&
                                        'Incorrect input!'}
                                </Typography>{' '}
                            </Box>
                        );
                    }

                    return (
                        <Box key={input.id}>
                            <Input
                                className={`new-flashcard__${input.class}`}
                                type='text'
                                placeholder={input.placeholder}
                                name={input.name}
                                {...register(`${input.name}`)}
                            />
                            <Typography className='new-flashcard__error'>
                                {errors[`${input.name}`] &&
                                    'This field is required!'}
                            </Typography>{' '}
                        </Box>
                    );
                })}
            </Box>

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
