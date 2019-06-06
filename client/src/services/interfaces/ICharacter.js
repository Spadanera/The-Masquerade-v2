import { Interface, type } from 'implement-js'

const Character = Interface('Character')({
    killOrResume: type('function'),
    close: type('function'),
    load: type('function'),
    save: type('function'),
    create: type('function')
}, {
   error: true,
   strict: true 
});

export default Character;