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
    getOnGoingSession: async () => {},
    updateSession: async () => {},
    deleteSession: async () => {},
    searchSessions: async (search, chronicleId, storyId) => {
        let response = await client.get(`/api/sessions/search/${chronicleId}?search=${search}&storyid=${storyId}`);
        return response.data;
    },
    getCharacterSessions: async () => {}
};

implement(ISession)(session);

export default session;