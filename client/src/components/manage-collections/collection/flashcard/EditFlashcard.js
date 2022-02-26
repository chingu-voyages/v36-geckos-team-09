import { useState } from 'react';

import DifficultyLevelButtonGroup from '../../../difficulty-level-buttons/DifficultyLevelButtonGroup';

import { NEW_FLASHCARD_INPUTS } from '../../../../static';
import { NEW_FLASHCARD_RADIOS } from '../../../../static';

import FlashcardsDataService from '../../../../services/flashcards_service';

import useDifficultyLevelClick from '../../../../custom-hooks/useDifficultyLevelClick';

import OptionButtonSave from '../../option-buttons/OptionButtonSave';
import OptionButtonClose from '../../option-buttons/OptionButtonClose';

import EditFlashcardInput from './EditFlashcardInput';

import '../../../../styles/collection.scss';
import {
    Box,
    TableRow,
    TableCell,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    IconButton,
    Collapse,
} from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editFlashcardSchema } from '../../../../joiSchemas';

import { useSelector, useDispatch } from 'react-redux';
import { collectionsSlice } from '../../../../redux/slices/collectionsSlice';

const EditFlashcard = ({ row, rowIndex, handleEditAndCloseClick }) => {
    const {
        _id,
        collection_name: selectedCollectionName,
        prompt: rowQuestion,
        answers: rowAnswers,
        right_answer: rowCorrectAnswer,
        difficulty: rowDifficulty,
    } = row;

    const collectionToDisplay = useSelector(
        (state) => state.collections.collectionToDisplay,
    );

    const { isDifficultyClicked, handleDifficultyClick } =
        useDifficultyLevelClick(rowDifficulty);

    const [selectedRadio, setSelectedRadio] = useState(rowCorrectAnswer);

    const [isRowOpen, setIsRowOpen] = useState(true);

    const dispatch = useDispatch();

    const handleDropdownClick = () => setIsRowOpen((prevState) => !prevState);

    const handleChange = (e) => setSelectedRadio(e.target.value);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(editFlashcardSchema),
    });

    const submitForm = (data) => {
        const { question, answerA, answerB, answerC, answerD } = data;

        const editedFlashcard = {
            _id,
            collection_name: selectedCollectionName,
            prompt: question,
            answers: [answerA, answerB, answerC, answerD],
            right_answer: selectedRadio,
            difficulty: isDifficultyClicked.selectedDifficulty,
        };

        const newCollectionToDisplay = [...collectionToDisplay];

        const editedCollectionToDisplay = newCollectionToDisplay.map(
            (flashcard) => {
                if (flashcard._id === _id) {
                    return {
                        ...flashcard,
                        prompt: question,
                        answers: [answerA, answerB, answerC, answerD],
                        right_answer: selectedRadio,
                        difficulty: isDifficultyClicked.selectedDifficulty,
                    };
                }

                return flashcard;
            },
        );

        dispatch(
            collectionsSlice.actions.setCollectionToDisplay(
                editedCollectionToDisplay,
            ),
        );

        FlashcardsDataService.updateFlashcard(editedFlashcard);

        handleEditAndCloseClick();
    };

    return (
        <>
            <TableRow>
                <TableCell component='th' scope='row'>
                    <Typography
                        className='collection__prefix'
                        variant='h6'
                        fontWeight={700}
                        fontSize='1.3rem'
                        mr='0.3rem'
                        display='inline'
                    >
                        <Typography
                            className='collection__prefix'
                            variant='span'
                            fontWeight={700}
                            fontSize='1rem'
                            mr='1rem'
                            color='white'
                        >
                            {rowIndex}.
                        </Typography>
                        Q:
                    </Typography>
                    <Typography
                        variant='h6'
                        fontSize='1.2rem'
                        color='white'
                        display='inline'
                    >
                        {rowQuestion}
                    </Typography>
                </TableCell>
                <TableCell className='collection__question-cell'>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={handleDropdownClick}
                    >
                        {isRowOpen ? (
                            <IoIosArrowUp size='1.5rem' />
                        ) : (
                            <IoIosArrowDown size='1.5rem' />
                        )}
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={isRowOpen} timeout='auto' unmountOnExit>
                        <form
                            className='new-flashcard'
                            noValidate
                            autoComplete='off'
                            onSubmit={handleSubmit(submitForm)}
                        >
                            <Box maxWidth='500px'>
                                {NEW_FLASHCARD_INPUTS.map((input) => {
                                    if (input.id === 0) {
                                        return (
                                            <EditFlashcardInput
                                                key={input.id}
                                                input={input}
                                                defaultValue={rowQuestion}
                                                register={register}
                                                errors={errors}
                                            />
                                        );
                                    }

                                    return (
                                        <EditFlashcardInput
                                            key={input.id}
                                            input={input}
                                            defaultValue={
                                                rowAnswers[input.id - 1]
                                            }
                                            register={register}
                                            errors={errors}
                                        />
                                    );
                                })}
                            </Box>

                            <FormControl>
                                <FormLabel
                                    className='new-flashcard__form-label new-flashcard__form-label-edit'
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
                                            control={
                                                <Radio color='secondary' />
                                            }
                                            label={
                                                <Typography
                                                    fontWeight='500'
                                                    fontSize='1.2rem'
                                                >
                                                    {radio.value}
                                                </Typography>
                                            }
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <Box
                                display='flex'
                                flexDirection='column'
                                alignItems='start'
                            >
                                <Typography
                                    fontSize='1.4rem'
                                    fontWeight={500}
                                    color='secondary'
                                    mb={1}
                                >
                                    Choose Flashcard Difficulty
                                </Typography>

                                <DifficultyLevelButtonGroup
                                    isDifficultyClicked={isDifficultyClicked}
                                    handleDifficultyClick={
                                        handleDifficultyClick
                                    }
                                />
                            </Box>

                            <Box display='flex' justifyContent='end' mt={1}>
                                <OptionButtonSave
                                    classToApply='collection__option'
                                    handleClick={handleSubmit(submitForm)}
                                    text='Save Changes'
                                />

                                <OptionButtonClose
                                    classToApply='collection__option'
                                    handleClick={handleEditAndCloseClick}
                                    text='Close'
                                />
                            </Box>
                        </form>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default EditFlashcard;
