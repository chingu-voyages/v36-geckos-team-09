import Joi from 'joi';

export const newFlashcardSchema = Joi.object({
    question: Joi.string().required(),
    answerA: Joi.string().required(),
    answerB: Joi.string().required(),
    answerC: Joi.string(),
    answerD: Joi.string(),
    correctAnswer: Joi.string()
        .valid('a', 'b', 'c', 'd', 'A', 'B', 'C', 'D')
        .required()
        .uppercase(),
});

export const addNewCollectionSchema = Joi.object({
    collectionName: Joi.string().required(),
});
