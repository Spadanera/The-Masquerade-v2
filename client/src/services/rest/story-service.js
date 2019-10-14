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
        console.log(storyId);
        await client.put(`/api/stories/${storyId}`, input);
    },
    insertSession: async () => { },
    deleteSession: async () => { }
};

implement(IStory)(story);

export default story;