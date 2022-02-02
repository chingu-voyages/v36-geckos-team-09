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
} from '@mui/material';
import { BsFillCollectionFill } from 'react-icons/bs';

import { useSelector, useDispatch } from 'react-redux';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

const Collections = () => {
    const collections = Object.values(
        useSelector((state) => state.collections.collections),
    );

    const dispatch = useDispatch();

    const handleClick = (id) =>
        dispatch(collectionsSlice.actions.setSelectedCollectionId(id));

    return (
        <List className='collections'>
            {collections.map((collection) => (
                <Link
                    to={`/collections/${collection.name}`}
                    key={collection.id}
                    onClick={() => handleClick(collection.id)}
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
            ))}
        </List>
    );
};

export default Collections;
