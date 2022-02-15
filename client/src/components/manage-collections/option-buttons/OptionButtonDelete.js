import { useState } from 'react';

import OptionButtonSave from './OptionButtonSave';
import OptionButtonClose from './OptionButtonClose';

import '../../../styles/collections.scss';
import '../../../styles/collection.scss';
import { Typography, IconButton, Tooltip, Popover, Box } from '@mui/material';
import { MdDelete } from 'react-icons/md';

const OptionButton = ({ classToApply, handleClick, text }) => {
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
                        <OptionButtonSave
                            classToApply='collections__dropdown-option'
                            handleClick={handleClick}
                            text={`Delete ${text}`}
                        />

                        <OptionButtonClose
                            classToApply='collections__dropdown-option'
                            handleClick={handleClose}
                            text='Close'
                        />
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default OptionButton;
