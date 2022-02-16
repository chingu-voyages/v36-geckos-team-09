import { useState } from 'react';

import { Link } from 'react-router-dom';

import FlashcardsDataService from '../../services/flashcards_service';

import { getCollectionNames, getStateCollectionNames } from '../../utils';

import OptionButtonEdit from './option-buttons/OptionButtonEdit';
import OptionButtonDelete from './option-buttons/OptionButtonDelete';
import OptionButtonSave from './option-buttons/OptionButtonSave';
import OptionButtonClose from './option-buttons/OptionButtonClose';

import '../../styles/collections.scss';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Button,
    Box,
    Input,
} from '@mui/material';
import { BsFillCollectionFill } from 'react-icons/bs';

import { useDispatch, useSelector } from 'react-redux';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { changeCollectionNameSchema } from '../../joiSchemas';

const CollectionsBox = ({ collection }) => {
    const { collection_name: collectionName } = collection;

    const collections = useSelector((state) => state.collections.collections);

    const [isEditable, setIsEditable] = useState(false);

    const [duplicateCollectionNameError, setDuplicateCollectionNameError] =
        useState(false);

    const dispatch = useDispatch();

    const handleDeleteClick = (collectionName) => {
        const newCollections = [...collections];

        const filteredCollections = newCollections.filter(
            (collection) => collection.collection_name !== collectionName,
        );

        dispatch(collectionsSlice.actions.setCollections(filteredCollections));

        FlashcardsDataService.deleteCollection(collectionName);
    };

    const handleEditClick = () => setIsEditable((prevState) => !prevState);

    const handleCloseClick = () => {
        setIsEditable((prevState) => !prevState);

        reset();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: joiResolver(changeCollectionNameSchema),
    });

    const submitForm = async (data) => {
        const newCollectionName = data.newCollectionName;

        const editedCollection = {
            old_collection_name: collectionName,
            new_collection_name: newCollectionName,
        };

        const existingCollectionNames = await getCollectionNames();

        const existingStateCollectionNames =
            getStateCollectionNames(collections);

        if (
            existingCollectionNames.indexOf(newCollectionName) !== -1 ||
            existingStateCollectionNames.indexOf(newCollectionName) !== -1
        ) {
            setDuplicateCollectionNameError(true);

            setTimeout(() => {
                setDuplicateCollectionNameError(false);
            }, 1500);

            return;
        }

        const newCollections = [...collections];

        const editedCollections = newCollections.map((collection) => {
            if (collection.collection_name === collectionName) {
                return { ...collection, collection_name: newCollectionName };
            }

            return collection;
        });

        dispatch(collectionsSlice.actions.setCollections(editedCollections));

        FlashcardsDataService.updateCollection(editedCollection);

        setIsEditable((prevState) => !prevState);

        reset();
    };

    return (
        <Box className='collections__box' display='flex'>
            {!isEditable && (
                <Link
                    className='collections__link'
                    to={`/collections/${
                        collectionName /* .replace(/\s+/g, '') */
                    }`}
                >
                    <Button className='collections__btn'>
                        <ListItem className='collections__item'>
                            <ListItemAvatar>
                                <Avatar className='collections__avatar'>
                                    <BsFillCollectionFill
                                        className='collections__icon'
                                        size='2.5rem'
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography className='collections__name'>
                                        {collectionName}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </Button>
                </Link>
            )}

            {isEditable && (
                <Box width='100%'>
                    <form
                        className='collections__form'
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit(submitForm)}
                    >
                        <Input
                            className='collections__input'
                            type='text'
                            autoFocus
                            placeholder='New collection name'
                            name='newCollectionName'
                            {...register('newCollectionName')}
                        />
                    </form>
                    <Typography
                        className='new-flashcard__error'
                        mb={1}
                        ml={2}
                        fontSize='1.1rem'
                    >
                        {errors.newCollectionName?.message}
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
                </Box>
            )}

            <Box
                display='flex'
                justifyContent='end'
                flex='20%'
                paddingRight={1}
            >
                {!isEditable && (
                    <>
                        <OptionButtonEdit
                            classToApply='collections'
                            handleClick={handleEditClick}
                            text='Edit Collection Name'
                        />

                        <OptionButtonDelete
                            classToApply='collections'
                            handleClick={() =>
                                handleDeleteClick(collectionName)
                            }
                            text='Collection'
                        />
                    </>
                )}

                {isEditable && (
                    <>
                        <OptionButtonSave
                            classToApply='collections__edit-option'
                            handleClick={handleSubmit(submitForm)}
                            text='Save Changes'
                        />

                        <OptionButtonClose
                            classToApply='collections__edit-option'
                            handleClick={handleCloseClick}
                            text='Close'
                        />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default CollectionsBox;
