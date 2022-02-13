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
