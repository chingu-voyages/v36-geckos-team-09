import { useEffect, useState } from 'react';

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
    Grow,
} from '@mui/material';

import { useSelector } from 'react-redux';

const QuizFlashcard = () => {
    const collectionToDisplay = useSelector(
        (state) => state.play.collectionToDisplay,
    );

    const flashcardIndex = useSelector((state) => state.play.flashcardIndex);

    const flashcardOrdNum = flashcardIndex + 1;

    const [answerResult, setAnswerResult] = useState({
        displayMessage: false,
        answerMessage: '',
        displayPointsWon: false,
        pointsWon: null,
        btnDisabled: false,
        score: 0,
    });

    const handleAnswerChoiceClick = (answerPrefix) => {
        const correctAnswer = collectionToDisplay[flashcardIndex].right_answer;

        const selectedAnswer = answerPrefix;

        const flashcardDifficulty =
            collectionToDisplay[flashcardIndex].difficulty;

        if (selectedAnswer === correctAnswer) {
            if (flashcardDifficulty === 'easy') {
                setAnswerResult((prevState) => ({
                    ...prevState,
                    displayMessage: true,
                    answerMessage: 'Correct Answer !',
                    displayPointsWon: true,
                    pointsWon: '+1',
                    btnDisabled: true,
                    score: prevState.score + 1,
                }));
            } else if (flashcardDifficulty === 'medium') {
                setAnswerResult((prevState) => ({
                    ...prevState,
                    displayMessage: true,
                    answerMessage: 'Correct Answer !',
                    displayPointsWon: true,
                    pointsWon: '+2',
                    btnDisabled: true,
                    score: prevState.score + 2,
                }));
            } else {
                setAnswerResult((prevState) => ({
                    ...prevState,
                    displayMessage: true,
                    answerMessage: 'Correct Answer !',
                    displayPointsWon: true,
                    pointsWon: '+3',
                    btnDisabled: true,
                    score: prevState.score + 3,
                }));
            }
        } else {
            setAnswerResult((prevState) => ({
                ...prevState,
                displayMessage: true,
                answerMessage: 'Wrong Answer !',
                displayPointsWon: true,
                pointsWon: '+0',
                btnDisabled: true,
            }));
        }

        setTimeout(() => {
            setAnswerResult((prevState) => ({
                ...prevState,
                displayMessage: false,
                answerMessage: '',
                displayPointsWon: true,
            }));
        }, 1000);
    };

    useEffect(() => {
        setAnswerResult((prevState) => ({
            ...prevState,
            displayPointsWon: false,
            pointsWon: '',
            btnDisabled: false,
        }));
    }, [flashcardIndex]);

    return (
        <Card className='play-box__card'>
            <CardContent>
                <Box display='flex' justifyContent='center' mb={1}>
                    <Typography
                        fontSize='2.2rem'
                        display='flex'
                        alignItems='center'
                    >
                        Kadeu Score:
                        <Typography
                            variant='span'
                            fontSize='3rem'
                            fontWeight={700}
                            color='secondary'
                            ml={1}
                        >
                            {answerResult.score}
                        </Typography>
                    </Typography>
                </Box>

                <Grow in={answerResult.displayPointsWon} timeout={1000}>
                    <Box display='flex' justifyContent='right'>
                        <Typography
                            className='quiz-flashcard__points'
                            fontSize='4em'
                            color='secondary'
                            fontWeight={700}
                        >
                            {answerResult.pointsWon}
                        </Typography>
                    </Box>
                </Grow>

                <Box
                    display='flex'
                    alignItems='center'
                    flexDirection='column'
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
                                    disabled={answerResult.btnDisabled}
                                >
                                    {prefix}
                                </Button>
                            ))}
                        </ButtonGroup>

                        {answerResult.showAnswer && (
                            <Typography
                                className='quiz-flashcard__fade-in'
                                textAlign='center'
                                fontSize='1.5rem'
                                mt={2}
                            >
                                {answerResult.answerMessage}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuizFlashcard;
