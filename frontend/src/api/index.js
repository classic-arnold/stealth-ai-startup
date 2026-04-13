import axios from 'axios';

const api = axios.create({ baseURL: '/v1' });

export const getSummary = () => api.get('/summary').then((r) => r.data);
export const getEvents = (params = {}) => api.get('/events', { params }).then((r) => r.data);
export const postEvent = (data) => api.post('/events', data).then((r) => r.data);
