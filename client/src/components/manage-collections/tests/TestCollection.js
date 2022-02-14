import React, { useEffect, useState } from 'react';
import { getUniqueListBy } from '../../../utils';
import FlashcardsDataService from '../../../services/flashcards_service';

/******************** THIS IS A TESTING COMPONENT IT WILL BE DELETED WHEN WE DELIVER THE APPLICATION ******************/
const TestCollection = () => {
    const [collectionsToDisplay, setCollectionsToDisplay] = useState([]);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [createCollectionName, setCreateCollectionName] = useState('');
    const [isMounted, setIsMounted] = useState(true);
    const [oldCollectionName, setOldCollectionName] = useState();

    const getCollections = async () => {
        const res = await FlashcardsDataService.getAll();

        const data = res.data.flashcards;

        const dataWithoutDuplicates = getUniqueListBy(data, 'collection_name');

        if (isMounted) setCollectionsToDisplay([...dataWithoutDuplicates]);
    };

    //retrieving all the collections
    useEffect(() => {
        setIsMounted(true);

        getCollections();

        return () => setIsMounted(false);
    }, []);

    //editing the collection
    const editHandler = (e) => {
        //IT IS EXTREMELY IMPORTANT YOU WRAP EVERYTHING UP INSIDE AN OBJECT LIKE I DID OTHERWISE IT WON'T WORK
        const data = {
            old_collection_name: oldCollectionName,
            new_collection_name: newCollectionName,
        };
        FlashcardsDataService.updateCollection(data)
            .then((response) => {
                console.log('success');
            })
            .catch((error) => console.log(error));
    };

    //deleting a collection
    const deleteHandler = (e) => {
        FlashcardsDataService.deleteCollection(oldCollectionName).then(
            (response) => {
                getCollections();
                console.log(response);
            },
        );
    };

    //creating the collection
    const createHandler = (e) => {
        //IT IS EXTREMELY IMPORTANT YOU WRAP EVERYTHING UP INSIDE AN OBJECT LIKE I DID OTHERWISE IT WON'T WORK
        const data = {
            collection_name: createCollectionName,
        };
        FlashcardsDataService.createCollection(data)
            .then((response) => {
                console.log('success');
                getCollections();
            })
            .catch((error) => console.log(error));
    };

    // dropdown menu
    const handleInputChange = (e) => {
        const { value } = e.target;
        setOldCollectionName(value);
    };

    console.log(collectionsToDisplay);

    if (collectionsToDisplay.length === 0) return 'Loading...';
    return (
        <>
            <br />
            <br />
            <div>
                <h1>Testing...</h1>
                <br />
                <label>Select a Collection</label>
                <select
                    name='collection_name'
                    label='Collection Name'
                    value={oldCollectionName}
                    onChange={handleInputChange}
                >
                    {collectionsToDisplay.map((collection, index) => {
                        return (
                            <option
                                key={index}
                                value={collection.collection_name}
                            >
                                {collection.collection_name}
                            </option>
                        );
                    })}
                </select>

                <h2>selected: {oldCollectionName}</h2>
                <input
                    type='text'
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                ></input>
                <button onClick={editHandler}>edit collection</button>
                <button onClick={deleteHandler}>Delete Collection</button>
            </div>
            <br />
            <br />

            <h2>Create new Collection</h2>
            <input
                type='text'
                value={createCollectionName}
                onChange={(e) => setCreateCollectionName(e.target.value)}
            ></input>
            <button onClick={createHandler}>create collection</button>
            
        </>
    );
};

export default TestCollection;
