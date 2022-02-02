import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialValues) {


    const [values, setValues] = useState(initialValues);
    

    const handleInputChange = (e,index) => {
        const { name, value } = e.target
        
        if(index==null){
        setValues({
            ...values,
            [name]: value
        })
        }else{
            let answers = values.answers
            answers[index] = value;

            setValues({
            ...values,
            answers: answers
                })
            }
    }

    const resetForm = () => {
        setValues(initialValues);
    }


    return {
        values,
        setValues,
        handleInputChange,
        resetForm

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}