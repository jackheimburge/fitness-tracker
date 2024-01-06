import sendRequest from './send-request';
const BASE_URL = '/api/dailyData'


export async function addDailyData(dailyData) {
    return sendRequest(BASE_URL, 'POST', dailyData)
}