import { useEffect, useRef, useState } from 'react';

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
import LinearProgress from '@mui/material/LinearProgress';

import { useSelector } from 'react-redux';

const QuizFlashcard = () => {
    const collectionToDisplay = useSelector(
        (state) => state.play.collectionToDisplay,
    );

    const flashcardIndex = useSelector((state) => state.play.flashcardIndex);

    const isFirstRun = useRef(true);

    const flashcardOrdNum = flashcardIndex + 1;

    const progressLength = 100 / collectionToDisplay.length;

    const [answerResult, setAnswerResult] = useState({
        displayMessage: false,
        answerMessage: '',
        displayPointsWon: false,
        pointsWon: null,
        btnDisabled: false,
        score: 0,
        progress: progressLength,
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
        }, 1500);
    };

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        setAnswerResult((prevState) => ({
            ...prevState,
            displayPointsWon: false,
            pointsWon: '',
            btnDisabled: false,
            progress: prevState.progress + progressLength,
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

                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    mb={3}
                >
                    <Box width='80%' display='flex' alignItems='center'>
                        <Box width='80%' mr={1}>
                            <LinearProgress
                                variant='determinate'
                                value={answerResult.progress}
                                color='secondary'
                            />
                        </Box>
                        <Box minWidth={35}>
                            <Typography color='white'>{`${Math.round(
                                answerResult.progress,
                            )}%`}</Typography>
                        </Box>
                    </Box>

                    <Grow in={answerResult.displayPointsWon} timeout={1000}>
                        <Box width='20%' display='flex' justifyContent='right'>
                            <Typography
                                className='quiz-flashcard__points'
                                fontSize='4rem'
                                color='secondary'
                                fontWeight={700}
                            >
                                {answerResult.pointsWon}
                            </Typography>
                        </Box>
                    </Grow>
                </Box>

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

                        {answerResult.displayMessage && (
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
