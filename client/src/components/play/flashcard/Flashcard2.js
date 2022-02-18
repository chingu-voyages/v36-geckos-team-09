import { useState, useRef, useEffect } from 'react';

import FlashcardFront from './FlashcardFront';
import FlashcardBack from './FlashcardBack';

import ReactCardFlip from 'react-card-flip';

const Flashcard2 = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const [cardHeight, setCardHeight] = useState(null);

    const cardRef = useRef();

    const handleFlipClick = () => setIsFlipped((prevState) => !prevState);

    useEffect(() => {
        setCardHeight(cardRef.current.clientHeight);
    }, []);

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
            <FlashcardFront
                cardRef={cardRef}
                handleFlipClick={handleFlipClick}
            />

            <FlashcardBack
                cardHeight={cardHeight}
                handleFlipClick={handleFlipClick}
            />
        </ReactCardFlip>
    );
};

export default Flashcard2;
