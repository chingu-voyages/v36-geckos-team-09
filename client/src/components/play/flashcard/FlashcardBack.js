import OptionButtonFlip from '../option-butttons/OptionButtonFlip';

import '../../../styles/play/playBox.scss';
import { Card, CardContent, Typography, Box } from '@mui/material';

import { useSelector } from 'react-redux';

const FlashcardBack = ({ cardDimensions, handleFlipClick }) => {
    const collectionToDisplay = useSelector(
        (state) => state.play.collectionToDisplay,
    );

    const flashcardIndex = useSelector((state) => state.play.flashcardIndex);

    const flashcardCorrectAnswerPrefix =
        collectionToDisplay[flashcardIndex].right_answer;

    const returnFlashcardCorrectAnswerPrefixIndex = (prefix) => {
        if (prefix === 'A') return 0;
        else if (prefix === 'B') return 1;
        else if (prefix === 'C') return 2;
        else return 3;
    };

    const flashcardCorrectAnswerPrefixIndex =
        returnFlashcardCorrectAnswerPrefixIndex(flashcardCorrectAnswerPrefix);

    const flashcardCorrectAnswer =
        collectionToDisplay[flashcardIndex].answers[
            flashcardCorrectAnswerPrefixIndex
        ];

    return (
        <Card className='play-box__card '>
            <CardContent>
                <Box width='100%' display='flex' justifyContent='right' mb={2}>
                    <OptionButtonFlip
                        flip='Front'
                        side='back'
                        handleClick={handleFlipClick}
                    />
                </Box>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    flexDirection='column'
                    m={3}
                    maxWidth='600px'
                    minHeight={cardDimensions.cardHeight}
                    width={cardDimensions.cardWidth}
                >
                    <Typography fontWeight={500} fontSize='3rem' color='white'>
                        Correct Answer
                    </Typography>

                    <Typography
                        variant='span'
                        fontWeight={500}
                        fontSize='5rem'
                        mb={2}
                        mt={2}
                        color='secondary'
                    >
                        "{flashcardCorrectAnswerPrefix}"
                    </Typography>

                    <Typography fontSize='1.5rem'>
                        {flashcardCorrectAnswer}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FlashcardBack;
