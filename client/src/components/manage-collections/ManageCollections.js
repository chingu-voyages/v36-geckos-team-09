import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import FlashcardsDataService from '../../services/flashcards_service';

import Collections from './Collections';

import '../../styles/manageCollections.scss';
import { Button, Box, Popover, Input, Typography } from '@mui/material';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

import { format } from 'fecha';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { addNewCollectionSchema } from '../../utils';

import { useDispatch } from 'react-redux';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

const ManageCollections = () => {
    const [flashcards, setFlashcards] = useState([]);
    /* const [searchPrompt, setSearchPrompt ] = useState(""); */

    useEffect(() => {
        retrieveFlashcards();
    }, [flashcards]);

    /*   const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };
 */

    const retrieveFlashcards = () => {
        FlashcardsDataService.getAll()
            .then((response) => {
                //console.log(response.data);
                setFlashcards(response.data.flashcards);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    /*   const refreshList = () => {
    retrieveFlashcards();
  }; */

    const find = (query, by) => {
        FlashcardsDataService.find(query, by)
            .then((response) => {
                console.log(response.data);
                setFlashcards(response.data.flashcards);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteFlashcard = (flashcardId, index) => {
        FlashcardsDataService.deleteFlashcard(flashcardId)
            .then((response) => {})
            .catch((e) => {
                console.log(e);
            });
    };

    /*   const findByName = () => {
    find(searchName, "name")
  }; */

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;

    const handleAddClick = (e) => setAnchorEl(e.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: joiResolver(addNewCollectionSchema),
    });

    const submitForm = (data) => {
        const id = uuidv4();
        const name = data.collectionName;
        const date = format(new Date(), 'mediumDate');

        const newCollection = {
            id,
            name,
            date,
        };

        dispatch(collectionsSlice.actions.addNewCollection(newCollection));

        setAnchorEl(null);

        reset();
    };

    return (
        <Box>
            <Button
                className='manage-collections__add-btn'
                onClick={handleAddClick}
                color='secondary'
                variant='outlined'
                startIcon={isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
                aria-describedby={id}
            >
                Add New Collection
            </Button>
            <Popover
                className='manage-collections__dropdown'
                id={id}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <form
                    className='manage-collections__form'
                    onSubmit={handleSubmit(submitForm)}
                    noValidate
                    autoComplete='off'
                >
                    <Input
                        className='manage-collections__input'
                        type='text'
                        autoFocus
                        placeholder='Collection name'
                        name='collectionName'
                        {...register('collectionName')}
                    />

                    <Button
                        className='manage-collections__submit-btn'
                        type='submit'
                        color='secondary'
                    >
                        <BsFillArrowRightSquareFill size='2rem' />
                    </Button>
                </form>
                <Typography mb={1} ml={1} className='new-flashcard__error'>
                    {errors.collectionName && 'This field is required!'}
                </Typography>
            </Popover>

            <Collections />

            <div>
                <Link to={'/collections/add-flashcard'}>Add Flashcard</Link>

                <br></br>
                <br></br>

                {flashcards.map((flashcard, index) => {
                    return (
                        <div key={flashcard._id}>
                            <div className='flashcard'>
                                <div className='flashcard-body'>
                                    <h2 className='flashcard-prompt'>
                                        {flashcard.prompt}
                                    </h2>
                                    <p className='flashcard-text'>
                                        <strong>1: </strong>
                                        {flashcard.answers[0]}
                                        <br />
                                        <strong>2: </strong>
                                        {flashcard.answers[1]}
                                        <br />
                                        <strong>3: </strong>
                                        {flashcard.answers[2]}
                                        <br />
                                        <strong>4: </strong>
                                        {flashcard.answers[3]}
                                        <br />
                                        <strong>Right Answer: </strong>
                                        {flashcard.right_answer}
                                        <br /> {/* for testing purposes */}
                                    </p>
                                </div>
                                <Link
                                    to={`/collections/edit-flashcard/${flashcard._id}`}
                                >
                                    Edit Flashcard
                                </Link>
                                <button
                                    onClick={() =>
                                        deleteFlashcard(flashcard._id, index)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Box>
    );
};

export default ManageCollections;
