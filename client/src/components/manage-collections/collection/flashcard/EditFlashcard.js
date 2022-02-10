import { NEW_FLASHCARD_INPUTS } from '../../../../static';

import '../../../../styles/collection.scss';
import {
    Box,
    Typography,
    Input,
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
} from '@mui/material';
import { FaCheck } from 'react-icons/fa';
import { AiFillCloseSquare } from 'react-icons/ai';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editFlashcardSchema } from '../../../../utils';

import { useSelector, useDispatch } from 'react-redux';
import { collectionsSlice } from '../../../../redux/slices/collectionsSlice';

const EditFlashcard = ({ row, handleEditAndCloseClick }) => {
    const collections = useSelector((state) => state.collections.collections);

    const selectedCollectionId = useSelector(
        (state) => state.collections.selectedCollectionId,
    );

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(editFlashcardSchema),
    });

    const submitForm = (data) => {
        const flashcardId = row.id;

        const newCollections = { ...collections };

        const newFlashcardValues = {
            ...row,
            question: data.question,
            answerA: data.answerA,
            answerB: data.answerB,
            answerC: data.answerC,
            answerD: data.answerD,
            correctAnswer: data.correctAnswer,
        };

        const selectedFlashcard = newCollections[
            selectedCollectionId
        ].flashcards.find((flashcard) => flashcard.id === flashcardId);

        const index =
            newCollections[selectedCollectionId].flashcards.indexOf(
                selectedFlashcard,
            );

        const newFlashcard = {
            newFlashcardValues,
            index,
            collectionId: selectedCollectionId,
        };

        dispatch(collectionsSlice.actions.editFlashcard(newFlashcard));

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
                            if (input.id === 5) {
                                return (
                                    <Box key={input.id}>
                                        <Input
                                            className='collection__edit-flashcard-input'
                                            type='text'
                                            placeholder={input.placeholder}
                                            defaultValue={row[input.name]}
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
                                        defaultValue={row[input.name]}
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
                        <Tooltip
                            title={
                                <Typography fontSize='1.1rem'>
                                    Save Changes
                                </Typography>
                            }
                            placement='top-end'
                            arrow
                        >
                            <IconButton
                                className='collection__option'
                                onClick={handleSubmit(submitForm)}
                            >
                                <FaCheck />
                            </IconButton>
                        </Tooltip>

                        <Tooltip
                            title={
                                <Typography fontSize='1.1rem'>Close</Typography>
                            }
                            placement='top-end'
                            arrow
                        >
                            <IconButton
                                className='collection__option'
                                onClick={handleEditAndCloseClick}
                            >
                                <AiFillCloseSquare />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </form>
            </TableCell>
        </TableRow>
    );
};

export default EditFlashcard;
