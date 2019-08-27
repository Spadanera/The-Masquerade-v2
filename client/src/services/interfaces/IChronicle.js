import { Interface, type } from 'implement-js';

const Chronicle = Interface('Chronicle')({
    getChronicle: type('function'),
    getChronicles: type('function'),
    goTo: type('function'),
    createChronicle: type('function'),
    updateChronicle: type('function'),
    deleteChronicle: type('function'),
}, {
    error: true,
    strict: true 
});

export default Chronicle;