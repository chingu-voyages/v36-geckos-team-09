import { useState } from 'react';

import { ANSWER_PREFIX } from '../../../static';

import {
    Box,
    Typography,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const CollectionTableRow = ({ row, index }) => {
    const [isRowOpen, setIsRowOpen] = useState(false);

    const rowIndex = index + 1;

    const rowItems = Object.values(row).slice(2);

    const handleClick = () => setIsRowOpen((prevState) => !prevState);

    return (
        <>
            <TableRow>
                <TableCell component='th' scope='row'>
                    <Typography
                        className='collection__prefix'
                        variant='h6'
                        fontWeight={700}
                        fontSize='1.3rem'
                        mr='0.3rem'
                        display='inline'
                    >
                        <Typography
                            className='collection__prefix'
                            variant='span'
                            fontWeight={700}
                            fontSize='1rem'
                            mr='1rem'
                            color='white'
                        >
                            {rowIndex}.
                        </Typography>
                        Q:
                    </Typography>
                    <Typography
                        variant='h6'
                        fontSize='1.2rem'
                        color='white'
                        display='inline'
                    >
                        {row.question}
                    </Typography>
                </TableCell>
                <TableCell className='collection__question-cell'>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={handleClick}
                    >
                        {isRowOpen ? (
                            <IoIosArrowUp size='1.5rem' />
                        ) : (
                            <IoIosArrowDown size='1.5rem' />
                        )}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={isRowOpen} timeout='auto' unmountOnExit>
                        <Box margin={1}>
                            <Table size='small' aria-label='purchases'>
                                <TableBody>
                                    {rowItems.map((item, index) => {
                                        if (index === rowItems.length - 1) {
                                            return (
                                                <TableRow key={item}>
                                                    <TableCell
                                                        component='th'
                                                        scope='row'
                                                    >
                                                        <Typography
                                                            className='collection__prefix'
                                                            variant='p'
                                                            fontWeight={700}
                                                            fontSize='1.2rem'
                                                        >
                                                            Correct Answer:
                                                        </Typography>{' '}
                                                        <Typography
                                                            variant='p'
                                                            color='secondary'
                                                            fontWeight={700}
                                                            fontSize='1.2rem'
                                                        >
                                                            {item}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }

                                        return (
                                            <TableRow key={item}>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                >
                                                    <Typography
                                                        className='collection__prefix'
                                                        variant='p'
                                                        fontWeight={700}
                                                        fontSize='1.2rem'
                                                        mr='0.2rem'
                                                    >
                                                        {ANSWER_PREFIX[index]}:
                                                    </Typography>
                                                    <Typography
                                                        variant='p'
                                                        fontSize='1.1rem'
                                                        color='white'
                                                    >
                                                        {item}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CollectionTableRow;
