import '../../styles/about.scss';

import { Box, Typography, Link } from '@mui/material';

import { AiFillGithub } from 'react-icons/ai';

const About = () => {
    return (
        <Box className='about' maxWidth='600px' color='white'>
            <Typography variant='h2'>About Us</Typography>
            <Typography mt={5} fontSize='1.5rem'>
                Hello everyone,
            </Typography>
            <Typography mt={2} mb={4} fontSize='1.5rem'>
                we are Chingu voyage #36 team. Our team name is Geckos-09 and
                this is our project made with React on frontend and Express with
                MongoDB on backend. Here you can check our GitHub repo and hope
                you'll like the application !
            </Typography>
            <Link
                href='https://github.com/chingu-voyages/v36-geckos-team-09'
                target='_blank'
                rel='noopener noreferrer'
                color='inherit'
            >
                <AiFillGithub className='about__icon' size='4rem' />
            </Link>
        </Box>
    );
};

export default About;
