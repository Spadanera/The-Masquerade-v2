import client from '../client';
import IStory from '../interfaces/IStory';
import implement from 'implement-js'

const story = {
    getStories: async (chronicleId) => {
        let response = await client.get(
            `/api/stories/all/${chronicleId}`
        );
        return response.data;
    },
    getStory: async () => {},
    createStory: async (chronicleId, input) => {
        await client.post(`/api/stories/${chronicleId}`, input);
    },
    updateStory: async () => {},
    insertSession: async () => {},
    deleteSession: async () => {}
}

implement(IStory)(story);

export default story;