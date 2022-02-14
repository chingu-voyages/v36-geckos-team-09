import { useState } from 'react';

import '../../../styles/collections.scss';
import '../../../styles/collection.scss';
import { Typography, IconButton, Tooltip, Popover, Box } from '@mui/material';
import { FaCheck } from 'react-icons/fa';
import { AiFillCloseSquare } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const OptionButton = ({ text, handleClick, classToApply }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;

    const handleDeleteButtonClick = (e) => setAnchorEl(e.currentTarget);

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Tooltip
                title={<Typography fontSize='1.1rem'>Delete {text}</Typography>}
                placement='top-end'
                arrow
            >
                <IconButton
                    className={`${classToApply}__option`}
                    onClick={handleDeleteButtonClick}
                    size='small'
                >
                    <MdDelete size='2rem' />
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box className='collections__dropdown'>
                    <Box>
                        <Tooltip
                            title={
                                <Typography fontSize='1.1rem'>
                                    Delete {text}
                                </Typography>
                            }
                            placement='top-end'
                            arrow
                        >
                            <IconButton
                                className='collections__dropdown-option'
                                onClick={handleClick}
                            >
                                <FaCheck />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <Typography fontSize='1.1rem'>Close</Typography>
                            }
                            placement='top-end'
                            arrow
                        >
                            <IconButton
                                className='collections__dropdown-option'
                                onClick={handleClose}
                            >
                                <AiFillCloseSquare />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default OptionButton;
