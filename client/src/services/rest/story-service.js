import client from '../client';
import IStory from '../interfaces/IStory';
import implement from 'implement-js';

const story = {
    getStories: async (chronicleId) => {
        let response = await client.get(
            `/api/stories/all/${chronicleId}`
        );
        return response.data;
    },
    getStory: async (storyId) => {
        let response = await client.get(
            `/api/stories/${storyId}`
        );
        return response.data;
    },
    createStory: async (chronicleId, input) => {
        await client.post(`/api/stories/${chronicleId}`, input);
    },
    updateStory: async (storyId, input) => {
        await client.put(`/api/stories/${storyId}`, input);
    },
    insertSession: async () => { },
    deleteSession: async () => { },
    startStory: async (chronicleId, storyId) => {
        await client.put(`/api/stories/start/${chronicleId}/${storyId}`);
    },
    closeStory: async (storyId) => {
        await client.put(`/api/stories/close/${storyId}`);
     }
};

implement(IStory)(story);

export default story;