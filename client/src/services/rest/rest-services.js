import IService from "../interfaces/IService";
import implement from 'implement-js'

const service = {
    chronicleService: require('./chronicle-service').default,
    storyService: require('./story-service').default,
    sessionService: require('./session-service').default,
    playerService: require('./player-service').default,
    coterieService: require('./coterie-service').default,
    invitationService: require('./invitation-service').default,
    dedicatedPlayerService: {
        chronicleService: require('./player/chronicle-service').default,
        storyService: require('./player/story-service').default,
        playerService: require('./player/player-service').default
    }
};

implement(IService)(service);

export default service;