import client from '../client';

export default {
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