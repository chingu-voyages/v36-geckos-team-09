import { useState } from 'react';

import FlashcardsDataService from '../../../../services/flashcards_service';

import { NEW_FLASHCARD_INPUTS } from '../../../../utils-static/static';
import { NEW_FLASHCARD_RADIOS } from '../../../../utils-static/static';

import useDifficultyLevelClick from '../../../../custom-hooks/useDifficultyLevelClick';

import DifficultyLevelButtonGroup from '../../../difficulty-level-buttons/DifficultyLevelButtonGroup';

import '../../../../styles/collections/newFlashcard.scss';
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
import { flashcardSchema } from '../../../../joi-schemas/joiSchemas';

import { useDispatch } from 'react-redux';
import { collectionsSlice } from '../../../../redux/slices/collectionsSlice';

const NewFlashcard = ({ collectionName, handleClose }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [selectedRadio, setSelectedRadio] = useState('A');

    const { isDifficultyClicked, handleDifficultyClick } =
        useDifficultyLevelClick();

    const dispatch = useDispatch();

    const handleRadioChange = (e) => setSelectedRadio(e.target.value);

    const addNewFlashcard = async (data, selectedRadio, collectionName) => {
        const { question, answerA, answerB, answerC, answerD } = data;

        const flashcard = {
            collection_name: collectionName,
            prompt: question,
            answers: [answerA, answerB, answerC, answerD],
            right_answer: selectedRadio,
            difficulty: isDifficultyClicked.selectedDifficulty,
        };

        await FlashcardsDataService.createFlashcard(flashcard);

        dispatch(collectionsSlice.actions.setCollectionsTrigger());
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(flashcardSchema),
    });

    const submitAddFlashcardForm = (data) => {
        setIsButtonDisabled(true);

        addNewFlashcard(data, selectedRadio, collectionName);

        handleClose();
    };

    return (
        <form
            className='new-flashcard'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(submitAddFlashcardForm)}
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
                    onChange={handleRadioChange}
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

            <Box display='flex' flexDirection='column' alignItems='start'>
                <Typography fontSize='1.4rem' color='secondary' mb={1}>
                    Choose Flashcard Difficulty
                </Typography>

                <DifficultyLevelButtonGroup
                    isDifficultyClicked={isDifficultyClicked}
                    handleDifficultyClick={handleDifficultyClick}
                />
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
