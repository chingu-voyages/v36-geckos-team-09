import { useEffect, useState } from 'react';

import FlashcardsDataService from '../../../services/flashcards_service';

import CollectionTableRow from './CollectionTableRow';

import { Table, TableBody, TableContainer, Paper } from '@mui/material';

const CollectionTable = ({ selectedCollectionName }) => {
    const [collectionToDisplay, setCollectionToDisplay] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const getCollectionFlashcards = async (collectionName) => {
            try {
                const res = await FlashcardsDataService.getCollection(
                    collectionName,
                );

                const data = res.data.flashcards.filter((flashcard) =>
                    flashcard.hasOwnProperty('isSampleCard') ? false : true,
                );

                if (isMounted) setCollectionToDisplay(data);
            } catch (e) {
                console.log(e);
            }
        };

        getCollectionFlashcards(selectedCollectionName);

        return () => (isMounted = false);
    }, [collectionToDisplay]);

    return (
        <TableContainer className='collection-table' component={Paper}>
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
        </TableContainer>
    );
};

export default CollectionTable;
