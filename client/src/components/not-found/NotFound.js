import { Link } from 'react-router-dom';

import { Typography, Box, Button } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';

const NotFound = () => {
    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography fontSize='5rem' fontWeight={700} color='secondary'>
                404
            </Typography>
            <Typography fontSize='3rem' color='white' mb={2}>
                Ooops, page not found...
            </Typography>
            <Link to='/'>
                <Button
                    className='manage-collections__add-btn'
                    color='secondary'
                    variant='outlined'
                    startIcon={<AiFillHome size='1.2rem' />}
                >
                    Homepage
                </Button>
            </Link>
        </Box>
    );
};

export default NotFound;
