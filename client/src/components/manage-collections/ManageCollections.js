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
    const [duplicateCollectionNameError, setDuplicateCollectionNameError] =
        useState(false);

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

    const submitForm = async (data) => {
        const collectionName = data.collectionName;

        const newCollection = {
            collection_name: collectionName,
        };

        const res = await FlashcardsDataService.getAll();

        const collections = res.data.flashcards;

        const existingCollectionNames = collections.reduce(
            (collectionNames, collection) => {
                if (!collectionNames.includes(collection.collection_name))
                    collectionNames.push(collection.collection_name);
                return collectionNames;
            },
            [],
        );

        if (existingCollectionNames.indexOf(collectionName) !== -1) {
            setDuplicateCollectionNameError(true);

            setTimeout(() => {
                setDuplicateCollectionNameError(false);
            }, 1500);

            return;
        }

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
                <Typography
                    className='new-flashcard__error'
                    mb={1}
                    ml='1rem'
                    fontSize='1.1rem'
                >
                    {errors.collectionName?.message}
                </Typography>
                <Typography
                    className={
                        duplicateCollectionNameError
                            ? 'manage-collections__error manage-collections__fade-in'
                            : 'manage-collections__error'
                    }
                    mb={1}
                    ml='1rem'
                    fontSize='1.1rem'
                >
                    {duplicateCollectionNameError &&
                        'Collection already exist!'}
                </Typography>
            </Popover>

            <Collections />
            {/* <TestCollection /> */}
        </Box>
    );
};

export default ManageCollections;
