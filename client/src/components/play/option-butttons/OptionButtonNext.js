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

    const dispatch = useDispatch();

    const handleClick = () =>
        dispatch(playSlice.actions.incrementFlashcardIndex());

    return (
        <IconButton
            className={
                collectionToDisplay.length - 1 === flashcardIndex
                    ? 'play-box__btn play-box__btn-disabled'
                    : 'play-box__btn'
            }
            onClick={handleClick}
            size='small'
        >
            <Typography fontSize='1.8rem'>NEXT</Typography>
            <IoIosArrowForward size='2.5rem' />
        </IconButton>
    );
};

export default OptionButtonNext;
