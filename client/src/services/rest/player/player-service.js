import IVampireGroups from '../../interfaces/IVampireGroups';
import implement from 'implement-js';
import client from '../../client';

const players = {
    getGroups: async () => {

    },
    getGroup: async () => { },
    createGroup: async () => { },
    updateGroup: async () => { },
    deleteGroup: async () => { },
    getAllCharacters: async () => { },
    getGroupCharacters: async (groupId, component) => {
        let response = await client.get(`/api/players/characters/${component.$route.params.id}`);
        return response.data.sort((a, b) => {
            if (a.alive === b.alive) {
                return a.createdAt - b.createdAt;
            }
            if (a.alive === "alive") {
                return -1;
            }
            if (b.alive === "alive") {
                return 1;
            }
            if (a.alive === "torpor") {
                return -1;
            }
            if (b.alive === "torpor") {
                return 1;
            }
        });
    },
    createCharacterInGroup: async (character) => {
        let picture = character.picture;
        delete character.picture;
        let response = await client.post(`/api/characters/`, character);
        await savePictureFile(response.data._id, picture, true);
    },
    openCharacter: (characterId, component) => {
        component.$router.push(
            `/player/chronicle/${component.$route.params.id}/characters/${characterId}`
        );
    },
    getCharacter: async (characterId) => {
        let response = await client.get(`/api/characters/${characterId}`);
        if (response.data) {
            response.data.mainInformation = response.data.mainInformation || {};
            response.data.mortal = response.data.mortal || {};
            return response.data;
        }
        return {};
    },
    closeCharacter: (component) => {
        component.$router.push(
            `/player/chronicle/${component.$route.params.id}/characters`
        );
    },
    updateCharacter: async (characterId, character) => {
        let response = await client.put(`/api/characters/${characterId}`, character);
        return response.data;
    },
    killOrResumeCharacter: async (character, alive, component) => {
        let label;
        switch (alive) {
            case 1:
                label = "alive";
                break;
            case 0:
                label = "torpor";
                break;
            case -1:
                label = "lastdeath";
        }
        let res = await component.$confirm(
            `Do you really want to set ${character.name} as ${component.$ml.get(label)}?`,
            {
                title: component.$ml.get("warning")
            }
        );
        if (res) {
            await client.put(`api/characters/${character._id}`, { alive: label });
        }
    },
    deleteCharacterInGroup: async () => { },
    oneAlive: async (chronicleId, userId) => {
        let response = await client.get(`/api/characters/onealive/${chronicleId}/${userId}`);
        return response.data;
    }
};

async function savePictureFile(characterId, file, toDelete) {
    let formData = new FormData();
    formData.append('file', file);
    try {
        await client.post(`/api/characters/picture/${characterId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        if (toDelete) {
            await client.delete(`/api/characters/${characterId}`);
        }
        throw error;
    }
}

implement(IVampireGroups)(players);

export default players;