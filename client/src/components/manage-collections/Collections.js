import { Link } from 'react-router-dom';

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
    Tooltip,
} from '@mui/material';
import { BsFillCollectionFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
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
                        <Tooltip
                            title={
                                <Typography fontSize='1.1rem'>
                                    Edit Flashcard
                                </Typography>
                            }
                            placement='top-end'
                            arrow
                        >
                            <IconButton
                                className='collections__option'
                                size='small'
                                color='secondary'
                            >
                                <BiEdit size='2rem' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <Typography fontSize='1.1rem'>
                                    Delete Flashcard
                                </Typography>
                            }
                            placement='top-end'
                            arrow
                        >
                            <IconButton
                                className='collections__option'
                                size='small'
                                color='secondary'
                                onClick={() => handleDeleteClick(collection.id)}
                            >
                                <MdDelete size='2rem' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            ))}
        </List>
    );
};

export default Collections;
