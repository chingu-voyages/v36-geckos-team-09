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
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { playSlice } from '../../redux/slices/playSlice';

export default function Play() {
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

        dispatch(playSlice.actions.resetFlashcardIndex());

        return () => dispatch(playSlice.actions.resetSelectedCollection());
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
        </>
    );
}
