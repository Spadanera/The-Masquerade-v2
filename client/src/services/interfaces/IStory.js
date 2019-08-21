import { Interface, type } from 'implement-js';

const Story = Interface('Story')({
    load: type('function'),
    loadList: type('function')
}, {
    error: true,
    strict: true 
});

export default Story;