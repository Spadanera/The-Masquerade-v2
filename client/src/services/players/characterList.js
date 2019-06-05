import client from '../client';
import ICharacterList from '../interfaces/ICharacterList';
import implement from 'implement-js'

const characterList = {
    openCharacter: (characterId, $router, $route) => {
        $router.push(
            `/player/chronicle/${$route.params.id}/characters/${characterId}`
        );
    },
    getCharacters: async (listId, component) => {
        let response = await await client.get(`/api/palyers/characters`);
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

implement(ICharacterList)(characterList);

export default characterList;