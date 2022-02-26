import { useState } from 'react';

const useDifficultyLevelClick = (rowDifficulty = 'easy') => {
    const setInitialState = (rowDifficulty) => {
        if (rowDifficulty === 'easy') {
            return {
                easy: true,
                medium: false,
                hard: false,
                selectedDifficulty: rowDifficulty,
            };
        }

        if (rowDifficulty === 'medium') {
            return {
                easy: false,
                medium: true,
                hard: false,
                selectedDifficulty: rowDifficulty,
            };
        }

        if (rowDifficulty === 'hard') {
            return {
                easy: false,
                medium: false,
                hard: true,
                selectedDifficulty: rowDifficulty,
            };
        }
    };

    const [isDifficultyClicked, setIsDifficultyClicked] = useState(
        setInitialState(rowDifficulty),
    );

    const handleDifficultyClick = (flashcardDifficulty) => {
        if (flashcardDifficulty === 'easy') {
            setIsDifficultyClicked((prevState) => ({
                ...prevState,
                easy: true,
                medium: false,
                hard: false,
                selectedDifficulty: flashcardDifficulty,
            }));
        }

        if (flashcardDifficulty === 'medium') {
            setIsDifficultyClicked((prevState) => ({
                ...prevState,
                easy: false,
                medium: true,
                hard: false,
                selectedDifficulty: flashcardDifficulty,
            }));
        }

        if (flashcardDifficulty === 'hard') {
            setIsDifficultyClicked((prevState) => ({
                ...prevState,
                easy: false,
                medium: false,
                hard: true,
                selectedDifficulty: flashcardDifficulty,
            }));
        }
    };

    return { isDifficultyClicked, handleDifficultyClick };
};

export default useDifficultyLevelClick;
