import { NEW_FLASHCARD_INPUTS } from '../../../../static';

import FlashcardsDataService from '../../../../services/flashcards_service';

import OptionButtonSave from '../../option-buttons/OptionButtonSave';
import OptionButtonClose from '../../option-buttons/OptionButtonClose';

import '../../../../styles/collection.scss';
import { Box, Typography, Input, TableRow, TableCell } from '@mui/material';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editFlashcardSchema } from '../../../../joiSchemas';

import { useSelector } from 'react-redux';

const EditFlashcard = ({ row, handleEditAndCloseClick }) => {
    const {
        _id,
        prompt: rowQuestion,
        answers: rowAnswers,
        right_answer: rowCorrectAnswer,
    } = row;

    const selectedCollectionName = useSelector(
        (state) => state.collections.selectedCollectionName,
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(editFlashcardSchema),
    });

    const submitForm = (data) => {
        const { question, answerA, answerB, answerC, answerD, correctAnswer } =
            data;

        const editedFlashcard = {
            _id,
            collection_name: selectedCollectionName,
            prompt: question,
            answers: [answerA, answerB, answerC, answerD],
            right_answer: correctAnswer,
        };

        FlashcardsDataService.updateFlashcard(editedFlashcard);

        handleEditAndCloseClick();
    };

    return (
        <TableRow>
            <TableCell>
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
                                    <Box key={input.id}>
                                        <Input
                                            className='collection__edit-flashcard-input'
                                            type='text'
                                            placeholder={input.placeholder}
                                            defaultValue={rowQuestion}
                                            name={input.name}
                                            {...register(`${input.name}`)}
                                        />
                                        <Typography className='new-flashcard__error'>
                                            {errors[`${input.name}`] &&
                                                'This field is required!'}
                                        </Typography>
                                    </Box>
                                );
                            }

                            if (input.id === 5) {
                                return (
                                    <Box key={input.id}>
                                        <Input
                                            className='collection__edit-flashcard-input'
                                            type='text'
                                            placeholder={input.placeholder}
                                            defaultValue={rowCorrectAnswer}
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
                                        className='collection__edit-flashcard-input'
                                        type='text'
                                        placeholder={input.placeholder}
                                        defaultValue={rowAnswers[input.id - 1]}
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
            </TableCell>
        </TableRow>
    );
};

export default EditFlashcard;
