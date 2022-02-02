
import React, { useState, useEffect } from 'react';
import FlashcardsDataService from '../../services/flashcards_service';
import { Link } from 'react-router-dom';
import { useForm } from '../controlsForm/useForm';

const AddFlashcard = (props) => {

    const initialFlashcardState = {
        collection_name: "",
        prompt: "",
        answers: ['1','2','3','4'],
        right_answer: 1
      };

    const [submitted, setSubmitted] = useState(false)
    const [collections, setCollections] = useState([null])

         const {
            values,
            setValues,
            handleInputChange,
        } = useForm(initialFlashcardState)




     

    
    const saveFlashcard = () => {
        console.log(values)
        var data = {
            collection_name: values.collection_name,
            prompt: values.prompt,
            answers: values.answers,
            right_answer: values.right_answer
        }

        FlashcardsDataService.createFlashcard(data)
            .then((response) => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    //retrieving all the collection names
    useEffect(() => {
        FlashcardsDataService.getAll().then((response) => {
            const res = response.data.flashcards.map(e => { return e.collection_name})
            const collections_res = res.filter((item, 
                index) => res.indexOf(item) === index);
            setCollections(collections_res)
        })
        .catch((e) => {
            console.log(e);
        });
        
    }, [collections]);
   

    

    return (
        <div>
            <div>
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <Link to={'/manage-collections/'}>
                            Back to your Flashcards Collection
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div>
                            <h1 htmlFor='description'>Add Flashcard</h1>
                            <br></br>
                            <label>Select a Collection</label>
                            <select
                                name="collection_name"
                                label="Collection Name"
                                value={values.collection_name}
                                onChange={handleInputChange}
                            >
                            <option value="">None</option>
                            {collections.map((collection,index) => { return (<option key={index} value={collection}>{collection}</option>) })}

                            </select>
                            <br />
                            <label>or Create a new Collection</label>
                            <input
                                name="collection_name"
                                label="Collection Name"
                                value={values.collection_name}
                                onChange={e => handleInputChange(e, null)}
                            />
                            
                            <br />
                            <br />
                            <label> Prompt:</label>
                            <input
                                name="prompt"
                                label="Prompt"
                                value={values.prompt}
                                onChange={e => handleInputChange(e, null)}
                            />
                            <br />
                            <br />
                            {/* answers */}
                            <label> 1.:</label>
                            <input
                                label="First Answer"
                                name='answers[0]'
                                value={values.answers[0]}
                                onChange={e => handleInputChange(e,0)}
                            />
                            <br />
                            <label> 2.:</label>
                            <input
                                label="second Answer"
                                name='answers[1]'
                                value={values.answers[1]}
                                onChange={e => handleInputChange(e,1)}
                            />
                            <br />
                            <label> 3.:</label>
                            <input
                                label="third Answer"
                                name='answers[2]'
                                value={values.answers[2]}
                                onChange={e => handleInputChange(e,2)}
                            />
                            <br />
                            <label> 4.:</label>
                            <input
                                label="Fourth Answer"
                                name='answers[3]'
                                value={values.answers[3]}
                                onChange={e => handleInputChange(e,3)}
                            />
                            <br />
                            <br />
                            {/* right answer */}
                            <label> Right Answer:</label>
                            <select
                                name="right_answer"
                                label="Right Answer"
                                value={values.right_answer}
                                onChange={handleInputChange}
                            >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>

                            </select>
                        </div>
                        <button onClick={saveFlashcard}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddFlashcard;

