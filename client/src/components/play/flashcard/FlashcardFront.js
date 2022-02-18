import OptionButtonFlip from '../option-butttons/OptionButtonFlip';

import '../../../styles/playBox.scss';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

const FlashcardFront = ({ cardRef, handleFlipClick }) => {
    return (
        <Card className='play-box__card'>
            <CardContent>
                <Box width='100%' display='flex' justifyContent='right' mb={2}>
                    <OptionButtonFlip
                        flip='Back'
                        side='front'
                        handleClick={handleFlipClick}
                    />
                </Box>
                <Box
                    ref={cardRef}
                    display='flex'
                    alignItems='center'
                    flexDirection='column'
                    m={3}
                    maxWidth='600px'
                >
                    <Typography variant='h5' fontWeight={500}>
                        <Typography
                            variant='span'
                            fontWeight={700}
                            fontSize='2.2rem'
                            mr={1}
                            color='secondary'
                        >
                            1.
                        </Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Eveniet, harum!orem ipsum dolor sit amet,
                        consectetur adipisicing elit. Eveniet, harum!
                    </Typography>

                    <Box mt={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography fontSize='1.3rem'>
                                    <Typography
                                        variant='span'
                                        fontWeight={500}
                                        fontSize='1.8rem'
                                        mr={1}
                                        color='secondary'
                                    >
                                        A.
                                    </Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Eveniet, harum!orem ipsum
                                    dolor sit amet, consectetur adipisicing
                                    elit. Eveniet, harum!
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography fontSize='1.3rem'>
                                    <Typography
                                        variant='span'
                                        fontWeight={500}
                                        fontSize='1.8rem'
                                        mr={1}
                                        color='secondary'
                                    >
                                        B.
                                    </Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Eveniet, harum!orem ipsum
                                    dolor sit amet, consectetur adipisicing
                                    elit. Eveniet, harum!
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography fontSize='1.3rem'>
                                    <Typography
                                        variant='span'
                                        fontWeight={500}
                                        fontSize='1.8rem'
                                        mr={1}
                                        color='secondary'
                                    >
                                        C.
                                    </Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Eveniet, harum!orem ipsum
                                    dolor sit amet, consectetur adipisicing
                                    elit. Eveniet, harum!
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography fontSize='1.3rem'>
                                    <Typography
                                        variant='span'
                                        fontWeight={500}
                                        fontSize='1.8rem'
                                        mr={1}
                                        color='secondary'
                                    >
                                        D.
                                    </Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Eveniet, harum!orem ipsum
                                    dolor sit amet, consectetur adipisicing
                                    elit. Eveniet, harum!
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FlashcardFront;
