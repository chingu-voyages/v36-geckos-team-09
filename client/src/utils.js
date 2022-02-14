import FlashcardsDataService from './services/flashcards_service';

// The function iterates through array of objects and throws out duplicates based on the passed key
export const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
};

// The function retrives all existing collection names
export const getCollectionNames = async () => {
    let existingCollectionNames = null;

    try {
        const res = await FlashcardsDataService.getAll();

        const collections = res.data.flashcards;

        existingCollectionNames = collections.reduce(
            (collectionNames, collection) => {
                if (!collectionNames.includes(collection.collection_name))
                    collectionNames.push(collection.collection_name);
                return collectionNames;
            },
            [],
        );
    } catch (e) {
        console.log(e);
    }

    return existingCollectionNames;
};
