import Joi from 'joi';

const string = Joi.string();

export const newFlashcardSchema = Joi.object({
    question: string.required().messages({
        'string.empty': 'This field is required!',
    }),
    answerA: string.required().messages({
        'string.empty': 'This field is required!',
    }),
    answerB: string.required().messages({
        'string.empty': 'This field is required!',
    }),
    answerC: string.required().messages({
        'string.empty': 'This field is required!',
    }),
    answerD: string.required().messages({
        'string.empty': 'This field is required!',
    }),
});

export const editFlashcardSchema = Joi.object({
    question: string.required().messages({
        'string.empty': 'This field is required!',
    }),
    answerA: string.required().messages({
        'string.empty': 'This field is required!',
    }),
    answerB: string.required().messages({
        'string.empty': 'This field is required!',
    }),
    answerC: string.required().messages({
        'string.empty': 'This field is required!',
    }),
    answerD: string.required().messages({
        'string.empty': 'This field is required!',
    }),
});

export const addNewCollectionSchema = Joi.object({
    collectionName: string.trim().required().messages({
        'string.empty': 'This field is required!',
    }),
});

export const changeCollectionNameSchema = Joi.object({
    newCollectionName: string.trim().required().messages({
        'string.empty': 'This field is required!',
    }),
});
