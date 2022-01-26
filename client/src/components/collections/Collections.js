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

const Collections = ({ collections }) => {
    return (
        <List className='collections'>
            {collections.map((collection) => (
                <Link
                    to={`/collections/${collection.name}`}
                    key={collection.id}
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
                                    <Typography className='collections__date'>
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

