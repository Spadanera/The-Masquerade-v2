import client from '../client';
import ISession from '../interfaces/ISession';
import implement from 'implement-js';

const session = {
    getSessions: async (storyId) => {
        let response = await client.get(`/api/sessions/all/${storyId}`);
        return response.data;
    },
    getSession: async () => {},
    updateSession: async () => {}
};

implement(ISession)(session);

export default session;