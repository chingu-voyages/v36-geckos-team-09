import { useState } from 'react';

import { NEW_FLASHCARD_INPUTS } from '../../../../static';

import '../../../../styles/newFlashcard.scss';
import { Input, Button, Box, Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { newFlashcardSchema } from '../../../../utils';

import { useDispatch, useSelector } from 'react-redux';
import { collectionsSlice } from '../../../../redux/slices/collectionsSlice';

const NewFlashcard = ({ handleClose }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const selectedCollectionId = useSelector(
        (state) => state.collections.selectedCollectionId,
    );

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(newFlashcardSchema),
    });

    const submitForm = (data) => {
        setIsButtonDisabled(true);

        const { question, answerA, answerB, answerC, answerD, correctAnswer } =
            data;

        const newFlashcard = {
            collectionId: selectedCollectionId,
            flashcard: {
                id: uuidv4(),
                question,
                answerA,
                answerB,
                answerC,
                answerD,
                correctAnswer,
            },
        };

        dispatch(collectionsSlice.actions.addNewFlashcard(newFlashcard));

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
                                </Typography>
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
                    disabled={isButtonDisabled}
                >
                    Add
                </Button>
            </Box>
        </form>
    );
};

export default NewFlashcard;
