import '../../../styles/collections.scss';
import '../../../styles/collection.scss';
import { Typography, IconButton, Tooltip } from '@mui/material';
import { FaCheck } from 'react-icons/fa';

const OptionButtonSave = ({ classToApply, handleClick, text }) => {
    return (
        <Tooltip
            title={<Typography fontSize='1.1rem'>{text}</Typography>}
            placement='top-end'
            arrow
        >
            <IconButton className={classToApply} onClick={handleClick}>
                <FaCheck />
            </IconButton>
        </Tooltip>
    );
};

export default OptionButtonSave;
