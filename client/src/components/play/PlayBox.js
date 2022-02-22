import Flashcard2 from './flashcard/Flashcard2';
import OptionButtonPrevNext from './option-butttons/OptionButtonPrevNext';

import '../../styles/playBox.scss';
import { Box, Typography, Button } from '@mui/material';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

import { useDispatch, useSelector } from 'react-redux';
import { playSlice } from '../../redux/slices/playSlice';

const PlayBox = ({ setIsPlaying, setIsButtonDisabled }) => {
    const selectedCollection = useSelector(
        (state) => state.play.selectedCollection,
    );

    const dispatch = useDispatch();

    const handleBackClick = () => {
        setIsPlaying(false);

        dispatch(playSlice.actions.resetSelectedCollection());

        setIsButtonDisabled(true);
    };

    return (
        <Box className='play-box'>
            <Box
                className='collection__title-box'
                display='flex'
                alignItems='center'
                mb={3}
            >
                <Button
                    className='collection__back-btn'
                    onClick={handleBackClick}
                    size='large'
                >
                    <BsFillArrowLeftSquareFill size='2rem' />
                </Button>
                <Typography
                    className='collection__title'
                    variant='h2'
                    fontSize='3rem'
                    color='white'
                    display='flex'
                >
                    Collection
                    <Typography
                        className='collection__title-span'
                        fontWeight={500}
                        variant='span'
                        fontSize='3rem'
                        color='secondary'
                    >
                        /
                    </Typography>
                    {selectedCollection}
                </Typography>
            </Box>

            <Flashcard2 />

            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                mt={2}
            >
                <OptionButtonPrevNext direction='prev' />

                <Typography
                    fontSize='3rem'
                    fontWeight={300}
                    color='white'
                    mr={1}
                    ml={1}
                >
                    |
                </Typography>

                <OptionButtonPrevNext direction='next' />
            </Box>
        </Box>
    );
};

export default PlayBox;
