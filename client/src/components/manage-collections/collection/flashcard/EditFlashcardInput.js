import { Box, Input, Typography } from '@mui/material';

const EditFlashcardInput = ({ input, defaultValue, register, errors }) => {
    return (
        <Box>
            <Input
                className='collection__edit-flashcard-input'
                type='text'
                placeholder={input.placeholder}
                defaultValue={defaultValue}
                name={input.name}
                {...register(`${input.name}`)}
            />
            <Typography className='new-flashcard__error'>
                {errors[`${input.name}`]?.message}
            </Typography>
        </Box>
    );
};

export default EditFlashcardInput;
