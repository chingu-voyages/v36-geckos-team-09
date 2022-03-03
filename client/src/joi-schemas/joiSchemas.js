import Joi from 'joi';

const string = Joi.string();

export const flashcardSchema = Joi.object({
    question: string.trim().required().messages({
        'string.empty': 'This field is required!',
    }),
    answerA: string.trim().required().messages({
        'string.empty': 'This field is required!',
    }),
    answerB: string.trim().required().messages({
        'string.empty': 'This field is required!',
    }),
    answerC: string.trim().required().messages({
        'string.empty': 'This field is required!',
    }),
    answerD: string.trim().required().messages({
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
