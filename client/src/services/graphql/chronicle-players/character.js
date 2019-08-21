import client from '../client';
import ICharacter from '../interfaces/ICharacter';
import implement from 'implement-js'

const character = {
    killOrResume: async (character, alive, component) => {
        
    },
    close: (component) => {
        component.$router.push(
            `/story-teller/chronicle/${component.$route.params.id}/players/${
            component.$route.params.listid
            }`
        );
    },
    load: async (component) => {
        let response = await client.get(`/api/characters/story-teller/${component.characterId}`);
        response.data.mainInformation = response.data.mainInformation || {};
        response.data.mortal = response.data.mortal || {};
        component.character = response.data;
        component.loaded = true;
        component.readonly = true;
    },
    save: async (component) => {
        
    },
    create: async (coterieId, character) => {
        
    }
}

implement(ICharacter)(character);

export default character;