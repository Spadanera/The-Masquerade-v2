import client from '../../client';
import ISession from '../../interfaces/ISession';
import implement from 'implement-js';

const session = {
    createSession: async () => {},
    getSessions: async (storyId) => {
        let response = await client.get(`/api/sessions/all/${storyId}`);
        return response.data;
    },
    getSession: async (sessionId) => {
        let response = await client.get(`/api/sessions/player/${sessionId}`);
        return response.data;
    },
    getOnGoingSession: async (chronicleId) => {
        let response = await client.get(`/api/sessions/ongoing/player/${chronicleId}`);
        return response.data;
    },
    updateSession: async (session) => {
        let response = await client.put(`/api/sessions/player/${session._id}`, session);
        return response.data;
    },
    deleteSession: async () => {},
    searchSessions: async (search, chronicleId, storyId) => {
        let response = await client.get(`/api/sessions/search/${chronicleId}?search=${search}&storyid=${storyId}`);
        return response.data;
    },
    getCharacterSessions: async () => {}
};

implement(ISession)(session);

export default session;