import { useState } from 'react';

import { useParams, Link } from 'react-router-dom';

import CollectionTable from './CollectionTable';
import NewFlashcard from './flashcard/NewFlashcard';

import '../../../styles/collections/collection.scss';
import { Box, Typography, Button, Popover } from '@mui/material';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Collection = () => {
    const { collectionName } = useParams();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;

    const handleAddClick = (e) => setAnchorEl(e.currentTarget);

    const handleClose = () => setAnchorEl(null);

    return (
        <Box className='collection'>
            <Box
                className='collection__title-box'
                display='flex'
                alignItems='center'
                mb={3}
            >
                <Link to='/manage-collections'>
                    <Button className='collection__back-btn' size='large'>
                        <BsFillArrowLeftSquareFill size='2rem' />
                    </Button>
                </Link>
                <Typography
                    className='collection__title'
                    variant='h2'
                    fontSize='3rem'
                    color='white'
                    display='flex'
                >
                    Collections
                    <Typography
                        className='collection__title-span'
                        fontWeight={500}
                        variant='span'
                        fontSize='3rem'
                        color='secondary'
                    >
                        /
                    </Typography>
                    {collectionName}
                </Typography>
            </Box>

            <Button
                className='manage-collections__add-btn'
                onClick={handleAddClick}
                color='secondary'
                variant='outlined'
                startIcon={isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
                aria-describedby={id}
            >
                Add New Flashcard
            </Button>
            <Popover
                className='manage-collections__dropdown'
                id={id}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <NewFlashcard
                    collectionName={collectionName}
                    handleClose={handleClose}
                />
            </Popover>

            <CollectionTable collectionName={collectionName} />
        </Box>
    );
};

export default Collection;
