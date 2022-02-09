import CollectionsBox from './CollectionsBox';

import '../../styles/collections.scss';
import { List } from '@mui/material';

import { useSelector } from 'react-redux';

const Collections = () => {
    const collections = useSelector((state) => state.collections.collections);

    const collectionsToDisplay = Object.values(collections);

    return (
        <List className='collections'>
            {collectionsToDisplay.map((collection) => (
                <CollectionsBox key={collection.id} collection={collection} />
            ))}
        </List>
    );
};

export default Collections;
