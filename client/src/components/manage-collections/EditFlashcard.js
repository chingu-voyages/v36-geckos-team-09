import React, { useState } from 'react';
import FlashcardsDataService from '../../services/flashcards_service';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditFlashcard = (props) => {
    //that's just ugly I should change it and make a unique flashcard state

    //also here I should get prev state so I can set default values and it's not everything empty
    const [prompt, setPrompt] = useState('');
    const [firstAnswer, setFirstAnswer] = useState('');
    const [secondAnswer, setSecondAnswer] = useState('');
    const [thirdAnswer, setThirdAnswer] = useState('');
    const [fourthAnswer, setFourthAnswer] = useState('');
    const [rightAnswer, setRightAnswer] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const { id } = useParams();

    const saveFlashcard = () => {
        var data = {
            _id: id,
            prompt: prompt,
            answers: [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer],
            right_answer: rightAnswer,
        };

        FlashcardsDataService.updateFlashcard(data)
            .then((response) => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div>
            <div>
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <Link to={'/collections/'}>
                            Back to your Flashcards Collection
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div>
                            <h1 htmlFor='description'>Edit Flashcard</h1>
                            <br />
                            <br />
                            {/* prompt */}
                            <label> Prompt:</label>
                            <input
                                type='text'
                                required
                                value={prompt}
                                onChange={(e) => {
                                    setPrompt(e.target.value);
                                }}
                                name='prompt'
                            />
                            <br />
                            <br />
                            {/* answers */}
                            <label> 1.:</label>
                            <input
                                type='text'
                                required
                                value={firstAnswer}
                                onChange={(e) => {
                                    setFirstAnswer(e.target.value);
                                }}
                                name='answer 1'
                            />
                            <br />
                            <label> 2.:</label>
                            <input
                                type='text'
                                required
                                value={secondAnswer}
                                onChange={(e) => {
                                    setSecondAnswer(e.target.value);
                                }}
                                name='answer 2'
                            />
                            <br />
                            <label> 3.:</label>
                            <input
                                type='text'
                                required
                                value={thirdAnswer}
                                onChange={(e) => {
                                    setThirdAnswer(e.target.value);
                                }}
                                name='answer 3'
                            />
                            <br />
                            <label> 4.:</label>
                            <input
                                type='text'
                                required
                                value={fourthAnswer}
                                onChange={(e) => {
                                    setFourthAnswer(e.target.value);
                                }}
                                name='answer 4'
                            />
                            <br />
                            <br />
                            {/* right answer */}
                            <label> Right Answer:</label>
                            <input
                                type='number'
                                required
                                value={rightAnswer}
                                onChange={(e) => {
                                    if (
                                        e.target.value <= 4 &&
                                        e.target.value >= 1
                                    )
                                        setRightAnswer(e.target.value);
                                }}
                                name='Right Answer'
                            />
                        </div>
                        <button onClick={saveFlashcard}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditFlashcard;
