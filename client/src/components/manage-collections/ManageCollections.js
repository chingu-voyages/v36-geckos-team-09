import { useState } from 'react';

import FlashcardsDataService from '../../services/flashcards_service';

import Collections from './Collections';

import '../../styles/manageCollections.scss';
import { Button, Box, Popover, Input, Typography } from '@mui/material';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { addNewCollectionSchema } from '../../utils';

import TestCollection from './tests/TestCollection';

const ManageCollections = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;

    const handleAddClick = (e) => setAnchorEl(e.currentTarget);

    const handleCloseClick = () => {
        reset();
        setAnchorEl(null);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: joiResolver(addNewCollectionSchema),
    });

    const submitForm = (data) => {
        const collectionName = data.collectionName;

        const newCollection = {
            collection_name: collectionName,
        };

        FlashcardsDataService.createCollection(newCollection);

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
                onClose={handleCloseClick}
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
            {/* <TestCollection /> */}
        </Box>
    );
};

export default ManageCollections;
