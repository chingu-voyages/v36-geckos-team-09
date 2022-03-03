import { useEffect, useState } from 'react';

import FlashcardsDataService from '../../services/flashcards_service';

import { getUniqueListBy } from '../../utils-static/utils';

import CollectionsBox from './CollectionsBox';
import LoadingBox from '../loading/LoadingBox';

import '../../styles/collections/collections.scss';
import { List } from '@mui/material';

import { useSelector } from 'react-redux';

const Collections = () => {
    const collectionsTrigger = useSelector(
        (state) => state.collections.collectionsTrigger,
    );

    const [collections, setCollections] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const getCollections = async (isMounted) => {
            setIsLoading(true);

            try {
                const res = await FlashcardsDataService.getAll();

                const data = res.data.flashcards;

                const dataWithoutDuplicates = getUniqueListBy(
                    data,
                    'collection_name',
                );

                if (isMounted) setCollections(dataWithoutDuplicates);

                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        getCollections(isMounted);

        return () => (isMounted = false);
    }, [collectionsTrigger]);

    return (
        <List className='collections'>
            {isLoading ? (
                <LoadingBox />
            ) : (
                collections.map((collection) => (
                    <CollectionsBox
                        key={collection.collection_name}
                        collection={collection}
                    />
                ))
            )}
        </List>
    );
};

export default Collections;
