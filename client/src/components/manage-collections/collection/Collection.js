import { useParams, Link } from 'react-router-dom';

import CollectionTable from './CollectionTable';

import '../../../styles/collection.scss';
import { Box, Typography, Button } from '@mui/material';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

const Collection = () => {
    const { collectionName } = useParams();

    return (
        <Box className='collection'>
            <Link to='/manage-collections'>
                <Button className='collection__back-btn' size='large'>
                    <BsFillArrowLeftSquareFill size='3rem' />
                </Button>
            </Link>
            <Typography
                variant='h2'
                fontSize='4rem'
                color='white'
                mt={3}
                mb={3}
                display='flex'
            >
                Collections
                <Typography
                    fontWeight={500}
                    variant='span'
                    fontSize='4rem'
                    color='secondary'
                >
                    /
                </Typography>
                {collectionName}
            </Typography>
            <CollectionTable />
        </Box>
    );
};

export default Collection;
