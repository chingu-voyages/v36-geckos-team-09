import { useState, useRef, useEffect } from 'react';

import FlashcardsDataService from '../../../services/flashcards_service';

import FlashcardFront from './FlashcardFront';
import FlashcardBack from './FlashcardBack';

import ReactCardFlip from 'react-card-flip';

import { useSelector, useDispatch } from 'react-redux';
import { playSlice } from '../../../redux/slices/playSlice';

const Flashcard2 = () => {
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    const [cardHeight, setCardHeight] = useState(null);

    const cardRef = useRef();

    const selectedCollection = useSelector(
        (state) => state.play.selectedCollection,
    );

    const dispatch = useDispatch();

    const handleFlipClick = () => setIsCardFlipped((prevState) => !prevState);

    useEffect(() => {
        setCardHeight(cardRef.current.clientHeight);
    }, []);

    useEffect(() => {
        const getCollectionFlashcards = async (collectionName) => {
            try {
                const res = await FlashcardsDataService.getCollection(
                    collectionName,
                );

                const data = res.data.flashcards.filter((flashcard) =>
                    flashcard.hasOwnProperty('isSampleCard') ? false : true,
                );

                dispatch(playSlice.actions.setCollectionToDisplay(data));
            } catch (e) {
                console.log(e);
            }
        };

        getCollectionFlashcards(selectedCollection);
    }, []);

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
