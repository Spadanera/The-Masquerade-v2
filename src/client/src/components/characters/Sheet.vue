<template>
    
</template>

<script>
import client from '../../services/client';
export default {
    props: {
        characterId: String
    },
    methods: {
        loadCharacter() {
            let response = client.get(`/api/characters/${this.characterId}`);
            this.character = response.data;
        }
    },
    data() {
        return {
            character: undefined
        }
    },
    created() {
        this.loadCharacter();
    }
}
</script>

<style>

</style>
