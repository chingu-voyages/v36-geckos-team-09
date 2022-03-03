import { useState } from 'react';

import FlashcardsDataService from '../../../services/flashcards_service';

import EditFlashcard from './flashcard/EditFlashcard';

import OptionButtonEdit from '../option-buttons/OptionButtonEdit';
import OptionButtonDelete from '../option-buttons/OptionButtonDelete';

import { ANSWER_PREFIX } from '../../../static';

import {
    Box,
    Typography,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Chip,
} from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { useDispatch } from 'react-redux';
import { collectionsSlice } from '../../../redux/slices/collectionsSlice';

const CollectionTableRow = ({ row, index }) => {
    const {
        _id: rowId,
        prompt: rowQuestion,
        answers: rowAnswers,
        right_answer: rowCorrectAnswer,
        difficulty: rowDifficulty,
    } = row;

    const rowIndex = index + 1;

    const [isRowOpen, setIsRowOpen] = useState(false);

    const [isEditable, setIsEditable] = useState(false);

    const dispatch = useDispatch();

    const handleDropdownClick = () => setIsRowOpen((prevState) => !prevState);

    const handleEditAndCloseClick = () =>
        setIsEditable((prevState) => !prevState);

    const handleDeleteClick = async () => {
        await FlashcardsDataService.deleteFlashcard(rowId);

        dispatch(collectionsSlice.actions.setCollectionsTrigger());
    };

    return (
        <>
            {!isEditable && (
                <>
                    <TableRow>
                        <TableCell component='th' scope='row'>
                            <Typography
                                variant='h6'
                                fontWeight={700}
                                fontSize='1.3rem'
                                mr='0.3rem'
                                display='inline'
                                color='secondary'
                            >
                                <Typography
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
                                color='secondary'
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
                            <Collapse
                                in={isRowOpen}
                                timeout='auto'
                                unmountOnExit
                            >
                                <Box margin={1}>
                                    <Table size='small' aria-label='purchases'>
                                        <TableBody>
                                            {rowAnswers.map((item, index) => (
                                                <TableRow key={item}>
                                                    <TableCell
                                                        component='th'
                                                        scope='row'
                                                    >
                                                        <Typography
                                                            className='collection__prefix'
                                                            variant='p'
                                                            fontWeight={700}
                                                            fontSize='1.2rem'
                                                            mr='0.2rem'
                                                            color='secondary'
                                                        >
                                                            {
                                                                ANSWER_PREFIX[
                                                                    index
                                                                ]
                                                            }
                                                            :
                                                        </Typography>
                                                        <Typography
                                                            variant='p'
                                                            fontSize='1.1rem'
                                                            color='white'
                                                        >
                                                            {item}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                >
                                                    <Typography
                                                        className='collection__prefix'
                                                        variant='p'
                                                        fontWeight={700}
                                                        fontSize='1.2rem'
                                                        color='secondary'
                                                    >
                                                        Correct Answer:{' '}
                                                    </Typography>
                                                    <Typography
                                                        variant='p'
                                                        color='secondary'
                                                        fontWeight={700}
                                                        fontSize='1.2rem'
                                                        color='white'
                                                    >
                                                        {rowCorrectAnswer}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                >
                                                    <Typography
                                                        className='collection__prefix'
                                                        variant='p'
                                                        fontWeight={700}
                                                        fontSize='1.2rem'
                                                        mr={1}
                                                        color='secondary'
                                                    >
                                                        Flashcard Difficulty
                                                        Level:
                                                    </Typography>
                                                    <Chip
                                                        label={
                                                            <Typography
                                                                className='new-flashcard__difficulty-chip'
                                                                fontSize='1.2rem'
                                                            >
                                                                {rowDifficulty}
                                                            </Typography>
                                                        }
                                                        color={
                                                            rowDifficulty ===
                                                            'easy'
                                                                ? 'primary'
                                                                : rowDifficulty ===
                                                                  'medium'
                                                                ? 'warning'
                                                                : 'error'
                                                        }
                                                        variant='contained'
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className='collection__options-cell'>
                                                    <OptionButtonEdit
                                                        classToApply='collection'
                                                        handleClick={
                                                            handleEditAndCloseClick
                                                        }
                                                        text='Edit Flashcard'
                                                    />

                                                    <OptionButtonDelete
                                                        classToApply='collection'
                                                        handleClick={
                                                            handleDeleteClick
                                                        }
                                                        text='Flashcard'
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </>
            )}

            {isEditable && (
                <EditFlashcard
                    row={row}
                    rowIndex={rowIndex}
                    handleEditAndCloseClick={handleEditAndCloseClick}
                />
            )}
        </>
    );
};

export default CollectionTableRow;
