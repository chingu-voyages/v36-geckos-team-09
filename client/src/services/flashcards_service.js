import http from './http-common';

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

    updateCollection(data) {
        return http.put(`/collection/`, data);
    }

    createCollection(data) {
        return http.post(`/collection/`, data);
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
