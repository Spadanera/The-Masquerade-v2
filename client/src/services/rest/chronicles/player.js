import client from '../../client';
import IChronicle from '../../interfaces/IChronicle';
import implement from 'implement-js'

const chronicle = {
    load: async (component) => {
        return await client.get(
            `/api/chronicles/player/${component.$route.params.id}`
        );
    },
    loadList: async (component) => {
        return await client.get("/api/chronicles");
    },
    goTo: (route, component) => {
        component.$router.push(`/player/chronicle/${component.$route.params.id}/${route}`);
        if (route === "dashboard" || route === "characters") {
            component.nav.visible = false;
        }
    }
}

implement(IChronicle)(chronicle);

export default chronicle;