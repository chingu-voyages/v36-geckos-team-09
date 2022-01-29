import CollectionTableRow from './CollectionTableRow';

import { Table, TableBody, TableContainer, Paper } from '@mui/material';

const CollectionTable = ({ flashcardsCollection }) => {
    return (
        <TableContainer className='collection-table' component={Paper}>
            <Table aria-label='collapsible table'>
                <TableBody>
                    {flashcardsCollection.map((row, index) => (
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
