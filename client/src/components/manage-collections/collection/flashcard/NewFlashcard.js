import { useState } from 'react';

import { NEW_FLASHCARD_INPUTS } from '../../../../static';
import { NEW_FLASHCARD_RADIOS } from '../../../../static';

import FlashcardsDataService from '../../../../services/flashcards_service';

import '../../../../styles/newFlashcard.scss';
import {
    Input,
    Button,
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { newFlashcardSchema } from '../../../../joiSchemas';

import { useSelector, useDispatch } from 'react-redux';
import { collectionsSlice } from '../../../../redux/slices/collectionsSlice';

const NewFlashcard = ({ collectionName, handleClose }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [selectedRadio, setSelectedRadio] = useState('A');

    const collectionToDisplay = useSelector(
        (collection) => collection.collections.collectionToDisplay,
    );

    const dispatch = useDispatch();

    const handleChange = (e) => setSelectedRadio(e.target.value);

    const addNewFlashcard = (data, selectedRadio, collectionName) => {
        const { question, answerA, answerB, answerC, answerD } = data;

        const flashcard = {
            collection_name: collectionName,
            prompt: question,
            answers: [answerA, answerB, answerC, answerD],
            right_answer: selectedRadio,
        };

        const newCollectionToDisplayState = [...collectionToDisplay, flashcard];

        dispatch(
            collectionsSlice.actions.setCollectionToDisplay(
                newCollectionToDisplayState,
            ),
        );

        FlashcardsDataService.createFlashcard(flashcard);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(newFlashcardSchema),
    });

    const submitForm = (data) => {
        setIsButtonDisabled(true);

        addNewFlashcard(data, selectedRadio, collectionName);

        handleClose();
    };

    return (
        <form
            className='new-flashcard'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(submitForm)}
        >
            <Box width='500px' mb={1}>
                {NEW_FLASHCARD_INPUTS.map((input) => (
                    <Box key={input.id}>
                        <Input
                            className={'new-flashcard__input'}
                            type='text'
                            placeholder={input.placeholder}
                            name={input.name}
                            {...register(`${input.name}`)}
                        />
                        <Typography className='new-flashcard__error'>
                            {errors[`${input.name}`]?.message}
                        </Typography>{' '}
                    </Box>
                ))}
            </Box>

            <FormControl>
                <FormLabel
                    className='new-flashcard__form-label'
                    id='demo-row-radio-buttons-group-label'
                >
                    Correct Answer
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={selectedRadio}
                    onChange={handleChange}
                >
                    {NEW_FLASHCARD_RADIOS.map((radio) => (
                        <FormControlLabel
                            key={radio.id}
                            value={radio.value}
                            control={<Radio color='secondary' />}
                            label={
                                <Typography fontWeight='500' fontSize='1.2rem'>
                                    {radio.value}
                                </Typography>
                            }
                        />
                    ))}
                </RadioGroup>
            </FormControl>

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
