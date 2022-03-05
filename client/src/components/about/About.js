import '../../styles/about.scss';
import { Box, Typography, Link } from '@mui/material';
import { AiFillGithub } from 'react-icons/ai';

const About = () => {
    return (
        <Box className='about' maxWidth='600px' color='white'>
            <Typography variant='h2'>About Kadeu</Typography>
            <Typography mt={2} mb={4} fontSize='1.4rem'>
                Kadeu is an interactive learning experience where you can test
                your knowledge in anything you can imagine. It is designed to
                help the user increase their understanding about a chosen topic
                by using
                <Link
                    href='https://en.wikipedia.org/wiki/Spaced_repetition'
                    target='_blank'
                    rel='noopener noreferrer'
                    underline='none'
                    color='secondary'
                    fontWeight={700}
                >
                    {' '}
                    Spaced Repetition
                </Link>{' '}
                which has been proven to be one of the best learning methods for
                enhancing long-term memory capabilities.
            </Typography>
            <Typography variant='h2' mt={4}>
                How to use Kadeu
            </Typography>
            <Typography mt={2} mb={4} fontSize='1.4rem'>
            <Typography variant='h4' mt={4} mb={4}>
            Collections
            </Typography>
            

            Get started by creating a collection inside "Manage Collections", 
            there will be already plenty of collections available. If you found the topic 
            you want to learn more about, head to the "Play" tab and start learning. 
            If you haven't, create a new collection, add as much cards as you want and 
            start testing yourself!
            
            <Typography variant='h4' mt={4} mb={4}>
                Play
            </Typography>
            
            Before playing you can choose between Quiz Mode and Standard Mode: 
            The Standard Mode will let you play the <Link 
                    href='https://en.wikipedia.org/wiki/Flashcard'
                    target='_blank'
                    rel='noopener noreferrer'
                    underline='none'
                    color='secondary'
                    fontWeight={700}>classic flashcards game</Link>, 
            Quiz Mode is an advanced version of the Standard Mode, where you can select the options in a more interactive fashion.
            </Typography>
            <Typography variant='h2' mt={4} mb={4}>
                Github
            </Typography>
            <Typography mt={2} mb={4} fontSize='1.4rem'>
                You can check out our GitHub repository down below where you can
                find any additional information about the project.{' '}
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
