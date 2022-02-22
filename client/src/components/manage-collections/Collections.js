import { useEffect, useState } from 'react';

import { getUniqueListBy } from '../../utils';

import CollectionsBox from './CollectionsBox';
import LoadingBox from '../loading/LoadingBox';

import FlashcardsDataService from '../../services/flashcards_service';

import '../../styles/collections.scss';
import { List } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

const Collections = () => {
    const collections = useSelector((state) => state.collections.collections);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const getCollections = async (isMounted) => {
        setIsLoading(true);

        try {
            const res = await FlashcardsDataService.getAll();

            const data = res.data.flashcards;

            const dataWithoutDuplicates = getUniqueListBy(
                data,
                'collection_name',
            );

            if (isMounted)
                dispatch(
                    collectionsSlice.actions.setCollections(
                        dataWithoutDuplicates,
                    ),
                );

            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        let isMounted = true;

        getCollections(isMounted);

        return () => (isMounted = false);
    }, []);

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
