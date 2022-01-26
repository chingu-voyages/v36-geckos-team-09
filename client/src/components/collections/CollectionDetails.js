import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

const CollectionDetails = () => {
    const { collectionName } = useParams();

    return <Box>Collection Details - {collectionName}</Box>;
};

export default CollectionDetails;
