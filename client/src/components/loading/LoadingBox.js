import { Box } from '@mui/material';

import { BallTriangle } from 'react-loader-spinner';

const LoadingBox = () => {
    return (
        <Box padding={5} mt={5} display='flex' justifyContent='center'>
            <BallTriangle
                heigth='100'
                width='100'
                color='#9c27b0'
                ariaLabel='loading'
            />
        </Box>
    );
};

export default LoadingBox;
