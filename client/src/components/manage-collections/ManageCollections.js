import { useState } from 'react';

import FlashcardsDataService from '../../services/flashcards_service';

import { getCollectionNames } from '../../utils-static/utils';

import Collections from './Collections';

import '../../styles/collections/manageCollections.scss';
import { Button, Box, Popover, Input, Typography } from '@mui/material';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { addNewCollectionSchema } from '../../joi-schemas/joiSchemas';

import { useDispatch } from 'react-redux';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

const ManageCollections = () => {
    const [duplicateCollectionNameError, setDuplicateCollectionNameError] =
        useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;

    const dispatch = useDispatch();

    const handleAddClick = (e) => {
        setAnchorEl(e.currentTarget);

        reset();
    };

    const handleCloseClick = () => {
        setAnchorEl(null);

        reset();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: joiResolver(addNewCollectionSchema),
    });

    const submitAddCollectionForm = async (data) => {
        const collectionName = data.collectionName;

        const newCollection = {
            collection_name: collectionName,
        };

        const existingCollectionNames = await getCollectionNames();

        if (existingCollectionNames.indexOf(collectionName) !== -1) {
            setDuplicateCollectionNameError(true);

            setTimeout(() => {
                setDuplicateCollectionNameError(false);
            }, 1500);

            return;
        }

        await FlashcardsDataService.createCollection(newCollection);

        dispatch(collectionsSlice.actions.setCollectionsTrigger());

        setAnchorEl(null);
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
                    onSubmit={handleSubmit(submitAddCollectionForm)}
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
                        'Collection name already exist!'}
                </Typography>
            </Popover>

            <Collections />
        </Box>
    );
};

export default ManageCollections;
