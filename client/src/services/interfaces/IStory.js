import { Interface, type } from 'implement-js';

const Story = Interface('Story')({
    getStories: type('function'),
    getStory: type('function'),
    createStory: type('function'),
    updateStory: type('function'),
    insertSession: type('function'),
    deleteSession: type('function'),
    startStory: type('function'),
    closeStory: type('function')
}, {
    error: true,
    strict: true 
});

export default Story;