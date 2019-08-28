import client from '../client';
import IChronicle from '../interfaces/IChronicle';
import implement from 'implement-js';

const chronicle = {
    getChronicle: async (chronicleId) => {
        let response = await client.get(
            `/api/chronicles/${chronicleId}`
        );
        return response.data;
    },
    getChronicles: async () => {
        let response = await client.get("/api/chronicles");
        return response.data;
    },
    goTo: (route, component) => {
        component.$router.push(`/story-teller/chronicle/${component.$route.params.id}/${route}`);
        if (route === "dashboard") {
            component.nav.visible = false;
        }
    },
    createChronicle: async (input) => {
        await client.post("/api/chronicles", input);
    },
    updateChronicle: async (chronicleId, input) => {
        await client.put(`/api/chronicles/${chronicleId}`, input);
    },
    deleteChronicle: async (chronicleId) => {
        await client.delete(`/api/chronicles/${chronicleId}`);
    }
};

implement(IChronicle)(chronicle);

export default chronicle;