import '../../../styles/playBox.scss';
import { Typography, IconButton } from '@mui/material';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const OptionButtonPrevNext = ({ direction }) => {
    return (
        <IconButton className='play-box__btn' size='small'>
            {direction === 'prev' && (
                <>
                    <IoIosArrowBack size='2.5rem' />
                    <Typography fontSize='1.8rem'>PREV</Typography>
                </>
            )}

            {direction === 'next' && (
                <>
                    <Typography fontSize='1.8rem'>NEXT</Typography>
                    <IoIosArrowForward size='2.5rem' />
                </>
            )}
        </IconButton>
    );
};

export default OptionButtonPrevNext;
