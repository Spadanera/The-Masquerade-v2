import client from '../client';
import IVampireGroups from '../interfaces/IVampireGroups';
import implement from 'implement-js';

const coteries = {
    getGroups: async (chronicleId) => {
        let response = await client.get(
            `/api/coteries/all/${chronicleId}`
          );
        return response.data;
    },
    getGroup: async () => {},
    createGroup: async (chronicleId, input) => {
        let response = await client.post(`/api/coteries/${chronicleId}`, input);
        return response.data;
    },
    updateGroup: async () => {},
    deleteGroup: async (groupId) => {
        await client.delete(`/api/coteries/${groupId}`);
        return;
    },
    getAllCharacters: async () => {
        
    },
    getGroupCharacters: async (listId) => {
        let response = await await client.get(`/api/coteries/${listId}`);
        return response.data.characters.sort((a, b) => {
            if (a.alive > b.alive) {
                return -1;
            } else if (a.alive < b.alive) {
                return 1;
            } else {
                return a.createdAt - b.createdAt;
            }
        });
    },
    openCharacter: (characterId, component) => {
        component.$router.push(
            `/story-teller/chronicle/${component.$route.params.id}/coteries/${
                component.$route.params.listid
            }/character/${characterId}`
        );
    },
    closeCharacter: (component) => {
        component.$router.push(
            `/story-teller/chronicle/${component.$route.params.id}/coteries/${
            component.$route.params.listid
            }`
        );
    },
    createCharacterInGroup: async (character, coterieId) => {
        await client.post(`/api/characters/${coterieId}`, character);
    },
    updateCharacter: async (characterId, character) => {
        let response = await client.put(`/api/characters/${characterId}`, character);
        return response.data;
    },
    getCharacter: async (characterId) => {
        let response = await client.get(`/api/characters/${characterId}`);
        response.data.mainInformation = response.data.mainInformation || {};
        response.data.mortal = response.data.mortal || {};
        return response.data;
    },
    killOrResumeCharacter: async (character, alive, component) => {
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
    deleteCharacterInGroup: async () => {}
};

implement(IVampireGroups)(coteries);

export default coteries;