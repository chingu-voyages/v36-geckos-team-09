import { DIFFICULTY_CHIPS } from '../../static';

import { Typography, Stack, Chip } from '@mui/material';

const DifficultyLevelButtonGroup = ({
    isDifficultyClicked,
    handleDifficultyClick,
}) => {
    return (
        <Stack spacing={1} alignItems='center'>
            <Stack direction='row' spacing={1}>
                {DIFFICULTY_CHIPS.map((chip) => (
                    <Chip
                        key={chip.id}
                        label={
                            <Typography
                                className='new-flashcard__difficulty-chip'
                                fontSize='1.2rem'
                            >
                                {chip.text}
                            </Typography>
                        }
                        color={chip.color}
                        variant={
                            isDifficultyClicked[chip.text]
                                ? 'contained'
                                : 'outlined'
                        }
                        onClick={() => handleDifficultyClick(chip.text)}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default DifficultyLevelButtonGroup;
