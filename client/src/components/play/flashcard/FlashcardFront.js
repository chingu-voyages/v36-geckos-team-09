import OptionButtonFlip from '../option-butttons/OptionButtonFlip';

import { ANSWER_PREFIX } from '../../../static';

import '../../../styles/playBox.scss';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

import { useSelector } from 'react-redux';

const FlashcardFront = ({ cardRef, handleFlipClick }) => {
    const collectionToDisplay = useSelector(
        (state) => state.play.collectionToDisplay,
    );

    const flashcardIndex = useSelector((state) => state.play.flashcardIndex);

    const flashcardOrdNum = flashcardIndex + 1;

    return (
        <Card className='play-box__card'>
            <CardContent>
                <Box width='100%' display='flex' justifyContent='right' mb={2}>
                    <OptionButtonFlip
                        flip='Back'
                        side='front'
                        handleClick={handleFlipClick}
                    />
                </Box>
                <Box
                    ref={cardRef}
                    display='flex'
                    alignItems='center'
                    flexDirection='column'
                    m={3}
                    maxWidth='600px'
                >
                    <Typography variant='h5' fontWeight={500}>
                        <Typography
                            variant='span'
                            fontWeight={700}
                            fontSize='2.2rem'
                            mr={1}
                            color='secondary'
                        >
                            {flashcardOrdNum}.
                        </Typography>
                        {collectionToDisplay[flashcardIndex]?.prompt}
                    </Typography>

                    <Box mt={5}>
                        <Grid container spacing={2}>
                            {collectionToDisplay[flashcardIndex]?.answers.map(
                                (answer, index) => (
                                    <Grid item xs={12} sm={6} key={answer}>
                                        <Typography fontSize='1.3rem'>
                                            <Typography
                                                variant='span'
                                                fontWeight={500}
                                                fontSize='1.8rem'
                                                mr={1}
                                                color='secondary'
                                            >
                                                {ANSWER_PREFIX[index]}.
                                            </Typography>
                                            {answer}
                                        </Typography>
                                    </Grid>
                                ),
                            )}
                        </Grid>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FlashcardFront;
