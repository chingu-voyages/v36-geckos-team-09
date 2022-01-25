import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import FlashcardsDataService from '../../services/flashcards_service';

import Collections from './Collections';

import '../../styles/manageCollections.scss';
import { Button, Box, Popover, Input } from '@mui/material';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

import { format } from 'fecha';

import { v4 as uuidv4 } from 'uuid';

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

    const [collections, setCollections] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleAddClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCollectionName = e.target.elements['collection-name'].value;

        if (newCollectionName) {
            const newCollectionDate = format(new Date(), 'mediumDate');

            const newCollection = {
                id: uuidv4(),
                name: newCollectionName,
                date: newCollectionDate,
            };

            setCollections((prevState) => [...prevState, newCollection]);

            setAnchorEl(null);
        }
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
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete='off'
                >
                    <Input
                        className='manage-collections__input'
                        fullWidth
                        autoFocus
                        placeholder='Collection name'
                        name='collection-name'
                    />
                    <Button
                        className='manage-collections__submit-btn'
                        type='submit'
                        color='secondary'
                    >
                        <BsFillArrowRightSquareFill size='2rem' />
                    </Button>
                </form>
            </Popover>

            <Collections collections={collections} />

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
