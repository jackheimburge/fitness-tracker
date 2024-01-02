import sendRequest from './send-request';

const BASE_URL = '/api/exercises'

export async function getDatabaseExercises() {
    return sendRequest(BASE_URL);
}