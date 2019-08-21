import client from '../../client';
import IStory from '../../interfaces/IStory';
import implement from 'implement-js'

const story = {
    load: async (component) => {

    },
    loadList: async (component) => {
        await client.get(
            `/api/stories/all/${component.$route.params.id}`
        );
    }
}

implement(IStory)(story);

export default story;