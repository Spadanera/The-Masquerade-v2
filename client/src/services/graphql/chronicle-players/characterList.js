import client from '../../client';
import ICharacterList from '../../interfaces/ICharacterList';
import implement from 'implement-js'

const characterList = {
    openCharacter: (characterId, $router, $route) => {
        $router.push(
            `/story-teller/chronicle/${$route.params.id}/players/${
            $route.params.listid
            }/character/${characterId}`
        );
    },
    getCharacters: async (listId, component) => {
        listId = listId || component.$route.params.listid;
        let response = await await client.get(`/api/players/${listId}/characters`);
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