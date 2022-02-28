import { useEffect, useState } from 'react';

import FlashcardsDataService from '../../../services/flashcards_service';

import CollectionTableRow from './CollectionTableRow';
import LoadingBox from '../../loading/LoadingBox';

import { Table, TableBody, TableContainer, Paper } from '@mui/material';

import { useSelector } from 'react-redux';

const CollectionTable = ({ collectionName }) => {
    const collectionsTrigger = useSelector(
        (state) => state.collections.collectionsTrigger,
    );

    const [isLoading, setIsLoading] = useState(false);

    const [collectionToDisplay, setCollectionToDisplay] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const getCollectionFlashcards = async (collectionName, isMounted) => {
            setIsLoading(true);

            try {
                const res = await FlashcardsDataService.getCollection(
                    collectionName,
                );

                const data = res.data.flashcards.filter((flashcard) =>
                    flashcard.hasOwnProperty('isSampleCard') ? false : true,
                );

                if (isMounted) setCollectionToDisplay(data);

                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        getCollectionFlashcards(collectionName, isMounted);

        return () => (isMounted = false);
    }, [collectionsTrigger]);

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
