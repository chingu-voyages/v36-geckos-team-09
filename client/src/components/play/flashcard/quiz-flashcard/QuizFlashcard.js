import { ANSWER_PREFIX } from '../../../../static';

import '../../../../styles/quizFlashcard.scss';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    ButtonGroup,
    Button,
} from '@mui/material';

import { useSelector } from 'react-redux';

const QuizFlashcard = () => {
    const collectionToDisplay = useSelector(
        (state) => state.play.collectionToDisplay,
    );

    const flashcardIndex = useSelector((state) => state.play.flashcardIndex);

    const flashcardOrdNum = flashcardIndex + 1;

    const handleAnswerChoiceClick = (answerPrefix) => {
        console.log(typeof answerPrefix);
    };

    return (
        <Card className='play-box__card'>
            <CardContent>
                <Box
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

                    <Box mt={5}>
                        <ButtonGroup
                            variant='contained'
                            color='secondary'
                            size='large'
                            aria-label='large outlined secondary button group'
                        >
                            {ANSWER_PREFIX.map((prefix) => (
                                <Button
                                    className='quiz-flashcard__btn'
                                    onClick={() =>
                                        handleAnswerChoiceClick(prefix)
                                    }
                                    key={prefix}
                                >
                                    {prefix}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuizFlashcard;
