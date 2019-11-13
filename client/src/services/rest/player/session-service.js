// import client from '../../client';
import ISession from '../../interfaces/ISession';
import implement from 'implement-js';

const session = {
    createSession: async () => {},
    getSessions: async () => {},
    getOnGoingSession: async () => {},
    updateSession: async () => {},
    deleteSession: async () => {},
    searchSessions: async () => {},
    getCharacterSessions: async () => {}
};

implement(ISession)(session);

export default session;