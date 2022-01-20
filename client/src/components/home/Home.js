import { GiCardPickup } from 'react-icons/gi';

import { Box, Typography } from '@mui/material';

const Home = () => {
    return (
        <Box
            className='home'
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            color='white'
        >
            <GiCardPickup size='8rem' />
            <Typography variant='h2' mt={2}>
                Flashcards !
            </Typography>
            <Typography variant='h4' mt={2}>
                Welcome to flashcards app created by Chingu Geckos team 09
            </Typography>
        </Box>
    );
};

export default Home;
