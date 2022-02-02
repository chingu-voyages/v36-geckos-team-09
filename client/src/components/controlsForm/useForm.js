import { useState } from 'react'

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
