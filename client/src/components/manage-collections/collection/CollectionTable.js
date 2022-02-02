import CollectionTableRow from './CollectionTableRow';

import { Table, TableBody, TableContainer, Paper } from '@mui/material';

import { useSelector } from 'react-redux';

const CollectionTable = () => {
    const collections = useSelector((state) => state.collections.collections);

    const selectedCollectionId = useSelector(
        (state) => state.collections.selectedCollectionId,
    );

    const collectionToDisplay =
        collections[`${selectedCollectionId}`].flashcards;

    return (
        <TableContainer className='collection-table' component={Paper}>
            <Table aria-label='collapsible table'>
                <TableBody>
                    {collectionToDisplay.map((row, index) => (
                        <CollectionTableRow
                            key={row.id}
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
