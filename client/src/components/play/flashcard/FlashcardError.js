import { Typography, Box, Card, CardContent } from '@mui/material';

const FlashcardError = () => {
    return (
        <Card className='play-box__card'>
            <CardContent>
                <Box
                    display='flex'
                    alignItems='center'
                    flexDirection='column'
                    m={3}
                    maxWidth='600px'
                >
                    <Typography
                        fontWeight={700}
                        fontSize='3rem'
                        mr={1}
                        color='secondary'
                    >
                        0
                    </Typography>
                    <Typography fontSize='2rem'>Flashcards</Typography>
                    <Typography fontSize='2rem'>EMPTY COLLECTION</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FlashcardError;
