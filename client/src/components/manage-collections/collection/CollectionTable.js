import { useEffect, useState } from 'react';

import FlashcardsDataService from '../../../services/flashcards_service';

import CollectionTableRow from './CollectionTableRow';

import { Table, TableBody, TableContainer, Paper, Box } from '@mui/material';

import { BallTriangle } from 'react-loader-spinner';

import { useSelector, useDispatch } from 'react-redux';
import { collectionsSlice } from '../../../redux/slices/collectionsSlice';

const CollectionTable = ({ selectedCollectionName }) => {
    const [loading, setLoading] = useState(false);

    const collectionToDisplay = useSelector(
        (state) => state.collections.collectionToDisplay,
    );

    const dispatch = useDispatch();

    const getCollectionFlashcards = async (collectionName, isMounted) => {
        setLoading(true);

        try {
            const res = await FlashcardsDataService.getCollection(
                collectionName,
            );

            const data = res.data.flashcards.filter((flashcard) =>
                flashcard.hasOwnProperty('isSampleCard') ? false : true,
            );

            if (isMounted)
                dispatch(collectionsSlice.actions.setCollectionToDisplay(data));

            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        let isMounted = true;

        getCollectionFlashcards(selectedCollectionName, isMounted);

        return () => (isMounted = false);
    }, []);

    return (
        <TableContainer className='collection-table' component={Paper}>
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
                <Table aria-label='collapsible table'>
                    <TableBody>
                        {collectionToDisplay.map((row, index) => (
                            <CollectionTableRow
                                key={row._id}
                                row={row}
                                index={index}
                            />
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
};

export default CollectionTable;
