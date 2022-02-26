import { useState } from 'react';

const useDifficultyLevelClick = () => {
    const [isDifficultyClicked, setIsDifficultyClicked] = useState({
        easy: true,
        medium: false,
        hard: false,
        selectedDifficulty: 'easy',
    });

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
