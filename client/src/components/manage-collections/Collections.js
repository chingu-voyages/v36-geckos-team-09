import { useEffect, useState } from 'react';

import { getUniqueListBy } from '../../utils';

import CollectionsBox from './CollectionsBox';

import FlashcardsDataService from '../../services/flashcards_service';

import '../../styles/collections.scss';
import { List, Box } from '@mui/material';

import { BallTriangle } from 'react-loader-spinner';

import { useDispatch, useSelector } from 'react-redux';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

const Collections = () => {
    const collections = useSelector((state) => state.collections.collections);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const getCollections = async (isMounted) => {
        setLoading(true);

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

            setLoading(false);
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
            {loading ? (
                <Box padding={5} mt={5} display='flex' justifyContent='center'>
                    <BallTriangle
                        heigth='100'
                        width='100'
                        color='#9c27b0'
                        ariaLabel='loading'
                    />
                </Box>
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
