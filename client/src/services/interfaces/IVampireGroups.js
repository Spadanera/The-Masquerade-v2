import { Interface, type } from 'implement-js';

const VampireGroups = Interface('IVampireGroups')({
    getGroups: type('function'),
    getGroup: type('function'),
    createGroup: type('function'),
    updateGroup: type('function'),
    deleteGroup: type('function'),
    getAllCharacters: type('function'),
    getGroupCharacters: type('function'),
    openCharacter: type('function'),
    closeCharacter: type('function'),
    createCharacterInGroup: type('function'),
    updateCharacter: type('function'),
    getCharacter: type('function'),
    killOrResumeCharacter: type('function'),
    deleteCharacterInGroup: type('function')
}, {
    error: true,
    strict: true 
});

export default VampireGroups;