import { useEffect, useState } from 'react';

import FlashcardsDataService from '../../../services/flashcards_service';

import CollectionTableRow from './CollectionTableRow';
import LoadingBox from '../../loading/LoadingBox';

import { Table, TableBody, TableContainer, Paper } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { collectionsSlice } from '../../../redux/slices/collectionsSlice';

const CollectionTable = ({ selectedCollectionName }) => {
    const [isLoading, setIsLoading] = useState(false);

    const collectionToDisplay = useSelector(
        (state) => state.collections.collectionToDisplay,
    );

    const dispatch = useDispatch();

    const getCollectionFlashcards = async (collectionName, isMounted) => {
        setIsLoading(true);

        try {
            const res = await FlashcardsDataService.getCollection(
                collectionName,
            );

            const data = res.data.flashcards.filter((flashcard) =>
                flashcard.hasOwnProperty('isSampleCard') ? false : true,
            );

            if (isMounted)
                dispatch(collectionsSlice.actions.setCollectionToDisplay(data));

            setIsLoading(false);
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
            {isLoading ? (
                <LoadingBox />
            ) : (
                <Table aria-label='collapsible table'>
                    <TableBody>
                        {collectionToDisplay.map((row, index) => (
                            <CollectionTableRow
                                key={row.prompt}
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
