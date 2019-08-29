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
    deleteCharacterInGroup: async () => { }
};

function getCharacters(groupId) {
    let iteration = 0;
    return new Promise((resolve, reject) => {
        client.get(`/api/players/${groupId}/characters/`).then((response) => {
            if (response.status === 204) {
                if (iteration > 500) {
                    reject("Timeout exeeded waiting session playerId");
                }
                else {
                    resolve(getCharacters());
                }
            }
            else {
                resolve(response);
            }
        });
    });
}

export default players;