import client from '../../client';
import IChronicle from '../../interfaces/IChronicle';
import implement from 'implement-js';

const chronicle = {
    getChronicle: async (chronicleId) => {
        return await client.get(
            `/api/chronicles/player/${chronicleId}`
        );
    },
    getChronicles: async () => {
        let response = await client.get("/api/chronicles");
        return response.data;
    },
    goTo: (route, component) => {
        component.$router.push(`/player/chronicle/${component.$route.params.id}/${route}`);
        if (route === "dashboard" || route === "characters") {
            component.nav.visible = false;
        }
    },
    createChronicle: () => {},
    updateChronicle: () => {},
    deleteChronicle: () => {}
};

implement(IChronicle)(chronicle);

export default chronicle;