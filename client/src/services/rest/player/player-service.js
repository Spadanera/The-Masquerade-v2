import IVampireGroups from '../../interfaces/IVampireGroups';
import implement from 'implement-js';
import playerService from '../shared/player-service';

playerService.openCharacter = (characterId, component) => {
    component.$router.push(
        `/player/chronicle/${component.$route.params.id}/characters/${characterId}`
    );
};

playerService.closeCharacter = (component) => {
    component.$router.push(
        `/player/chronicle/${component.$route.params.id}/characters`
    );
};

implement(IVampireGroups)(playerService);

export default playerService;