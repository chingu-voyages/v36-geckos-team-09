import express from 'express';
import FlashcardController from './flashcards.controller.js';

const router = express.Router();

router
    .route('/')
    .get(FlashcardController.apiGetFlashcards)
    .post(FlashcardController.apiPostFlashcard)
    .put(FlashcardController.apiUpdateFlashcard);

router
    .route('/collection/')
    .put(FlashcardController.apiUpdateCollection)
    .post(FlashcardController.apiPostCollection);

router
    .route('/collection/:collection_name')
    .get(FlashcardController.apiGetFlashcardByCollection)
    .delete(FlashcardController.apiDeleteCollection)
    .put(FlashcardController.apiUpdateCollection);

router
    .route('/id/:id')
    .get(FlashcardController.apiGetFlashcardById)
    .put(FlashcardController.apiUpdateFlashcard)
    .delete(FlashcardController.apiDeleteFlashcard);

export default router;
