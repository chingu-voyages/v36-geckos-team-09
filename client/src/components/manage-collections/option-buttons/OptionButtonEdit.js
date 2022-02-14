import '../../../styles/collections.scss';
import '../../../styles/collection.scss';
import { Typography, IconButton, Tooltip } from '@mui/material';
import { BiEdit } from 'react-icons/bi';

const OptionButtonEdit = ({ classToApply, handleClick, text }) => {
    return (
        <Tooltip
            title={<Typography fontSize='1.1rem'>{text}</Typography>}
            placement='top-end'
            arrow
        >
            <IconButton
                className={`${classToApply}__option`}
                onClick={handleClick}
                size='small'
            >
                <BiEdit size='2rem' />
            </IconButton>
        </Tooltip>
    );
};

export default OptionButtonEdit;
