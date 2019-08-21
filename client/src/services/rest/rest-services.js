import IService from "../interfaces/IService";
import implement from 'implement-js'
import storyService from './stories/story';
import playerCharacterService from './players/character';
import playerCharacterListService from './players/characterList';
import coterieCharacterService from './coteries/character';
import coterieCharacterListService from './coteries/characterList';
import chroniclePlayerService from './chronicles/player';
import chronicleStoryTellerService from './chronicles/story-teller';
import chroniclePlayerCharacterService from './chronicle-players/character';
import chroniclePlayerCharacterListService from './chronicle-players/characterList';

const service = {
    storyService,
    playerCharacterService,
    playerCharacterListService,
    coterieCharacterService,
    coterieCharacterListService,
    chroniclePlayerService,
    chronicleStoryTellerService,
    chroniclePlayerCharacterService,
    chroniclePlayerCharacterListService
};

implement(IService)(service);

export default service;