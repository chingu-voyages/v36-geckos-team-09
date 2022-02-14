import Joi from 'joi';

const string = Joi.string();

export const newFlashcardSchema = Joi.object({
    question: string.required(),
    answerA: string.required(),
    answerB: string.required(),
    answerC: string.required(),
    answerD: string.required(),
    correctAnswer: string
        .valid('a', 'b', 'c', 'd', 'A', 'B', 'C', 'D')
        .required()
        .uppercase(),
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
    correctAnswer: string
        .valid('a', 'b', 'c', 'd', 'A', 'B', 'C', 'D')
        .uppercase()
        .required()
        .messages({
            'any.only': 'Incorrect input!',
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
