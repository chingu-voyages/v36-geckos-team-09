import OptionButtonFlip from '../option-butttons/OptionButtonFlip';

import '../../../styles/playBox.scss';
import { Card, CardContent, Typography, Box } from '@mui/material';

import { useSelector } from 'react-redux';

const FlashcardBack = ({ cardDimensions, handleFlipClick }) => {
    const collectionToDisplay = useSelector(
        (state) => state.play.collectionToDisplay,
    );

    const flashcardIndex = useSelector((state) => state.play.flashcardIndex);

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
                    <Typography
                        variant='span'
                        fontWeight={500}
                        fontSize='3rem'
                        mb={2}
                        color='white'
                    >
                        Correct Answer
                    </Typography>
                    <Typography
                        variant='span'
                        fontWeight={500}
                        fontSize='5rem'
                        color='secondary'
                    >
                        "{collectionToDisplay[flashcardIndex]?.right_answer}"
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FlashcardBack;
