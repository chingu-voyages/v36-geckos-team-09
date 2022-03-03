import '../../../styles/playBox.scss';
import { Typography, IconButton } from '@mui/material';
import { IoIosArrowForward } from 'react-icons/io';

import { useSelector, useDispatch } from 'react-redux';
import { playSlice } from '../../../redux/slices/playSlice';

const OptionButtonNext = () => {
    const flashcardIndex = useSelector((state) => state.play.flashcardIndex);

    const collectionToDisplay = useSelector(
        (state) => state.play.collectionToDisplay,
    );

    const isNextButtonDisabled = useSelector(
        (state) => state.play.isNextButtonDisabled,
    );

    const dispatch = useDispatch();

    const handleClick = () =>
        dispatch(playSlice.actions.incrementFlashcardIndex());

    return (
        <IconButton
            className='play-box__btn'
            onClick={handleClick}
            size='small'
            disabled={isNextButtonDisabled}
        >
            {flashcardIndex === collectionToDisplay.length - 1 ? (
                <Typography fontSize='1.8rem'>FINISH</Typography>
            ) : (
                <Typography
                    fontSize='1.8rem'
                    display='flex'
                    alignItems='center'
                >
                    NEXT FLASHCARD
                    <IoIosArrowForward size='2.5rem' />
                </Typography>
            )}
        </IconButton>
    );
};

export default OptionButtonNext;
