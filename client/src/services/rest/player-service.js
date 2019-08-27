import IVampireGroups from '../interfaces/IVampireGroups';
import implement from 'implement-js';
import playerService from './shared/player-service';

playerService.openCharacter = (characterId, component) => {
    component.$router.push(
        `/story-teller/chronicle/${component.$route.params.id}/players/${component.$route.params.listid}/character/${characterId}`
    );
};

playerService.closeCharacter = (component) => {
    component.$router.push(
        `/story-teller/chronicle/${component.$route.params.id}/players/${component.$route.params.listid}`
    );
};

implement(IVampireGroups)(playerService);

export default playerService;