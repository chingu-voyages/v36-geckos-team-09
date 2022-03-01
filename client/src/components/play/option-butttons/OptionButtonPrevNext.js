import '../../../styles/playBox.scss';
import { Typography, IconButton } from '@mui/material';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

import { useSelector, useDispatch } from 'react-redux';
import { playSlice } from '../../../redux/slices/playSlice';

const OptionButtonPrevNext = ({ direction }) => {
    const flashcardIndex = useSelector((state) => state.play.flashcardIndex);

    const collectionToDisplay = useSelector(
        (state) => state.play.collectionToDisplay,
    );

    const dispatch = useDispatch();

    const handleClick = (dir) => {
        if (dir === 'prev')
            dispatch(playSlice.actions.decrementFlashcardIndex());

        if (dir === 'next')
            dispatch(playSlice.actions.incrementFlashcardIndex());
    };

    return direction === 'prev' ? (
        <IconButton
            className={
                flashcardIndex === 0
                    ? 'play-box__btn play-box__btn-disabled'
                    : 'play-box__btn'
            }
            onClick={() => handleClick(direction)}
            size='small'
        >
            <IoIosArrowBack size='2.5rem' />
            <Typography fontSize='1.8rem'>PREV</Typography>
        </IconButton>
    ) : (
        <IconButton
            className={
                collectionToDisplay.length - 1 === flashcardIndex
                    ? 'play-box__btn play-box__btn-disabled'
                    : 'play-box__btn'
            }
            onClick={() => handleClick(direction)}
            size='small'
        >
            <Typography fontSize='1.8rem'>NEXT</Typography>
            <IoIosArrowForward size='2.5rem' />
        </IconButton>
    );
};

export default OptionButtonPrevNext;
