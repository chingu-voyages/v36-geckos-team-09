import React, { useState } from 'react';

import OptionButton from '../option-button/OptionButton';

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
} from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

import { useSelector, useDispatch } from 'react-redux';
import { collectionsSlice } from '../../../redux/slices/collectionsSlice';

const CollectionTableRow = ({ row, index }) => {
    const [isRowOpen, setIsRowOpen] = useState(false);

    const collections = useSelector((state) => state.collections.collections);

    const selectedCollectionId = useSelector(
        (state) => state.collections.selectedCollectionId,
    );

    const dispatch = useDispatch();

    const rowIndex = index + 1;

    const rowItems = Object.values(row).slice(2);

    const rowId = row.id;

    const handleDropdownClick = () => setIsRowOpen((prevState) => !prevState);

    const handleDeleteClick = () => {
        const flashcards = collections[selectedCollectionId].flashcards;

        const newFlashcards = flashcards.filter(
            (flashcard) => flashcard.id !== rowId,
        );

        const filtered = {
            collectionId: selectedCollectionId,
            newFlashcards,
        };

        dispatch(collectionsSlice.actions.deleteFlashcard(filtered));
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
                        {row.question}
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
                        <Box margin={1}>
                            <Table size='small' aria-label='purchases'>
                                <TableBody>
                                    {rowItems.map((item, index) => {
                                        if (index === rowItems.length - 1) {
                                            return (
                                                <React.Fragment key={item}>
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
                                                            >
                                                                Correct Answer:
                                                            </Typography>{' '}
                                                            <Typography
                                                                variant='p'
                                                                color='secondary'
                                                                fontWeight={700}
                                                                fontSize='1.2rem'
                                                            >
                                                                {item}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className='collection__options-cell'>
                                                            <OptionButton
                                                                classToApply='collection'
                                                                text='Edit Flashcard'
                                                                icon={
                                                                    <BiEdit size='2rem' />
                                                                }
                                                            />
                                                            <OptionButton
                                                                classToApply='collection'
                                                                handleClick={
                                                                    handleDeleteClick
                                                                }
                                                                text='Delete Flashcard'
                                                                icon={
                                                                    <MdDelete size='2rem' />
                                                                }
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            );
                                        }

                                        return (
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
                                                    >
                                                        {ANSWER_PREFIX[index]}:
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
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CollectionTableRow;
