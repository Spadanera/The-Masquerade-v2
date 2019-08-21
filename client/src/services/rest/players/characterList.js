import client from '../../client';
import ICharacterList from '../../interfaces/ICharacterList';
import implement from 'implement-js'

const characterList = {
    openCharacter: (characterId, $router, $route) => {
        $router.push(
            `/player/chronicle/${$route.params.id}/characters/${characterId}`
        );
    },
    getCharacters: async (listId, component) => {
        let response = await getCharacters();
        component.characters = response.data.characters.sort((a, b) => {
            if (a.alive > b.alive) {
                return -1;
            } else if (a.alive < b.alive) {
                return 1;
            } else {
                return a.createdAt - b.createdAt;
            }
        });
    }
};

async function getCharacters() {
    let iteration = 0;
    return new Promise(async (resolve, reject) => {
        let response = await client.get(`/api/players/characters/`);
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

implement(ICharacterList)(characterList);

export default characterList;