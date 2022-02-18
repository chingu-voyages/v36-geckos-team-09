import { useState, useRef, useEffect } from 'react';

import FlashcardFront from './FlashcardFront';
import FlashcardBack from './FlashcardBack';

import ReactCardFlip from 'react-card-flip';

const Flashcard2 = () => {
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    const [cardHeight, setCardHeight] = useState(null);

    const cardRef = useRef();

    const handleFlipClick = () => setIsCardFlipped((prevState) => !prevState);

    useEffect(() => {
        setCardHeight(cardRef.current.clientHeight);
    }, []);

    /*  useEffect(() => {

        const getCollectionFlashcards = async (collectionName) => {
    
            try {
                const res = await FlashcardsDataService.getCollection(
                    collectionName,
                );
    
                const data = res.data.flashcards.filter((flashcard) =>
                    flashcard.hasOwnProperty('isSampleCard') ? false : true,
                );
    
            
                    dispatch(collectionsSlice.actions.setCollectionToDisplay(data));
    
            } catch (e) {
                console.log(e);
            }
        };

        getCollectionFlashcards()

    }, []) */

    return (
        <ReactCardFlip isFlipped={isCardFlipped} flipDirection='horizontal'>
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
