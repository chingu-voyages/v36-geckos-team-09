import { Typography, IconButton, Tooltip } from '@mui/material';

const OptionButton = ({ text, icon, handleClick, classToApply }) => {
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
                {icon}
            </IconButton>
        </Tooltip>
    );
};

export default OptionButton;
