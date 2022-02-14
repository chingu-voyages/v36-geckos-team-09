import '../../../styles/collections.scss';
import '../../../styles/collection.scss';
import { Typography, IconButton, Tooltip } from '@mui/material';
import { AiFillCloseSquare } from 'react-icons/ai';

const OptionButtonClose = ({ classToApply, handleClick, text }) => {
    return (
        <Tooltip
            title={<Typography fontSize='1.1rem'>{text}</Typography>}
            placement='top-end'
            arrow
        >
            <IconButton className={classToApply} onClick={handleClick}>
                <AiFillCloseSquare />
            </IconButton>
        </Tooltip>
    );
};

export default OptionButtonClose;
