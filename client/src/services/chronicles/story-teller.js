import client from '../client';
import IChronicle from '../interfaces/IChronicle';
import implement from 'implement-js'

const chronicle = {
    load: async (component) => {
        return await client.get(
            `/api/chronicles/${component.$route.params.id}`
        );
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