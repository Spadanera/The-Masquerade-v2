import client from '../client';
import ICharacter from '../interfaces/ICharacter';
import implement from 'implement-js'

const character = {
    killOrResume: async (character, alive, component) => {
        let res = await component.$confirm(
            `Do you really want to ${alive ? "resume" : "kill"} ${character.name}?`,
            {
                title: "Warning"
            }
        );
        if (res) {
            await client.put(`api/characters/${character._id}`, { alive });
            component.getCharacters();
        }
    },
    close: (component) => {
        component.$router.push(
            `/story-teller/chronicle/${component.$route.params.id}/coteries/${
            component.$route.params.listid
            }`
        );
    },
    load: async (component) => {
        let response = await client.get(`/api/characters/${component.characterId}`);
        response.data.mainInformation = response.data.mainInformation || {};
        response.data.mortal = response.data.mortal || {};
        component.character = response.data;
        component.loaded = true;
        component.readonly = true;
    },
    save: async (component) => {
        await client.put(`/api/characters/${component.character._id}`, component.character);
        if (!component.fighting && !component.live) {
            component.snackbar.text = "Save successfully";
            component.snackbar.enabled = true;
        }
        component.readonly = true;
    },
    create: async (coterieId, character) => {
        await client.post(`/api/characters/${coterieId}`, character);
    }
}

implement(ICharacter)(character);

export default character;