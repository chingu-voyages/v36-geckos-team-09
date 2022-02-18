import OptionButtonFlip from '../option-butttons/OptionButtonFlip';

import '../../../styles/playBox.scss';
import { Card, CardContent, Typography, Box } from '@mui/material';

const FlashcardBack = ({ cardHeight, handleFlipClick }) => {
    return (
        <Card className='play-box__card '>
            <CardContent>
                <Box width='100%' display='flex' justifyContent='right' mb={2}>
                    <OptionButtonFlip
                        flip='Front'
                        side='back'
                        handleClick={handleFlipClick}
                    />
                </Box>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    flexDirection='column'
                    m={3}
                    maxWidth='600px'
                    height={cardHeight}
                >
                    <Typography
                        variant='span'
                        fontWeight={700}
                        fontSize='3rem'
                        mb={2}
                        color='secondary'
                    >
                        A.
                    </Typography>
                    <Typography
                        fontWeight={500}
                        textAlign='center'
                        fontSize='1.5rem'
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Eveniet, harum!orem ipsum dolor sit amet,
                        consectetur adipisicing elit. Eveniet, harum!
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FlashcardBack;
