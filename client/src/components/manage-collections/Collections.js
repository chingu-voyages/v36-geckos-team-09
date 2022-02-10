import CollectionsBox from './CollectionsBox';

import { useEffect, useState } from 'react'

import FlashcardsDataService from '../../services/flashcards_service';

import '../../styles/collections.scss';
import { List } from '@mui/material';


import { useSelector } from 'react-redux';

const Collections = () => {
    const collections = useSelector((state) => state.collections.collections);

    const collectionsToDisplay = Object.values(collections);

    const [collectionList, setCollectionList] = useState([])

    //retrieving collections
    useEffect(() => {
        let mounted = true;
         FlashcardsDataService.getAll().then((response) => {
            if(mounted){
            const res = response.data.flashcards.map(e => { return e.collection_name})
            const collections_res = res.filter((item, index) => res.indexOf(item) === index);
            setCollectionList(collections_res)
            }
        })
        .catch((e) => {
                console.log(e);
        });
    
        return () => {
            mounted=false;
        };
          
    }, []);

    return (
            <>
            {
            collectionList.length !== 0 ? (
                <List className='collections'>
                {collectionsToDisplay.map((collection) => (
                    <CollectionsBox key={collection.id} collection={collection} />
                ))}
            </List>
                ) : (<p>Loading...</p>)
            }
            </>
    );
    
    
};

export default Collections;
