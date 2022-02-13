import { useEffect, useState } from 'react';

import { getUniqueListBy } from '../../static';

import CollectionsBox from './CollectionsBox';

import FlashcardsDataService from '../../services/flashcards_service';

import '../../styles/collections.scss';
import { List } from '@mui/material';

const Collections = () => {
    const [collectionsToDisplay, setCollectionsToDisplay] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const getCollections = async () => {
            const res = await FlashcardsDataService.getAll();

            const data = res.data.flashcards;

            const dataWithoutDuplicates = getUniqueListBy(
                data,
                'collection_name',
            );

            if (isMounted) setCollectionsToDisplay([...dataWithoutDuplicates]);
        };

        getCollections();

        return () => (isMounted = false);
    }, [collectionsToDisplay]);

    return (
        <List className='collections'>
            {collectionsToDisplay.map((collection) => (
                <CollectionsBox key={collection._id} collection={collection} />
            ))}
        </List>
    );
};

export default Collections;
