import { useState, useRef, useEffect } from 'react';

import FlashcardFront from './FlashcardFront';
import FlashcardBack from './FlashcardBack';

import ReactCardFlip from 'react-card-flip';

import { useSelector } from 'react-redux';

const Flashcard = () => {
    const flashcardIndex = useSelector((state) => state.play.flashcardIndex);

    const cardRef = useRef();

    const [isCardFlipped, setIsCardFlipped] = useState(false);

    const [cardDimensions, setCardDimensions] = useState({
        cardHeight: null,
        cardWidth: null,
    });

    const handleFlipClick = () => setIsCardFlipped((prevState) => !prevState);

    useEffect(() => {
        setCardDimensions((prevState) => ({
            ...prevState,
            cardHeight: cardRef.current.clientHeight,
            cardWidth: cardRef.current.clientWidth,
        }));

        setIsCardFlipped(false);
    }, [flashcardIndex]);

    return (
        <ReactCardFlip
            isFlipped={isCardFlipped}
            flipDirection='horizontal'
            flipSpeedBackToFront={0.3}
            flipSpeedFrontToBack={0.3}
        >
            <FlashcardFront
                cardRef={cardRef}
                handleFlipClick={handleFlipClick}
            />

            <FlashcardBack
                cardDimensions={cardDimensions}
                handleFlipClick={handleFlipClick}
            />
        </ReactCardFlip>
    );
};

export default Flashcard;
