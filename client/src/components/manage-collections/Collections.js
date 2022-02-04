import { Link } from 'react-router-dom';

import OptionButtonDelete from './option-buttons/OptionButtonDelete';

import '../../styles/collections.scss';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Button,
    Box,
    IconButton,
} from '@mui/material';
import { BsFillCollectionFill } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';

import { useSelector, useDispatch } from 'react-redux';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

const Collections = () => {
    const collections = useSelector((state) => state.collections.collections);

    const collectionsToDisplay = Object.values(collections);

    const dispatch = useDispatch();

    const handleCollectionClick = (id) =>
        dispatch(collectionsSlice.actions.setSelectedCollectionId(id));

    const handleDeleteClick = (id) => {
        const newCollections = { ...collections };

        delete newCollections[id];

        dispatch(collectionsSlice.actions.deleteCollection(newCollections));
    };

    const handleEditClick = (id) => {
        console.log(id);
    };

    return (
        <List className='collections'>
            {collectionsToDisplay.map((collection) => (
                <Box
                    className='collections__box'
                    key={collection.id}
                    display='flex'
                >
                    <Link
                        className='collections__link'
                        to={`/collections/${collection.name}`}
                        onClick={() => handleCollectionClick(collection.id)}
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
                                            {collection.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            className='collections__date'
                                            fontWeight={500}
                                        >
                                            {collection.date}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Button>
                    </Link>
                    <Box
                        display='flex'
                        justifyContent='end'
                        flex='20%'
                        paddingRight={1}
                    >
                        <IconButton
                            className={`collections__option`}
                            size='small'
                        >
                            <BiEdit size='2rem' />
                        </IconButton>
                        <OptionButtonDelete
                            classToApply='collections'
                            handleClick={() => handleDeleteClick(collection.id)}
                            text='Collection'
                        />
                    </Box>
                </Box>
            ))}
        </List>
    );
};

export default Collections;
