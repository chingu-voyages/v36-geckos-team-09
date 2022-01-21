import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let flashcards

export default class FlashcardsDAO {
  static async injectDB(conn) {
    if (flashcards) {
      return
    }
    try {
      flashcards = await conn.db(process.env.FLASHCARDS_NS).collection("flashcards")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in flashcardsDAO: ${e}`,
      )
    }
  }

  static async getFlashcards({
    filters = null,
    page = 0,
    flashcardsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("prompt" in filters) {
        query = { $text: { $search: filters["prompt"] } }
      } 
    }

    let cursor
    
    try {
      cursor = await flashcards
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { flashcardsList: [], totalNumFlashcards: 0 }
    }

    const displayCursor = cursor.limit(flashcardsPerPage).skip(flashcardsPerPage * page)

    try {
      const flashcardsList = await displayCursor.toArray()
      const totalNumFlashcards = await flashcards.countDocuments(query)

      return { flashcardsList, totalNumFlashcards }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { flashcardsList: [], totalNumFlashcards: 0 }
    }
  }

  //to implement
  static async getFlashcardByID(id) {
    try {

      return await flashcards.aggregate([
        {
            $match: {
                _id: new ObjectId(id),
            },
        }]).next()

      
    } catch (e) {
      console.error(`Something went wrong in getFlashcardByID: ${e}`)
      throw e
    }
  }

  static async addFlashcard(prompt, answers, right_answer) {
    try {
      const flashcardDoc = { prompt: prompt,
          answers: answers,
        right_answer:right_answer }

      return await flashcards.insertOne(flashcardDoc)
    } catch (e) {
      console.error(`Unable to post flashcard: ${e}`)
      return { error: e }
    }
  }

  static async deleteFlashcard(flashcardId) {

    try {
      const deleteResponse = await flashcards.deleteOne({
        _id: ObjectId(flashcardId)
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete flashcard: ${e}`)
      return { error: e }
    }
  }

  static async updateFlashcard(flashcardId, prompt, answers, right_answer) {
    try {
      const updateResponse = await flashcards.updateOne(
        { _id: ObjectId(flashcardId)},
        { $set: { prompt: prompt, answers: answers, right_answer: right_answer } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update flashcard: ${e}`)
      return { error: e }
    }
  }

}

