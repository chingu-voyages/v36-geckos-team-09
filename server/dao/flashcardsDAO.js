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

  static async getFlashcardByCollection(collection_name) {
    try {

      return await flashcards.aggregate([
        {
            $match: {
                collection_name: collection_name
            }
        }]).toArray()
       

      
    } catch (e) {
      console.error(`Something went wrong in getFlashcardsByCollection: ${e}`)
      throw e
    }
  }

  static async deleteCollection(collection_name){
    try {
      const deleteResponse = await flashcards.deleteMany({
        collection_name: collection_name
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete collection: ${e}`)
      return { error: e }
    }
  }

  static async updateCollection(old_collection_name, new_collection_name) {
    try {
      const updateResponse = await flashcards.updateMany(
        { collection_name:old_collection_name},
        { $set: { collection_name: new_collection_name} },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update collection: ${e}`)
      return { error: e }
    }
  }

  static async createCollection(collection_name) {
    try {
      const flashcardDoc = { 
        collection_name:collection_name,
        prompt: 'Sample Flashcard',
        answers: [],
        right_answer:null,
        isSampleCard:true }

      return await flashcards.insertOne(flashcardDoc)
    } catch (e) {
      console.error(`Unable to post collection: ${e}`)
      return { error: e }
    }
  }

  static async addFlashcard(collection_name, prompt, answers, right_answer, difficulty) {
    try {
      const flashcardDoc = { 
        collection_name,
        prompt: prompt,
        answers: answers,
        right_answer:right_answer,
        difficulty: difficulty }

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

  
  static async updateFlashcard(flashcardId, collection_name, prompt, answers, right_answer, difficulty) {
    try {
      const updateResponse = await flashcards.updateOne(
        { _id: ObjectId(flashcardId)},
        { $set: { collection_name: collection_name, prompt: prompt, answers: answers, right_answer: right_answer, difficulty:difficulty } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update flashcard: ${e}`)
      return { error: e }
    }
  }

}

