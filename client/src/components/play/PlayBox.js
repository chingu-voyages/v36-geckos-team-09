import { useState, useEffect } from 'react';

import FlashcardsDataService from '../../services/flashcards_service';

import { shuffleData } from '../../utils';

import Flashcard from './flashcard/Flashcard';
import QuizFlashcard from './flashcard/quiz-flashcard/QuizFlashcard';
import OptionButtonNext from './option-butttons/OptionButtonNext';
import LoadingBox from '../loading/LoadingBox';
import FlashcardError from './flashcard/FlashcardError';

import '../../styles/playBox.scss';
import { Box, Typography, Button } from '@mui/material';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

import { useDispatch, useSelector } from 'react-redux';
import { playSlice } from '../../redux/slices/playSlice';

const PlayBox = ({ playMode, setPlayMode }) => {
    const selectedCollection = useSelector(
        (state) => state.play.selectedCollection,
    );

    const collectionToDisplay = useSelector(
        (state) => state.play.collectionToDisplay,
    );

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleBackClick = () => {
        dispatch(playSlice.actions.resetSelectedCollection());

        dispatch(playSlice.actions.resetFlashcardIndex());

        setPlayMode((prevState) => ({
            ...prevState,
            isButtonDisabled: true,
            isQuizModeChecked: false,
            isPlaying: false,
        }));
    };

    const showQuizModeOrSelfTest = (isQuizModeChecked) =>
        isQuizModeChecked ? <QuizFlashcard /> : <Flashcard />;

    useEffect(() => {
        const getCollectionFlashcards = async (collectionName) => {
            setIsLoading(true);

            try {
                const res = await FlashcardsDataService.getCollection(
                    collectionName,
                );

                const data = res.data.flashcards.filter((flashcard) =>
                    flashcard.hasOwnProperty('isSampleCard') ? false : true,
                );

                const shuffledData = shuffleData(data);

                dispatch(
                    playSlice.actions.setCollectionToDisplay(shuffledData),
                );

                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        getCollectionFlashcards(selectedCollection);
    }, []);

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

            {!collectionToDisplay.length ? (
                <FlashcardError />
            ) : isLoading ? (
                <LoadingBox />
            ) : (
                <>
                    {showQuizModeOrSelfTest(playMode.isQuizModeChecked)}

                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        mt={2}
                    >
                        <OptionButtonNext direction='next' />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default PlayBox;
