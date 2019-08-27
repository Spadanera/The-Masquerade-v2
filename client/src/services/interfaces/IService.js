import { Interface, type } from 'implement-js';

const PlayerService = Interface('PlayerService')({
    chronicleService: type('object'),
    storyService: type('object'),
    playerService: type('object')
}, {
    error: true,
    strict: true 
});

const Service = Interface('Service')({
    chronicleService: type('object'),
    storyService: type('object'),
    sessionService: type('object'),
    playerService: type('object'),
    coterieService: type('object'),
    invitationService: type('object'),
    dedicatedPlayerService: type('object', PlayerService)
}, {
    error: true,
    strict: true 
});

export default Service;