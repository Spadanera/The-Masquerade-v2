import { Interface, type } from 'implement-js';

const Service = Interface('Service')({
    storyService: type('object'),
    playerCharacterService: type('object'),
    playerCharacterListService: type('object'),
    coterieCharacterService: type('object'),
    coterieCharacterListService: type('object'),
    chroniclePlayerService: type('object'),
    chronicleStoryTellerService: type('object'),
    chroniclePlayerCharacterService: type('object'),
    chroniclePlayerCharacterListService: type('object')
}, {
    error: true,
    strict: true 
});

export default Service;