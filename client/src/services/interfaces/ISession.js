import { Interface, type } from 'implement-js';

const Session = Interface('Session')({
    getSessions: type('function'),
    getSession: type('function'),
    updateSession: type('function')
}, {
    error: true,
    strict: true 
});

export default Session;