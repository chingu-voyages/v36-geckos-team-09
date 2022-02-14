import { useEffect, useState } from 'react';

import FlashcardsDataService from '../../../services/flashcards_service';

import CollectionTableRow from './CollectionTableRow';

import { Table, TableBody, TableContainer, Paper } from '@mui/material';

import { useSelector } from 'react-redux';

const CollectionTable = () => {
    const [collectionToDisplay, setCollectionToDisplay] = useState([]);

    const selectedCollectionName = useSelector(
        (state) => state.collections.selectedCollectionName,
    );

    useEffect(() => {
        let isMounted = true;

        const getCollectionFlashcards = async (collectionName) => {
            const res = await FlashcardsDataService.getCollection(
                collectionName,
            );

            const data = res.data.flashcards.filter( e =>{
                if(e.hasOwnProperty('isSampleCard')){
                    return false;
                }else{
                    return true
                }
            });


            if (isMounted) setCollectionToDisplay(data);
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
