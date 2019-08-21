import { Interface, type } from 'implement-js';

const Chronicle = Interface('Chronicle')({
    load: type('function'),
    loadList: type('function'),
    goTo: type('function')
}, {
    error: true,
    strict: true 
});

export default Chronicle;