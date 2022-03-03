import { useState, useEffect } from 'react';

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
    FormControlLabel,
    Checkbox,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { playSlice } from '../../redux/slices/playSlice';

const Play = () => {
    const selectedCollection = useSelector(
        (state) => state.play.selectedCollection,
    );

    const [collections, setCollections] = useState([]);

    const [playMode, setPlayMode] = useState({
        isButtonDisabled: true,
        isQuizModeChecked: false,
        isPlaying: false,
    });

    const dispatch = useDispatch();

    const handleSelectChange = (e) => {
        dispatch(playSlice.actions.setSelectedCollection(e.target.value));

        setPlayMode((prevState) => ({
            ...prevState,
            isButtonDisabled: false,
        }));
    };

    const handleCheckboxChange = (e) => {
        setPlayMode((prevState) => ({
            ...prevState,
            isQuizModeChecked: e.target.checked,
        }));
    };

    const handlePlayClick = () => {
        setPlayMode((prevState) => ({
            ...prevState,
            isPlaying: true,
        }));

        playMode.isQuizModeChecked ? dispatch(playSlice.actions.setIsNextButtonDisabled(true)) : dispatch(playSlice.actions.setIsNextButtonDisabled(false)); //nextcard bug solved
    };

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

        dispatch(playSlice.actions.resetFlashcardIndex());

        return () => dispatch(playSlice.actions.resetSelectedCollection());
    }, []);

    return (
        <>
            {!playMode.isPlaying ? (
                <Box
                    className='play'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Typography variant='h5' color='white'>
                        Select Collection & Choose Mode
                    </Typography>

                    <Box display='flex' flexDirection='column' width='100%'>
                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            mt={2}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={playMode.isQuizModeChecked}
                                        onChange={handleCheckboxChange}
                                        size='large'
                                        color='secondary'
                                    />
                                }
                                label={
                                    <Typography color='white' fontSize='1.2rem'>
                                        Quiz Mode?
                                    </Typography>
                                }
                            />
                        </Box>
                        <Box display='flex' alignItems='center'>
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
                                    onChange={handleSelectChange}
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
                                disabled={playMode.isButtonDisabled}
                            >
                                Play
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <PlayBox playMode={playMode} setPlayMode={setPlayMode} />
            )}
        </>
    );
};

export default Play;
