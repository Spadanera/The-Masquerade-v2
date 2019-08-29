// import client from '../../client';
import ISession from '../../interfaces/ISession';
import implement from 'implement-js';

const session = {
    getSessions: async () => {},
    getSession: async () => {},
    updateSession: async () => {}
};

implement(ISession)(session);

export default session;