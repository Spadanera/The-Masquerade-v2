import { Interface, type } from 'implement-js';

const CharacterList = Interface('CharacterList')({
    openCharacter: type('function'),
    getCharacters: type('function')
}, {
    error: true,
    strict: true 
});

export default CharacterList;