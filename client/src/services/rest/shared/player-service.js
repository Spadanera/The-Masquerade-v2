import client from '../../client';

const players = {
    getGroups: async (chronicleId) => {
        let response = await client.get(
            `/api/players/all/${chronicleId}`
        );
        return response.data;
    },
    getGroup: async () => { },
    createGroup: async () => {

    },
    updateGroup: async () => { },
    deleteGroup: async () => { },
    getAllCharacters: async (chronicleId) => {
        let response = await client.get(
            `/api/players/all-characters/${chronicleId}`
        );
        return response.data;
    },
    getGroupCharacters: async (groupId) => {
        let response = await getCharacters(groupId);
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
    createCharacterInGroup: async (character) => {
        await client.post(`/api/characters/`, character);
    },
    updateCharacter: async (component) => {
        await client.put(`/api/characters/${component.character._id}`, component.character);
        if (!component.fighting) {
            component.snackbar.text = "Save successfully";
            component.snackbar.enabled = true;
        }
        component.readonly = true;
    },
    getCharacter: async (component) => {
        let response = await client.get(`/api/characters/${component.characterId}`);
        response.data.mainInformation = response.data.mainInformation || {};
        response.data.mortal = response.data.mortal || {};
        component.character = response.data;
        component.loaded = true;
        component.readonly = true;
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
    deleteCharacterInGroup: async () => { }
};

async function getCharacters(groupId) {
    let iteration = 0;
    return new Promise(async (resolve, reject) => {
        let response = await client.get(`/api/players/${groupId}/characters/`);
        if (response.status === 204) {
            if (iteration > 500) {
                reject("Timeout exeeded waiting session playerId");
            }
            else {
                resolve(await getCharacters());
            }
        }
        else {
            resolve(response);
        }
    });
}

export default players;