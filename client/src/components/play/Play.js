import Flashcard from './Flashcard';

import { useState, useEffect } from 'react';

import FlashcardsDataService from '../../services/flashcards_service';

import PlayBox from './PlayBox';

import { getCollectionNames } from '../../utils';

import '../../styles/play.scss';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { playSlice } from '../../redux/slices/playSlice';

export default function Play() {
    /*    const [collection, setCollection] = useState('');
    const [collections, setCollections] = useState([]);
    const [isCollectionSelected, setCollectionSelected] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [guessedFlashcards, setGuessedFlashcards] = useState(0);
    const [currentFlashcard, setCurrentFlashcard] = useState();
    const [isGameLoaded, setGameLoaded] = useState(false);

    const handleInputChange = (e) => {
        const { value } = e.target;

        setCollection(value);
    };

    //play button --- game starts
    const handlePlayButton = (e) => {
        e.preventDefault();
        FlashcardsDataService.getCollection(collection)
            .then((response) => {
                const resFlashcards = response.data.flashcards.filter((e) =>
                    e.hasOwnProperty('isSampleCard') ? false : true,
                );

                setFlashcards(resFlashcards);
                //setting

                setCollectionSelected(true);
                const flashcard =
                    resFlashcards[
                        Math.floor(Math.random() * resFlashcards.length)
                    ];
                setCurrentFlashcard(flashcard);

                setGameLoaded(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    //correct button
    const handleCorrectAnswerButton = (e) => {
        setGuessedFlashcards((prevState) => prevState + 1);

        setCurrentFlashcardState();
    };

    //wrong button
    const handleWrongAnswerButton = (e) => {
        shuffleFlashcards();
    };

    const handleGameOverButton = (e) => {
        setCollectionSelected(false);
        setGuessedFlashcards(0);
    };

    //retrieving collections
    useEffect(() => {
        let mounted = true;
        FlashcardsDataService.getAll()
            .then((response) => {
                if (mounted) {
                    const res = response.data.flashcards
                        .filter((element) =>
                            element.hasOwnProperty('isSampleCard')
                                ? false
                                : true,
                        )
                        .map((element) => element.collection_name);
                    const collections_res = res.filter(
                        (item, index) => res.indexOf(item) === index,
                    ); //removing duplicates
                    setCollections(collections_res);
                    setCollection(collections_res[0]);
                }
            })
            .catch((e) => {
                console.log(e);
            });

        return () => {
            mounted = false;
        };
    }, []);

    function setCurrentFlashcardState() {
        if (flashcards.length > 1) {
            let newState = flashcards;
            newState.splice(newState.indexOf(currentFlashcard), 1);
            setFlashcards(newState);

            shuffleFlashcards();
        } else {
            setFlashcards(null);
        }
    }

    function shuffleFlashcards() {
        const flashcard =
            flashcards[Math.floor(Math.random() * flashcards.length)];
        setCurrentFlashcard(flashcard);
    } */

    ////////////////////////////////////////////////////////////////////////////////

    const [collections, setCollections] = useState([]);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [isPlaying, setIsPlaying] = useState(false);

    const selectedCollection = useSelector(
        (state) => state.play.selectedCollection,
    );

    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(playSlice.actions.setSelectedCollection(e.target.value));

        setIsButtonDisabled(false);
    };

    const handlePlayClick = () => setIsPlaying(true);

    useEffect(() => {
        const getCollections = async () => {
            try {
                const collectionNames = await getCollectionNames();

                setCollections(collectionNames);
            } catch (e) {
                console.log(e);
            }
        };

        getCollections();
    }, []);

    return (
        <>
            {!isPlaying ? (
                <Box
                    className='play'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Typography variant='h5' color='white'>
                        Select Collection
                    </Typography>

                    <Box display='flex' width='100%'>
                        <FormControl
                            className='play__select-collection'
                            color='secondary'
                        >
                            <InputLabel id='demo-simple-select-label'>
                                <Typography fontSize='1.4rem' color='white'>
                                    Collections
                                </Typography>
                            </InputLabel>
                            <Select
                                value={selectedCollection}
                                onChange={handleChange}
                                label={<Typography>Collections</Typography>}
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                            >
                                {collections.map((collection) => (
                                    <MenuItem
                                        value={collection}
                                        key={collection}
                                    >
                                        <Typography fontSize='1.5rem'>
                                            {collection}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            className='play__play-btn'
                            onClick={handlePlayClick}
                            variant='contained'
                            color='secondary'
                            disabled={isButtonDisabled}
                        >
                            Play
                        </Button>
                    </Box>
                </Box>
            ) : (
                <PlayBox
                    setIsPlaying={setIsPlaying}
                    setIsButtonDisabled={setIsButtonDisabled}
                />
            )}

            {/*   <div >
                {!isCollectionSelected ? (
                    <>
                        <label>Select a Collection</label>
                        <select
                            name='collection_name'
                            label='Collection Name'
                            value={collection}
                            onChange={handleInputChange}
                        >
                            {collections.map((collection, index) => {
                                return (
                                    <option key={index} value={collection}>
                                        {collection}
                                    </option>
                                );
                            })}
                        </select>
                        <button onClick={handlePlayButton}>Play</button>
                    </>
                ) : flashcards === null ? (
                    <>
                        <h1>
                            you finished Studying {guessedFlashcards.toString()}{' '}
                            flashcards
                        </h1>
                        <button onClick={handleGameOverButton}>
                            Play Again
                        </button>
                    </>
                ) : isGameLoaded ? (
                    <>
                        <h1>
                            Studied Flashcards:{' '}
                            <strong>{guessedFlashcards.toString()}</strong> ---
                            Flashcards left to study:{' '}
                            <strong>{flashcards.length.toString()}</strong>
                        </h1>
                        <Flashcard flashcard={currentFlashcard} />
                        <button
                            className='btn correct'
                            onClick={handleCorrectAnswerButton}
                        >
                            Correct
                        </button>
                        <button
                            className='btn wrong'
                            onClick={handleWrongAnswerButton}
                        >
                            Wrong
                        </button>
                    </>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div> */}
        </>
    );
}
