import CollectionTableRow from './CollectionTableRow';

import { v4 as uuidv4 } from 'uuid';

import { Table, TableBody, TableContainer, Paper } from '@mui/material';

const CollectionTable = () => {
    const createData = (
        id,
        question,
        answerA,
        answerB,
        answerC,
        answerD,
        correctAnswer,
    ) => {
        return {
            id,
            question,
            answerA,
            answerB,
            answerC,
            answerD,
            correctAnswer,
        };
    };

    const rows = [
        createData(
            uuidv4(),
            'Lorem ipsum dolor sit amet coribus placeat magnam facere voluptatum, saepe impedit quidem unde ipsa',
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores possimus commodi tenetur voluptatem fugit excepturi?',
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae deserunt aut eveniet maxime.',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam',
            'Lorem ipfsum dolor sit amet consectetur adipisicing elit. Nam',
            'B',
        ),
        createData(
            uuidv4(),
            'Heeee hooo?',
            'asd',
            'adfd',
            'gfsgasd',
            'sdgds',
            'B',
        ),
    ];

    return (
        <TableContainer className='collection-table' component={Paper}>
            <Table aria-label='collapsible table'>
                <TableBody>
                    {rows.map((row) => (
                        <CollectionTableRow key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CollectionTable;
