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
/* 
/* <Box key={input.id}>
                                        <Input
                                            className='collection__edit-flashcard-input'
                                            type='text'
                                            placeholder={input.placeholder}
                                            defaultValue={rowQuestion}
                                            name={input.name}
                                            {...register(`${input.name}`)}
                                        />
                                        <Typography className='new-flashcard__error'>
                                            {errors[`${input.name}`]?.message}
                                        </Typography>
                                    </Box> */

/* if (input.id === 5) {
                                return (
                                    <Box key={input.id}>
                                        <Input
                                            className='collection__edit-flashcard-input'
                                            type='text'
                                            placeholder={input.placeholder}
                                            defaultValue={rowCorrectAnswer}
                                            name={input.name}
                                            {...register(`${input.name}`)}
                                        />
                                        <Typography className='new-flashcard__error'>
                                            {errors[`${input.name}`]?.message}
                                        </Typography>
                                    </Box>
                                );
                            }
 */

/* <Box key={input.id}>
                                    <Input
                                        className='collection__edit-flashcard-input'
                                        type='text'
                                        placeholder={input.placeholder}
                                        defaultValue={rowAnswers[input.id - 1]}
                                        name={input.name}
                                        {...register(`${input.name}`)}
                                    />
                                    <Typography className='new-flashcard__error'>
                                        {errors[`${input.name}`]?.message}
                                    </Typography>
                                </Box>
 */
