import { useState } from 'react';

import { Link } from 'react-router-dom';

import FlashcardsDataService from '../../services/flashcards_service';

import OptionButtonDelete from './option-buttons/OptionButtonDelete';

import '../../styles/collections.scss';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Button,
    Box,
    IconButton,
    Input,
    Tooltip,
} from '@mui/material';
import { BsFillCollectionFill } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { AiFillCloseSquare } from 'react-icons/ai';

import { useDispatch } from 'react-redux';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { changeCollectionNameSchema } from '../../utils';

const CollectionsBox = ({ collection }) => {
    const { collection_name: collectionName } = collection;

    const [isEditable, setIsEditable] = useState(false);

    const dispatch = useDispatch();

    const handleCollectionsBoxClick = (name) =>
        dispatch(collectionsSlice.actions.setSelectedCollectionName(name));

    const handleDeleteClick = (collectionName) =>
        FlashcardsDataService.deleteCollection(collectionName);

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

    const submitForm = (data) => {
        const newCollectionName = data.newCollectionName;

        const editedCollection = {
            old_collection_name: collectionName,
            new_collection_name: newCollectionName,
        };

        FlashcardsDataService.updateCollection(editedCollection);

        setIsEditable((prevState) => !prevState);

        reset();
    };

    return (
        <Box className='collections__box' display='flex'>
            {!isEditable && (
                <Link
                    className='collections__link'
                    to={`/collections/${collectionName.replace(/\s+/g, '')}`}
                    onClick={() => handleCollectionsBoxClick(collectionName)}
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
                    <Typography mb={1} ml={2} className='new-flashcard__error'>
                        {errors.newCollectionName && 'This field is required!'}
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
                        <Tooltip
                            title={
                                <Typography fontSize='1.1rem'>
                                    Edit Collection Name
                                </Typography>
                            }
                            placement='top-end'
                            arrow
                        >
                            <IconButton
                                className={`collections__option`}
                                onClick={handleEditClick}
                                size='small'
                            >
                                <BiEdit size='2rem' />
                            </IconButton>
                        </Tooltip>

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
                                className='collections__edit-option'
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
                                className='collections__edit-option'
                                onClick={handleCloseClick}
                            >
                                <AiFillCloseSquare />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default CollectionsBox;
