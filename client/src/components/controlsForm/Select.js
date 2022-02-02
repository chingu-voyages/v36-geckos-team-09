import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value, onChange, options } = props;

    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                {
                    options.map(
                        item => (<MenuItem key={item} value={item}>{item}</MenuItem>)
                    )
                }
            </MuiSelect>
        </FormControl>
    )
}