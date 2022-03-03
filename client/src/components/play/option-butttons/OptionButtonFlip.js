import '../../../styles/play/playBox.scss';
import { Typography, IconButton, Tooltip } from '@mui/material';
import { TiArrowBack, TiArrowForward } from 'react-icons/ti';

const OptionButtonFlip = ({ flip, side, handleClick }) => {
    return (
        <Tooltip
            title={<Typography fontSize='1.1rem'>{flip} Side</Typography>}
            placement='top-end'
            arrow
        >
            <IconButton
                className='play-box__btn'
                onClick={handleClick}
                size='small'
            >
                {side === 'front' && <TiArrowForward size='3rem' />}
                {side === 'back' && <TiArrowBack size='3rem' />}
            </IconButton>
        </Tooltip>
    );
};

export default OptionButtonFlip;
