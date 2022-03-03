import EndGameBox from './EndGameBox';

import { Box } from '@mui/material';

const EndGame = ({ isQuizModeChecked }) => {
    return (
        <Box display='flex' flexDirection='column' alignItems='center' mt={10}>
            <EndGameBox isQuizModeChecked={isQuizModeChecked} />
        </Box>
    );
};
export default EndGame;
