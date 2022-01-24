import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FlashcardsDataService from '../../services/flashcards_service';

export default function Collections() {
    const [flashcards, setFlashcards] = useState([]);
    /* const [searchPrompt, setSearchPrompt ] = useState(""); */

    useEffect(() => {
        retrieveFlashcards();
    }, [flashcards]);

    /*   const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };
 */

    const retrieveFlashcards = () => {
        FlashcardsDataService.getAll()
            .then((response) => {
                //console.log(response.data);
                setFlashcards(response.data.flashcards);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    /*   const refreshList = () => {
    retrieveFlashcards();
  }; */

    const find = (query, by) => {
        FlashcardsDataService.find(query, by)
            .then((response) => {
                console.log(response.data);
                setFlashcards(response.data.flashcards);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteFlashcard = (flashcardId, index) => {
        FlashcardsDataService.deleteFlashcard(flashcardId)
            .then((response) => {})
            .catch((e) => {
                console.log(e);
            });
    };

    /*   const findByName = () => {
    find(searchName, "name")
  }; */

    return (
        <div>
            <Link to={'/collections/add-flashcard'}>Add Flashcard</Link>

            <br></br>
            <br></br>

            {flashcards.map((flashcard, index) => {
                return (
                    <div key={flashcard._id}>
                        <div className='flashcard'>
                            <div className='flashcard-body'>
                                <h2 className='flashcard-prompt'>
                                    {flashcard.prompt}
                                </h2>
                                <p className='flashcard-text'>
                                    <strong>1: </strong>
                                    {flashcard.answers[0]}
                                    <br />
                                    <strong>2: </strong>
                                    {flashcard.answers[1]}
                                    <br />
                                    <strong>3: </strong>
                                    {flashcard.answers[2]}
                                    <br />
                                    <strong>4: </strong>
                                    {flashcard.answers[3]}
                                    <br />
                                    <strong>Right Answer: </strong>
                                    {flashcard.right_answer}
                                    <br /> {/* for testing purposes */}
                                </p>
                            </div>
                            <Link
                                to={`/collections/edit-flashcard/${flashcard._id}`}
                            >
                                Edit Flashcard
                            </Link>
                            <button
                                onClick={() =>
                                    deleteFlashcard(flashcard._id, index)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
