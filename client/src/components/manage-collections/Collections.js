import { useEffect, useState } from 'react';

import { getUniqueListBy } from '../../static';

import CollectionsBox from './CollectionsBox';

import FlashcardsDataService from '../../services/flashcards_service';

import '../../styles/collections.scss';
import { List } from '@mui/material';

import { useSelector } from 'react-redux';

const Collections = () => {
    const [collectionsToDisplay, setCollectionsToDisplay] = useState([]);

    const stateCollections = useSelector(
        (state) => state.collections.stateCollections,
    );

    useEffect(() => {
        let isMounted = true;

        const getCollections = async () => {
            const res = await FlashcardsDataService.getAll();

            const data = res.data.flashcards;

            const dataWithoutDuplicates = getUniqueListBy(
                data,
                'collection_name',
            );

            if (isMounted)
                setCollectionsToDisplay([
                    ...dataWithoutDuplicates,
                    ...stateCollections,
                ]);
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
