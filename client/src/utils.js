import Joi from 'joi';

export const newFlashcardSchema = Joi.object({
    question: Joi.string().required(),
    answerA: Joi.string().required(),
    answerB: Joi.string().required(),
    answerC: Joi.string().required(),
    answerD: Joi.string().required(),
    correctAnswer: Joi.string()
        .valid('a', 'b', 'c', 'd', 'A', 'B', 'C', 'D')
        .required()
        .uppercase(),
});

export const addNewCollectionSchema = Joi.object({
    collectionName: Joi.string().required(),
});

export const changeCollectionNameSchema = Joi.object({
    newCollectionName: Joi.string().required(),
});

export const editFlashcardSchema = Joi.object({
    question: Joi.string().required(),
    answerA: Joi.string().required(),
    answerB: Joi.string().required(),
    answerC: Joi.string().required(),
    answerD: Joi.string().required(),
    correctAnswer: Joi.string()
        .valid('a', 'b', 'c', 'd', 'A', 'B', 'C', 'D')
        .required()
        .uppercase(),
});
