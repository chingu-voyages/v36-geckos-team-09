import '../../../styles/endGame.scss';
import { Typography, Box, IconButton } from '@mui/material';
import { BsArrowRepeat } from 'react-icons/bs';

import { useDispatch, useSelector } from 'react-redux';
import { playSlice } from '../../../redux/slices/playSlice';

const EndGameBox = ({ isQuizModeChecked }) => {
    const finalScore = useSelector((state) => state.play.finalScore);

    const dispatch = useDispatch();

    const handleNormalModeRestartClick = () =>
        dispatch(playSlice.actions.resetFlashcardIndex());

    const handleQuizModeRestartClick = () => {
        dispatch(playSlice.actions.resetFlashcardIndex());

        dispatch(playSlice.actions.setIsNextButtonDisabled(true));

        dispatch(playSlice.actions.resetFinalScore());
    };

    return (
        <>
            <Typography
                className='end-game__heading'
                fontSize='3rem'
                color='secondary'
                fontWeight={500}
            >
                THE END
            </Typography>

            <Typography
                className='end-game__subheading'
                fontSize='2rem'
                color='white'
                textAlign='center'
            >
                We hope that you learned something new today !
            </Typography>

            <Box
                className='end-game__divider'
                width='50%'
                height='0.2rem'
                mt={2}
                mb={2}
            />

            {isQuizModeChecked && (
                <Typography fontSize='1.8rem' color='white' mb={2}>
                    Your Score:{' '}
                    <Typography
                        variant='span'
                        color='secondary'
                        fontSize='3rem'
                        fontWeight={700}
                    >
                        {finalScore}
                    </Typography>{' '}
                    Kadeu Points
                </Typography>
            )}

            <Typography fontSize='1.8rem' color='white'>
                Play Again
            </Typography>

            <IconButton
                onClick={
                    isQuizModeChecked
                        ? handleQuizModeRestartClick
                        : handleNormalModeRestartClick
                }
                size='small'
                color='secondary'
            >
                <BsArrowRepeat size='4rem' />
            </IconButton>
        </>
    );
};

export default EndGameBox;
