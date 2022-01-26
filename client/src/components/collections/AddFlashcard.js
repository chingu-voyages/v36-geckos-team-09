
import React, { useState } from 'react';
import FlashcardsDataService from '../../services/flashcards_service';
import { Link } from 'react-router-dom';

const AddFlashcard = (props) => {
    /* const initialFlashcardState = {
        prompt: "",
        answers: ['1','2','3','4'],
        right_answer: 1
      };

      const [flahscard,setFlashcard] = useState(initialFlashcardState) */

    //that's just ugly I should change it and make a unique flashcard state

    const [prompt, setPrompt] = useState('');
    const [firstAnswer, setFirstAnswer] = useState('');
    const [secondAnswer, setSecondAnswer] = useState('');
    const [thirdAnswer, setThirdAnswer] = useState('');
    const [fourthAnswer, setFourthAnswer] = useState('');
    const [rightAnswer, setRightAnswer] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const saveFlashcard = () => {
        var data = {
            prompt: prompt,
            answers: [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer],
            right_answer: rightAnswer,
        };

        FlashcardsDataService.createFlashcard(data)
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
                            <h1 htmlFor='description'>Add Flashcard</h1>
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

export default AddFlashcard;
