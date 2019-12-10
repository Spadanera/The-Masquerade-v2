import client from '../../client';
import IStory from '../../interfaces/IStory';
import implement from 'implement-js';

const story = {
    getStories: async (chronicleId) => {
        let response = await client.get(
            `/api/stories/all/player/${chronicleId}`
        );
        return response.data;
    },
    getStory: async (storyId) => {
        let response = await client.get(
            `/api/stories/player/${storyId}`
        );
        return response.data;
    },
    createStory: async () => {},
    updateStory: async () => {},
    insertSession: async () => {},
    deleteSession: async () => {},
    startStory: async () => {},
    closeStory: async () => {}
};

implement(IStory)(story);

export default story;