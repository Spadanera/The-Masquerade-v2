import client from '../../client';
import IChronicle from '../../interfaces/IChronicle';
import implement from 'implement-js'

const chronicle = {
    load: async (component) => {
        return await client.post('graphql', {
            query: `
                query chronicle(_id:"${component.$route.params.id}") {
                    _id,
                    name,
                    shortDescription,
                    privateStory,
                    publicStory,
                    createdAt,
                    updateAt,
                    status
                }
            `
        }).data.chronicle;
    },
    loadList: async (component) => {
        return await client.post('graphql', {
            query: `
                query chronicles {
                    _id,
                    name,
                    shortDescription,
                    createdAt,
                    updateAt,
                    status
                }
            `
        }).data.chronicle;
    },
    goTo: (route, component) => {
        component.$router.push(`/story-teller/chronicle/${component.$route.params.id}/${route}`);
        if (route === "dashboard") {
            component.nav.visible = false;
        }
    }
}

implement(IChronicle)(chronicle);

export default chronicle;