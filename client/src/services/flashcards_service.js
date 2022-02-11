import http from '../http-common';

class FlashcardsDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    getCollection(collection_name) {
        return http.get(`/collection/${collection_name}`);
    }

    deleteCollection(collection_name) {
        return http.delete(`/collection/${collection_name}`);
    }

    updateCollection(old_collection_name, new_collection_name) {
        return http.put(
            `/collection/${old_collection_name}`,
            new_collection_name,
        );
    }

    find(query, by = 'prompt', page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createFlashcard(data) {
        return http.post('/', data);
    }

    updateFlashcard(data) {
        return http.put('/', data);
    }

    deleteFlashcard(id) {
        return http.delete(`/id/${id}`);
    }
}

export default new FlashcardsDataService();
