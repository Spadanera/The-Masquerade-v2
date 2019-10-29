import client from '../client';
import ISession from '../interfaces/ISession';
import implement from 'implement-js';

const session = {
    createSession: async (chronicleId, session) => {
        let response = await client.post(`/api/sessions/${chronicleId}`, session);
        return response.data;
    },
    getSessions: async (storyId) => {
        let response = await client.get(`/api/sessions/all/${storyId}`);
        return response.data;
    },
    getSession: async (sessionId) => {
        let response = await client.get(`/api/sessions/${sessionId}`);
        return response.data;
    },
    getOnGoingSession: async (chronicleId) => {
        let response = await client.get(`/api/sessions/ongoing/${chronicleId}`);
        return response.data;
    },
    updateSession: async () => {}
};

implement(ISession)(session);

export default session;