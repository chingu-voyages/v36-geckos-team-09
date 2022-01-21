import FlashcardsDAO from "../dao/flashcardsDAO.js"

export default class FlashcardsController {
  static async apiGetFlashcards(req, res, next) {
    const flashcardsPerPage = req.query.flashcardsPerPage ? parseInt(req.query.flashcardsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.prompt) {
      filters.prompt = req.query.prompt
    } 

    const { flashcardsList, totalNumFlashcards } = await FlashcardsDAO.getFlashcards({
      filters,
      page,
      flashcardsPerPage,
    })

    let response = {
      flashcards: flashcardsList,
      page: page,
      filters: filters,
      entries_per_page: flashcardsPerPage,
      total_results: totalNumFlashcards,
    }
    res.json(response)
  }

  static async apiGetFlashcardById(req, res, next) {
    try {
      let id = req.params.id || {}
      let flashcard = await FlashcardsDAO.getFlashcardByID(id)
      if (!flashcard) {
        res.status(404).json({ error: "Flashcard Not found" })
        return
      }
      res.json(flashcard)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiPostFlashcard(req, res, next) {
    try {
      const prompt = req.body.prompt
      const answers =  req.body.answers 
      const right_answer = req.body.right_answer

      const FlashcardResponse = await FlashcardsDAO.addFlashcard(
        prompt,
        answers,
        right_answer,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteFlashcard(req, res, next) {
    try {
      const flashcardId = req.params.id
      console.log(flashcardId)
      const flashcardResponse = await FlashcardsDAO.deleteFlashcard(flashcardId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateFlashcard(req, res, next) {
    try {
      const flashcardId = req.body._id
      const prompt = req.body.prompt
      const answers = req.body.answers
      const right_answer= req.body.right_answers

      const flashcardResponse = await FlashcardsDAO.updateFlashcard(
        flashcardId,
        prompt,
        answers,
        right_answer,
      )

      var { error } = flashcardResponse
      if (error) {
        res.status(400).json({ error })
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  
}