import client from '../../client';
import IStory from '../../interfaces/IStory';
import implement from 'implement-js';

const story = {
    getStories: async (component) => {
        await client.get(
            `/api/stories/all/${component.$route.params.id}`
        );
    },
    getStory: async () => {},
    createStory: async () => {},
    updateStory: async () => {},
    insertSession: async () => {},
    deleteSession: async () => {}
};

implement(IStory)(story);

export default story;